import { loadCss, loadModules } from './libs/esri-loader';

const JS_API_URL = '//js.arcgis.com/4.8/';

export default class Levels_hotels_with_indicators_Visualization {
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

  render(tracks) {
    if (!tracks || !tracks.length) {
      this.destroy();
      return;
    }
    if (!this.container) {
      this.createContainer();
    }
    this.renderMap(tracks);
  }

  renderMap(tracks) {
    loadModules([
      'esri/Map',
      'esri/views/SceneView',
      "esri/layers/GraphicsLayer",
      "esri/Graphic"
    ], { url: JS_API_URL })
      .then(([Map, SceneView, GraphicsLayer, Graphic]) => {
        if (!this.view) {
          const map = this.map = new Map({
            basemap: 'dark-gray',
          });
          this.view = new SceneView({
            map,
            camera: {
              heading: 0,
              tilt: 100,
              position: [7.62571, 51.366, 5000]
            },
            container: this.container,
            ui: { components: ['compass'] }
          });
        } else {
          this.map.remove(this.graphicsLayer);
        }
        let graphicTracks = tracks.map(track => {
          let polyline = {
            type: "polyline",
            spatialReference: {wkid: 102100},
            paths: track.events.map(event => {
              return [event.center.x, event.center.y, event.scale /10]
            })
          };

          let lineSymbol = {
            type: "simple-line",
            color: [30,144,255],
            width: 0
          };

          return new Graphic({
            geometry: polyline,
            symbol: lineSymbol
          });

        })


        this.graphicsLayer = new GraphicsLayer();
        this.graphicsLayer.addMany(graphicTracks);
        this.map.add(this.graphicsLayer);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
