export function handleResponse(vis, response) {
  console.log(response); //hier steht alles drin
  console.log(vis);

  console.log(vis.params.appField);

  var coordarray = [];

  //console.log(a);

  var b = response.hits.hits;

  //console.log(b);

  b.forEach(function(element){

    if(element._source.message = "resultcenter ITEM_SELECTED"){

      coordarray.push([element._source.map_center.x, element._source.map_center.y]);

    }

  });
  
  return coordarray;
  

}