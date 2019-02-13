export function handleResponse(vis, response) {

  //return the array with the single sessions to use it in the visualization
  var b = response.aggregations.sessions.buckets;

  return b;
}