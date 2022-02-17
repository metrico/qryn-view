
import './jquery-loader'
import ReactFlot from 'react-flot';
import 'react-flot/flot/jquery.flot.time.min';
import { useDispatch, useSelector } from 'react-redux';


function ClokiChart(props) {


  const matrixData = useSelector(store => store.matrixData)
  const chartLimit = useSelector(store => store.limit)
  const spliced = matrixData.length > chartLimit ? matrixData.splice(0, chartLimit) : matrixData;
  console.log(matrixData)


  const formatLabel = (labels) => {
    return "{" + Object.entries(labels).map(([key, value]) => (
      `${key}="${value}"`
    )).join(",") + "}"
  }
  const jQ = window.jQuery;

  const formatTs = (values) => {

    return values.map(([ts,val])=>([ts*1000,val]))

  }
  const dataParsed = spliced.map(m => ({ data: formatTs(m.values), label: formatLabel(m.metric) }))
  // console.log(dataParsed)
  const options = {
    xaxis: {
      show: true,
      mode: "time",
    
      timeformat: "%Y/%m/%d %H:%M:%S",


    },
    grid: {
      show: true,
      aboveData: true,
      color: '#999',
      clickable: true,
      hoverable: true,
      autoHighlight: true,
      mouseActiveRadius:10,
      borderWidth: 0,

    },
    tooltip: {
      show: true,
      cssClass:'floatTip',                 //false

      //"%s | X: %x | Y: %y"              // null
      shifts: {
        x: 10,                          //10
        y: 20,                       //20
      },
      defaultTheme: false,               //true
      lines: true,               //false

    },
    interaction: {
      redrawOverlayInterval: 1,
    },
    legend: {
      show: true,

      position: "ne",
      backgroundOpacity: 0,
      container: jQ("#label-container")


    },
    series: {
      lines: { show: false, lineWidth: 1 },
      bars: { show: true, barWidth: 1 },
      points: { show: true, radius: 0 },

      shadowSize: 0
    },
    markings: {
      clickable:true
    }

  }

//   jQ("#product-chart").bind("plotclick", function (event, pos, item) {
//     console.log("You clicked at " + pos.x + ", " + pos.y);
//     // axis coordinates for other axes, if present, are in pos.x2, pos.x3, ...
//     // if you need global screen coordinates, they are pos.pageX, pos.pageY

//     if (item) {
//        console.log(item.series, item.datapoint);
       
//     }
// });
  return (
    <div>

      <ReactFlot id="product-chart" options={options} data={dataParsed} width="100%" height="222px" />
      <div
        style={{
          display: 'flex',
          fontSize: '.95em',
          color: 'orange',
          fontFamily: 'monospace'
        }}
        id={"label-container"}></div>
    </div>
  );
}

export default ClokiChart;