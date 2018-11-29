/**
 * Graph structure representation based on nodes and links
 *
 * All optimization and error handling must be done during creation
 * Node statistics can be used for updates at any time
 **/
export default class SessionToSankeyTransformer {
  constructor() {
    this.nodes = [];
    this.links = [];
  }

  transform(sessions, opts = {}) {
    sessions.forEach(sessionProps => {
      let sourceNodeIdx = -1;
      let targetNodeIdx = -1;
      let isStartEvent = true;
      let eventDepth = 0;
      let linkIndex;
      const events = sessionProps.events;
      events.forEach((event, eventIdx) => {
        // skip last event because node and link are already registered
        if (eventIdx === events.length - 1) {
          return;
        }

        const sessionKey = sessionProps.session_key;

        sourceNodeIdx = this._selectNodeIdx({
          previousNodeIdx: targetNodeIdx,
          eventName: event.name,
          eventDepth: eventDepth,
          isStartEvent: isStartEvent,
          maxChildDepthLookup: opts.maxChildDepthLookup || 150,
          maxNodeReuseDeviation: opts.maxNodeReuseDeviation || 150
        });

        isStartEvent = isStartEvent ? false : isStartEvent;

        targetNodeIdx = this._selectNodeIdx({
          previousNodeIdx: -1,
          eventName: events[eventIdx + 1].name,
          eventDepth: eventDepth + 1,
          isStartEvent: isStartEvent,
          notAllowedChildIdx: sourceNodeIdx,
          maxChildDepthLookup: opts.maxChildDepthLookup || 150,
          maxNodeReuseDeviation: opts.maxNodeReuseDeviation || 150
        });

        eventDepth = this._updateNodeDepth(sourceNodeIdx, eventDepth);
        eventDepth = this._updateNodeDepth(targetNodeIdx, eventDepth + 1);

        const interactionDuration = (new Date(events[eventIdx + 1].timestamp)) - (new Date(event.timestamp));
        linkIndex = this._getLinkIdx(sourceNodeIdx, targetNodeIdx);

        if (linkIndex > -1) {
          this._updateLink(linkIndex, {
            interactionDuration: interactionDuration,
            session_key: sessionKey
          });
          return;
        }

        linkIndex = this._addLink({
          sourceNodeIdx: sourceNodeIdx,
          targetNodeIdx: targetNodeIdx,
          interactionDuration: interactionDuration,
          session_key: sessionKey
        });
      });
    });
  }

  /**
   * Creates and adds new node with initial params to stream
   * @param {string} name of event
   * @param {number} depth within graph
   * @param {boolean} start param of new node
   */
  _addNode(name, start, depth) {
    start = start ? start : false;
    this.nodes.push({
      name: name,
      amountOut: 0,
      amountIn: 0,
      unique_session_keys: [],
      last_node_visited_user: [],
      last_node_visited_session: [],
      start: start,
      depth: depth
    });

    return this.nodes.length - 1;
  }

  _selectNodeIdx(cond) {
    let nodeIdx = -1;
    // try to use previous target node
    if (cond.previousNodeIdx > -1) {
      return cond.previousNodeIdx;
    }

    // try to reuse other existing node
    if (nodeIdx === -1) {
      nodeIdx = this._getBestNodeIdx(cond.eventName, {
        depth: cond.eventDepth,
        isStartNode: cond.isStartEvent,
        notAllowedChildIdx: cond.notAllowedChildIdx,
        maxChildDepthLookup: cond.maxChildDepthLookup,
        maxNodeReuseDeviation: cond.maxNodeReuseDeviation
      });
    }

    // create new node
    if (nodeIdx === -1) {
      nodeIdx = this._addNode(cond.eventName, cond.isStartEvent, cond.eventDepth);
    }
    return nodeIdx;
  }

  /**
   * Find best matching node
   * @param {string} name of event
   * @param {object} cond, optional
   * @returns {number} index of matching node
   */
  _getBestNodeIdx(name, cond) {
    const MAX_CHILD_DEPTH_LOOKUP = cond.maxChildDepthLookup;
    const MAX_NODE_REUSE_DEVIATION = cond.maxNodeReuseDeviation;
    let index = -1;
    this.nodes.some((node, idx) => {
      // node type matches?
      if (node.name !== name) {
        return false;
      }

      // candidate is not allowed
      if (cond.notAllowedChildIdx === idx) {
        return false;
      }

      // start-flag requirement matches?
      if ((cond.isStartNode && !node.start) || (!cond.isStartNode && node.start)) {
        return false;
      }
      // graph deviation is within boundaries?
      if (cond.depth > node.depth + MAX_NODE_REUSE_DEVIATION || cond.depth < node.depth - MAX_NODE_REUSE_DEVIATION) {
        return false;
      }
      // is not a parent of idx?
      if (cond.notAllowedChildIdx > -1) {
        const child = this._isChildNode(cond.notAllowedChildIdx, idx, MAX_CHILD_DEPTH_LOOKUP);
        if (child.idx === cond.notAllowedChildIdx || child === true || child === undefined) {
          return false;
        }
      }
      index = idx;
      return true;
    });

    return index;
  }

  /**
   * Recursively update depth within graph
   * @param nodeId
   * @param depth
   * @returns {number} actual depth
   */
  _updateNodeDepth(nodeId, depth) {
    const node = this.nodes[nodeId];
    if (node.depth > depth) {
      return node.depth;
    }
    node.depth = depth;
    const childs = this._getChildren(nodeId);
    childs.forEach(child => {
      this._updateNodeDepth(child, depth + 1);
    });

    // return actual depth
    return node.depth;
  }

  /**
   * Creates and adds new link with initial params to stream
   * @param opts meta information for new node
   * @returns {number} index of new link
   */
  _addLink(opts) {
    this.links.push({
      source: opts.sourceNodeIdx,
      target: opts.targetNodeIdx,
      value: 1,
      session_keys: [opts.session_key],
      time_spent: [opts.interactionDuration],
      timeSpentSum: opts.interactionDuration
    });

    return this.links.length - 1;
  }

  /**
   * Updates params of existing node
   * @param idx of link that should be updated
   * @param opts that should be updated
   */
  _updateLink(idx, opts) {
    const link = this.links[idx];

    if (!link.session_keys.some(key => {
      if (key === opts.session_key) {
        return true;
      }
    })) {
      link.session_keys.push(opts.session_key);
    }

    link.value++;
    link.time_spent.push(opts.interactionDuration);
    link.timeSpentSum += opts.interactionDuration;
  }

  /**
   * Returns link that matches source and target
   * @param {number} sourceIdx of node to match
   * @param {number} targetIdx of node to match
   * @returns {number} index of matching link, otherwise -1
   */
  _getLinkIdx(sourceIdx, targetIdx) {
    let index = -1;
    this.links.some((link, idx) => {
      if (link.source === sourceIdx && link.target === targetIdx) {
        index = idx;
        return true;
      }
    });
    return index;
  }

  /**
   * Return all children for a node that are connected by links
   * @param {number} nodeIdx
   * @returns {Array} children
   */
  _getChildren(nodeIdx) {
    const children = [];
    this.links.forEach(link => {
      link.source === nodeIdx && children.push(link.target);
    });
    return children;
  }

  /**
   * Checks recursively if node is child of another
   * @param {number} potentialChildIdx
   * @param {number} potentialParentIdx
   * @param {number} maxDepth, for child lookahead
   * @returns {boolean} true if child
   */
  _isChildNode(potentialChildIdx, potentialParentIdx, maxDepth) {
    if (maxDepth === 0) {
      return;
    }

    maxDepth--;
    const childs = this._getChildren(potentialParentIdx);
    if (childs.length === 0) {
      return false;
    }

    for (let j = 0; j < childs.length; j++) {
      const isChild = this._isChildNode(potentialChildIdx, childs[j], maxDepth);
      if (isChild === undefined) {
        return;
      }
      if (childs[j] === potentialChildIdx || isChild) {
        return true;
      }
    }
    return false;
  }
}