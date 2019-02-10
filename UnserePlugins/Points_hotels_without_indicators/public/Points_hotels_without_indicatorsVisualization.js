import { loadCss, loadModules } from './libs/esri-loader';

const JS_API_URL = '//js.arcgis.com/4.8/';

export default class Points_hotels_without_indicatorsVisualization {
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

        this.graphicsLayer = new GraphicsLayer();

        var hotels = [[848622.393214224, 6796729.379318867], [849183.7276407548, 6790735.641405604], [847399.4007616857, 6794679.314333653], [845389.3457834844, 6794012.281829031], [850639.6141638209, 6794958.190054057], [855539.9442740196, 6797092.455203246], [841921.8042853264, 6793535.406437839], [843584.3096505267, 6798140.737392016], [842737.5306965752, 6789544.5575313615], [847845.6739774196, 6785777.048066906], [852699.4252735218, 6788318.579257384]];
        console.log(hotels);

        var hotel_symbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [128, 128, 128],
          size: 12,
          outline: {
            color: [0,0,0],
            width: 2,
          }
        };

        for(var i = 0; i<hotels.length; i++){

          var point = {
            type: "point", // autocasts as new Point()
            spatialReference: {wkid: 102100},
            x: hotels[i][0],
            y: hotels[i][1]
          };

          var pointGraphic = new Graphic({
            geometry: point,
            symbol: hotel_symbol
          });

          this.graphicsLayer.add(pointGraphic);
          this.map.add(this.graphicsLayer);

        }

        var symbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [0, 138, 230],
          size: 8,
        };

        for(var i = 0; i<coords.length; i++){

          var point = {
            type: "point", // autocasts as new Point()
            spatialReference: {wkid: 102100},
            x: coords[i][0],
            y: coords[i][1]
          };

          var pointGraphic2 = new Graphic({
            geometry: point,
            symbol: symbol
          });

          this.graphicsLayer.add(pointGraphic2);
          this.map.add(this.graphicsLayer);

        }

        //this.map.add(this.graphicsLayer);

    
      })
      .catch(err => {
        console.error(err);
      });
  }
}
