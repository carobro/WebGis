import ElasticSankeyTransformer from './SessionToSankeyTransformer';
import { transformElasticResponseToSessions, filterSource, filterDestination } from './ElasticToSessionTransformer';

export function handleResponse(vis, response) {
  if (!response.aggregations) {
    return [];
  }
  let sessions = transformElasticResponseToSessions(response);
  if (vis.params.filterAction) {
    switch (vis.params.filterPosition) {
      case 'source':
        sessions = filterSource(sessions, vis.params.filterAction);
        break;
      case 'destination':
        sessions = filterDestination(sessions, vis.params.filterAction);
    }
  }
  const transformer = new ElasticSankeyTransformer();
  transformer.transform(sessions);
  return {
    nodes: transformer.nodes,
    links: transformer.links
  };
}