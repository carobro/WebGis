import { loadCss, loadModules } from './libs/esri-loader';

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
      "esri/Graphic",
      "esri/geometry/Point"
    ], { url: JS_API_URL })
      .then(([Map, SceneView, GraphicsLayer, Graphic, Point]) => {
        if (!this.view) {
          const map = this.map = new Map({
            basemap: 'dark-gray'
          });
          this.view = new SceneView({
            map,
            camera: {
              heading: 0,
              tilt: 0,
              position: [7.6261347, 51.9606649, 20000]
            },
            container: this.container,
            ui: { components: ['compass'] }
          });
        } else {
          this.map.remove(this.graphicsLayer);
        }
          let lineSymbol = {
            type: "simple-line",
            color: [151, 255, 255],
            width: 2
          };

          return new Graphic({
            geometry: polyline,
            symbol: lineSymbol
          });
        })
        // Algorithmus
        while(i <= mouseclick.length && Q.length){
          d = Point.distance(P[i+1], Q[j]);
          while(i+1 <= P.length && Point.distance(P[i+1], Q[j]) < d){
            pen = pen + Point.distance(P[i], P[i+1])
            j = j+1;
            d = Point.distance(P[i], Q[j]);
           }
          dist = dist + d;
          n = n +1;
          if((dist/n) > D){
            return D*2;
          }
          pen = pen - (D - d);
         i = i+ 1; j = j+1;
        }
        dist = dist / n;
        while(i <= P.length){
          pen = pen + Point.distance(P[i-1], P[i])
        }
        while(j <= Q.length){
          pen = pen + Point.distance(Q[j-1], Q[j])
        }
        return dist + pen;
      })
      this.graphicsLayer = new GraphicsLayer();
      this.graphicsLayer.addMany(graphicTracks);
      this.map.add(this.graphicsLayer);

      .catch(err => {
        console.error(err);
      });
  }
}
