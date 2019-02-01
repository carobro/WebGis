import { loadCss, loadModules } from './libs/esri-loader';
import optionsTemplate from './options_template.html';
import uiModules from 'ui/modules';


const JS_API_URL = '//js.arcgis.com/4.8/';

export default class TracksVisualization {
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

  render(coords) {
    if (!coords || !coords.length) {
      this.destroy();
      return;
    }
    if (!this.container) {
      this.createContainer();
    }
    this.renderMap(coords);
  }
  renderMap(coords) {
    
    
    console.log(coords);
    loadModules([
      "esri/Map",
      "esri/views/SceneView",
      "esri/layers/GraphicsLayer",
      "esri/Graphic"
    ], { url: JS_API_URL })
      .then(([Map, SceneView, GraphicsLayer, Graphic]) => {
        if (!this.view) {
          const map = this.map = new Map({
            basemap: 'topo'
          });
          this.view = new SceneView({
            map,
            camera: {
              heading: 0,
              tilt: 0,
              position: [7.6261347, 51.9606649, 50000]
            },
            container: this.container,
            ui: { components: ['compass'] }
          });
        } else {
          this.map.remove(this.graphicsLayer);
        }

        var symbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [226, 119, 40],
        };

        this.graphicsLayer = new GraphicsLayer();

        for(var i = 0; i<coords.length; i++){

          var point = {
            type: "point", // autocasts as new Point()
            spatialReference: {wkid: 102100},
            x: coords[i][0],
            y: coords[i][1]
          };

          var pointGraphic = new Graphic({
            geometry: point,
            symbol: symbol
          });

          this.graphicsLayer.add(pointGraphic);
          this.map.add(this.graphicsLayer);

        }

        this.map.add(this.graphicsLayer);

    
      })
      .catch(err => {
        console.error(err);
      });
  }
}
