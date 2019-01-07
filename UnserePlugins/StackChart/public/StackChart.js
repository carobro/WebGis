  export default class StackChartVisualization{

    constructor(el, vis) {
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

    createChart(){
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title:{
                text: "Zoomlevel"
            },
            axisX: {
                valueFormatString: "X"
            },
            axisY: {
                prefix: "Y"
            },
            toolTip: {
                shared: true
            },
            legend:{
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [{
                type: "stackedBar",
                name: "Zoomlevel",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 56 },
                    { x: new Date(2017, 0, 31), y: 45 },
                    { x: new Date(2017, 1, 1), y: 71 },
                    { x: new Date(2017, 1, 2), y: 41 },
                    { x: new Date(2017, 1, 3), y: 60 },
                    { x: new Date(2017, 1, 4), y: 75 },
                    { x: new Date(2017, 1, 5), y: 98 }
                ]
            }]
        });
        chart.render();
        
        function toggleDataSeries(e) {
            if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }
    }
  }
  