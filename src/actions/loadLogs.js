import setLogs from "./setLogs";
import setLoading from "./setLoading";
import { DEV_ENV } from "../environment/env.dev";
// load logs function
export default function (label, endpoint, year, month) {
 
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {

      dispatch(setLoading(true));

      // add a default URI 
      // set it on main state machine
      // encode query as URI
      
      let query = `${encodeURIComponent(label)}`
      
      // query options
      // take a deep look at this!

      let options = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
           
        }
    };


      // get the server config 
      //* add an env preconfigured on application

     // let server = endpoint ? endpoint : "http://localhost:3100";
      
      //let queryUrl = `${server}/loki/api/v1/query_range?query=`+label;
     // let queryUrl = `${server}/loki/api/v1/query_range?query=`+query;
     const url = `${DEV_ENV.apiUrl}/loki/api/v1/query_range?query=${query}`
     console.log(url)
      // *trying with this url and this query

      console.log("try", url, query);
      // fetch => query, options

      fetch(url,options)
      // get response from api

        .then((response) => {
          console.log("raw", response);


          if ((response.status >= 200 && response.status < 300)) {
            console.log(response.status)
            return response.json();

          } else {
           
            // set the error response
            /**
             * dispatch(responseError(response.error))
             */
            // var error = new Error(response.statusText);
            // error.response = response;
            // throw error;
            console.log('response')
            dispatch(setLoading(false))
          }
        })

        .then((json) => {
          console.log("got", json);
	  var messages = [];
    console.log(json)
    if(json?.status === "success") {
      console.log("SUCCESS")
    } else {
      console.log(json.data.response)
    }
	  var data = json.data.result; // array
console.log(data)
	  data.forEach((element) => {
		element.values.forEach(log => {
      
      const [ts,text] = log

			messages.push({
        timestamp: parseInt(ts/1000000), 
        text,
        tags: element.stream,
      showTs:true,
      showLabels:false
      });
		});
	  });
	  var resp = { messages };

          dispatch(setLogs(resp));
          dispatch(setLoading(false));
          // dispatch( rigth messages query)
          // dispatch amount of queries
          resolve();
        })
        .catch((error) => {
          dispatch(setLoading(false));
          /// get the transaction status
  
          // dispatch( wrong messages query)
          reject(error);
        });
    });
  };
}
