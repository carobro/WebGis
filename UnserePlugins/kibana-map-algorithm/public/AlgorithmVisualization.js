import { loadCss, loadModules } from './libs/esri-loader';
import { tooManyRequests } from 'boom';
import { runInContext } from 'vm';
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
      "esri/geometry/geometryEngine"
    ], { url: JS_API_URL })
      .then(([Map, SceneView, GraphicsLayer, Graphic, geometryEngine]) => {
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
        debugger
        let graphicTracks = tracks.map(track => {
          let polyline = {
            type: "polyline",
            spatialReference: {wkid: 102100},
            paths: track.events.map(event => {
              return [event.center.x, event.center.y]
            })
          };

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

        this.graphicsLayer = new GraphicsLayer();
        this.graphicsLayer.addMany(graphicTracks);
        this.map.add(this.graphicsLayer);

        routedistance(tracks) {
          debugger
          // Algorithmus
          dist = 0; // distance
          pen = 0; // penalty
          n = 0; // number of corresponding points
          i = 1; // indice of points in P
          j = 1; // indice of points in Q
          D = 1; // Distance treshold
          P = graphicTracks;
          Q = tracks;
          while(i <= P.length && j <= Q.length){
            d =  geometryEngine.distance(P[i+1], Q[j]);
            while(i+1 <= P.length && geometryEngine.distance(P[i+1], Q[j]) < d){
              pen = pen + geometryEngine.distance(P[i], P[i+1]);
              i = i+1;
              d = geometryEngine.distance(P[i], Q[j]);
            }
            while(j+1 <= Q.length && geometryEngine.distance(P[i], Q[j+1]) < d){
              pen = pen + geometryEngine.distance(Q[j], Q[j+1]);
              j = j+1; 
              d = geometryEngine.distance(P[i], Q[j]);
            } 
            dist = dist + d;
            n = n + 1;
            if((dist/n) > D){
              return D*2;
            }
            pen = pen - (D - d);
            i = i + 1; 
            j = j + 1;
          }
          dist = dist / n;
          while(i <= P.length){
            pen = pen + geometryEngine.distance(P[i-1], P[i]);
          }
          while(j <= Q.length){
            pen = pen + geometryEngine.distance(Q[j-1], Q[j]);
          }
          return dist + pen;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
