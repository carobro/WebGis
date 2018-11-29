import d3 from 'd3';
import { sankey } from './libs/d3-sankey';

export default class SankeyVisualization {
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;
  }

  destroy() {
    this.el.innerHTML = '';
  }

  render({ nodes, links }) {
    this.destroy();
    if (!nodes || !nodes.length) {
      this.el.innerHTML = `
      <div class='table-vis-error'>
        <h2 aria-hidden='true'>
          <i aria-hidden='true' class='fa fa-meh-o'></i>
        </h2>
        <h4>No results found</h4>
      </div>`;
      return;
    }
    this.container = document.createElement('div');
    this.el.appendChild(this.container);
    const width = this.el.offsetWidth - 5;
    const height = this.el.offsetHeight - 5;

    const formatNumber = d3.format(',.0f');
    const format = function (d) {
      return formatNumber(d) + ' User(s)';
    };
    const color = d3.scale.category20();

    const svg = d3
      .select(this.container)
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .append('g');

    const chart = sankey
      .nodeWidth(15)
      .nodePadding(10)
      .size([width, height]);

    const path = sankey.link();

    chart
      .nodes(nodes)
      .links(links)
      .layout(32);

    const link = svg
      .append('g')
      .selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', path)
      .style('stroke-width', d => Math.max(1, d.dy))
      .sort((a, b) => b.dy - a.dy);

    link.append('title').text(d => d.source.name + ' → ' + d.target.name + '\n' + format(d.value));

    const node = svg
      .append('g')
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
      .call(
        d3.behavior.drag()
          .origin(d => d)
          .on('dragstart', function () { this.parentNode.appendChild(this); })
          .on('drag', dragmove)
      );

    node
      .append('rect')
      .attr('height', d => d.dy)
      .attr('width', chart.nodeWidth())
      .style('fill', d => (d.color = color(d.name.replace(/ .*/, ''))))
      .style('stroke', d => d3.rgb(d.color).darker(2))
      .append('title')
      .text(d => d.name + '\n' + format(d.value));

    node
      .append('text')
      .attr('x', -6)
      .attr('y', d => d.dy / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .attr('transform', null)
      .text(d => d.name)
      .filter(d => d.x < width / 2)
      .attr('x', 6 + sankey.nodeWidth())
      .attr('text-anchor', 'start');

    function dragmove(d) {
      d3.select(this).attr(
        'transform',
        'translate(' +
        d.x +
        ',' +
        (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) +
        ')'
      );
      sankey.relayout();
      link.attr('d', path);
    }
  }
}
