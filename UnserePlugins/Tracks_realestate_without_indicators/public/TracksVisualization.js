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
            color: [0, 205, 0],
            width: 1
          };

          return new Graphic({
            geometry: polyline,
            symbol: lineSymbol
          });

        })


        this.graphicsLayer = new GraphicsLayer();
		
		var polygon = {
          type: "polygon",
          spatialReference: {wkid:3857},
          rings: [
            [[850365.156300001,6791152.8684],[851165.118700001,6790983.4646],[850897.5891,6790629.9433],[850365.156300001,6791152.8684]],[
            [850365.156300001,6791152.8684],[850352.975299999,6791155.4479],[850362.5299,6791155.4479],[850365.156300001,6791152.8684]],
            [[845699.871210898,6796248.06490637],[845011.937956332,6795531.46776619],[844763.517614406,6795760.77885105],[845470.560126043,6796448.71210562],
            [845690.316582362,6796257.6195349],[845699.871210898,6796248.06490637]],
            [[851298.88353278,6790047.11098674],[851289.328904244,6790047.11098674],[851193.782618888,6790228.64892892],[851642.850160062,6790610.83407034],
            [851814.833473704,6790429.29612817],[851298.88353278,6790047.11098674]],
            [[846655.334064461,6789005.65647636],[846273.148923036,6789378.28698925],[846645.779435926,6789693.58973092],[846961.082177602,6789359.17773218],
            [846645.779435926,6789015.21110489],[846655.334064461,6789005.65647636]],
            [[846153.984595289,6793748.06758926],[846168.316538093,6793547.42039],[845962.892024571,6793528.31113293],[845943.7827675,6793724.18101792],
            [846153.984595289,6793748.06758926]],
            [[847514.582869532,6799344.84893441],[848192.961495581,6799292.29847746],[848152.354324303,6798900.55870749],[847457.255098316,6798967.44110724],
            [847514.582869532,6799344.84893441]],
            [[844762.849851269,6797841.62343572],[844772.404479801,6798381.45994799],[844882.282707964,6798543.8886331],[845355.236820479,6798080.48914912],
            [844762.849851269,6797841.62343572]],
            [[857580.384031861,6796537.41664059],[858898.922769778,6796824.05549666],[858908.477398314,6796824.05549666],[859042.242197813,6796690.29069716],
            [859405.318082167,6796594.7444118],[859357.544939489,6796346.32406987],[857752.367345502,6795973.69355698],[857580.384031861,6796537.41664059]],
            [[854486.140809659,6791012.98450445],[854682.010694645,6791466.8293599],[855580.14577702,6791079.8669042],[855355.612006426,6790721.5683341],
            [854486.140809659,6791012.98450445]],
            [[838459.251342126,6791885.11241629],[838449.69671359,6791889.88973056],[837971.965286795,6791889.88973056],[837656.66254511,6792338.95727175],
            [837723.544944861,6792654.26001343],[837986.297229599,6792783.24749867],[838277.713399944,6792587.37761368],[838459.251342126,6791885.11241629]],
            [[849633.389414611,6795367.77451753],[849614.28015754,6795386.8837746],[849365.859815613,6795530.20320264],[849404.078329756,6796351.9012567],
            [849633.389414611,6796342.34662817],[849814.927356788,6795960.16148674],[849633.389414611,6795367.77451753]]
          ]
        }

        let lineSymbol = {
          type: "simple-line",
          color: [0, 0, 0],
          width: 2
        };

        var polygonGraphic = new Graphic({
          geometry: polygon,
          symbol: lineSymbol
        });

        this.graphicsLayer.add(polygonGraphic);
        this.map.add(this.graphicsLayer);

		
        this.graphicsLayer.addMany(graphicTracks);
        this.map.add(this.graphicsLayer);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
