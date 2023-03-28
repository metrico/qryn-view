/* eslint-disable no-restricted-globals */
const getLogs = async (start: number, end: number, host:string) => {

  let result:any = []
  let logLabels = []
  // let debug = false
  // let logsdebug = false
  let logQueries = []
  

  if(logLabels.length <= 0 ) {
      
      /* Get all labels */
    //  if (debug && logsdebug) console.log(host + `/loki/api/v1/labels?start=${start * 1000000}&end=${end * 1000000}`)
     
        let labelsData = await fetch(host + `/loki/api/v1/labels?start=${start * 1000000}&end=${end * 1000000}`)
        let data = await labelsData.json()
        console.log(data.data)
     //   if (debug && logsdebug) console.log('DATA', data)
        if (data.data.length > 0 ) {
          logLabels = data.data
        } 
      

  }

  if(logQueries.length <= 0 )  {
    
      for (let item of logLabels) {
          /* Filter Metric labels out */
          if (item === '__name__' || 
              item === "le" || 
              item === "server" || 
              item === "emitter" || 
              item === "client" ||
              item === "span_kind" ||
              item === "span_name" ||
              item === "status_code"
              ) {
                  continue
              } 
          let values = await fetch(host + '/loki/api/v1/label/' + item + `/values?start=${start * 1000000}&end=${end * 1000000}` )
          let data = await values.json()
          
          for (let val of data.data) {
              logQueries.push(`{${item}="${val}"}`)
          }
          console.log(logQueries)
      }
  }
  
  if (logQueries.length > 0 ) {
   console.log(logQueries)
      for (let query of logQueries) {
          //if (debug && logsdebug) console.log(query, Date.now())
          let logs = await fetch(host + `/loki/api/v1/query_range?query=${query}&start=${start * 1000000}&end=${end * 1000000}`)
          let data = await logs.json()
          console.log(data, "DATA")
         // console.log(JSON.stringify(data))
         // if (debug && logsdebug) console.log('Streams', data.data.result)
          if (data?.data?.result?.length > 0) {
           //   if (debug && logsdebug) console.log('Full Streams', data.data.result)
              result = [...result,data.data.result]
          }
      }
  }

  console.log(result)
  return JSON.stringify({result,logQueries,logLabels})

  };

  export default getLogs