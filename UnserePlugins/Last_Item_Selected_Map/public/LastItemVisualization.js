import { loadCss, loadModules } from './libs/esri-loader';

const JS_API_URL = '//js.arcgis.com/4.8/';

export default class LastItemVisualization {
  constructor(el, vis) {
    loadCss(`${JS_API_URL}esri/css/main.css`);
    this.vis = vis;
    this.el = el;
  }

  destroy() {
    if (this.view) {
      this.view = undefined;
    }
    if (this.container) {
      this.el.removeChild(this.container);
      this.container = undefined;
    }
    this.el.innerHTML = `
      <div class='table-vis-error'>
        <h2 aria-hidden='true'>
          <i aria-hidden='true' class='fa fa-meh-o'></i>
        </h2>
        <h4>No results found</h4>
      </div>`;
  }

  createContainer() {
    this.el.innerHTML = '';
    const container = this.container = document.createElement('div');
    container.style.height = '100%';
    container.style.width = '100%';
    this.el.appendChild(container);
  }

  render(buckets) {
    if (!buckets || !buckets.length) {
      this.destroy();
      return;
    }
    if (!this.container) {
      this.createContainer();
    }
    this.renderMap(buckets);
  }

  renderMap(buckets) {
    console.log(buckets);
    loadModules([
      'esri/Map',
      'esri/views/SceneView',
      "esri/layers/GraphicsLayer",
      "esri/Graphic"
    ], { url: JS_API_URL })
      .then(([Map, SceneView, GraphicsLayer, Graphic]) => {
        if (!this.view) {
          const map = this.map = new Map({
            basemap: 'gray'
          });
          this.view = new SceneView({
            map,
            camera: {
              heading: 0,
              tilt: 0,
              position: [7.6261347, 51.9606649, 60000]
            },
            container: this.container,
            ui: { components: ['compass'] }
          });
        } else {
          this.map.remove(this.graphicsLayer);
        }

        // until here it is the map tracks code from René


        // new graphics layer
        this.graphicsLayer = new GraphicsLayer();

        // four different circle symbols for the four different app ids
        var symbol_h_w = {
          type: "simple-marker", 
          color: [102, 255, 255],
          size: 8,
        };

        var symbol_h_wo = {
          type: "simple-marker", 
          color: [0, 138, 230],
          size: 8,
        };

        var symbol_r_w = {
          type: "simple-marker", 
          color: [0, 255, 0],
          size: 8,
        };

        var symbol_r_wo = {
          type: "simple-marker", 
          color: [0, 100, 0],
          size: 8,
        };

        // for every session should be the last map center (when the user selected an item in the list) added to the map
        // depending on the appid
        for(var i=0; i<buckets.length; i++){

          var hits = buckets[i].events.hits.hits
          var source = buckets[i].events.hits.hits[hits.length-1]._source;
          var appid = source.app_id;

          if(appid == 'hotels_with_indicators'){
            console.log('hw');
            var point = {
              type: "point", 
              spatialReference: {wkid: 102100},
              x: source.map_center.x,
              y: source.map_center.y
            };
  
            var pointGraphic = new Graphic({
              geometry: point,
              symbol: symbol_h_w
            });
  
            this.graphicsLayer.add(pointGraphic);
            this.map.add(this.graphicsLayer);
        
          }

          else if(appid == "hotels_without_indicators"){

            console.log('hwo');

            var point = {
              type: "point", 
              spatialReference: {wkid: 102100},
              x: source.map_center.x,
              y: source.map_center.y
            };
  
            var pointGraphic = new Graphic({
              geometry: point,
              symbol: symbol_h_wo
            });
  
            this.graphicsLayer.add(pointGraphic);
            this.map.add(this.graphicsLayer);
        
          }

          else if(appid == 'realestate_without_indicators'){
            console.log('rwo');
            var point = {
              type: "point", 
              spatialReference: {wkid: 102100},
              x: source.map_center.x,
              y: source.map_center.y
            };
  
            var pointGraphic = new Graphic({
              geometry: point,
              symbol: symbol_r_wo
            });
  
            this.graphicsLayer.add(pointGraphic);
            this.map.add(this.graphicsLayer);
        
          }

          else if(appid == 'realestate_with_indicators'){
            console.log('rw');
            var point = {
              type: "point", 
              spatialReference: {wkid: 102100},
              x: source.map_center.x,
              y: source.map_center.y
            };
  
            var pointGraphic = new Graphic({
              geometry: point,
              symbol: symbol_r_w
            });
  
            this.graphicsLayer.add(pointGraphic);
            this.map.add(this.graphicsLayer);

          }
          else{
            i++;
          }
        }

      })
      .catch(err => {
        console.error(err);
      });
    }
}
