export function transformElasticResponseToSessions(response) {
  return response.aggregations.sessions.buckets.map(session => {
    const events = session.first_events.hits.hits;
    return {
      session_key: session.key,
      events: events.map(event => ({ name: event._source.topic }))
    };
  });
}

export function filterSource(sessions, source) {
  return sessions.reduce((keepSessions, session) => {
    let sourceEventFound = false;
    session.events = session.events.reduce((keepEvents, event) => {
      if (event.name !== source && !sourceEventFound) {
        return keepEvents;
      }
      sourceEventFound = true;
      keepEvents.push(event);
      return keepEvents;
    }, []);
    if (session.events.length) {
      keepSessions.push(session);
    }
    return keepSessions;
  }, []);
}

export function filterDestination(sessions, destination) {
  return sessions.reduce((keepSessions, session) => {
    let eventFound = false;
    session.events = session.events.reduce((keepEvents, event) => {
      if (eventFound) {
        return keepEvents;
      }
      keepEvents.push(event);
      if (event.name === destination) {
        eventFound = true;
      }
      return keepEvents;
    }, []);
    if (eventFound) {
      keepSessions.push(session);
    }
    return keepSessions;
  }, []);
}
