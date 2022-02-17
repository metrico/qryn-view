
import './jquery-loader'
import ReactFlot from 'react-flot';
import 'react-flot/flot/jquery.flot.time.min';
import { useDispatch,  useSelector} from 'react-redux';
import 'react-flot/flot/jquery.flot.time.min';
import * as moment from 'moment'
function ClokiChart (props) {


    const matrixData = useSelector( store => store.matrixData)
    const spliced = matrixData
    console.log(matrixData)


    const formatLabel = (labels) => {
        return "{" + Object.entries(labels).map(([key,value]) => (
            `${key}="${value}"`
        )).join(",") + "}"
        }
    const formatTs = (values) => {
    //    console.log(values)
    //    const vals = []
    //     const formatted = new Date(moment(values[0]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
    //     return [formatted,values[1]]
return values.map((ts,value)=> {
    const formatted = new Date(moment(ts).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
    return [formatted,value]
})
    }
    const dataParsed = spliced.map(m => ({data:m.values,label:formatLabel(m.metric)}))
// console.log(dataParsed)
    const options = {
      xaxis:{
        
      },
      series: {
        lines: {show:true, lineWidth:1},
        point:{show:true, 
          fill:false,
          points:{radius:8,
          symbol:"circle"
        }},
       shadowSize:0
      }
  
    }
    return (
        <div>
 
          <ReactFlot id="product-chart" options={options} data={dataParsed} width="100%" height="800px" />
        </div>
      );
}

export default ClokiChart;