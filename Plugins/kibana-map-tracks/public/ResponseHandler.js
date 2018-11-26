export function handleResponse(vis, response) {
  return response.aggregations.sessions.buckets.map(session => {
    const events = session.events.hits.hits.map(event => {
      return {
        center: {
          x: event._source[vis.params.geoField].x,
          y: event._source[vis.params.geoField].y
        },
        timestamp: event._source[vis.params.timeField]
      };
    });
    return {
      events,
      session_key: session.key
    };
  });
}