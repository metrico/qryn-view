import setLogs from "./setLogs";
import setLoading from "./setLoading";
import { environment } from "../environment/env.dev";
// load logs function

export default function (label, time, limit) {
    // add start - stop
    const [startTs, stopTs] = time;

    const parsedTime = "&start=" + startTs.getTime() + "000000" + "&end=" + stopTs.getTime() +"000000";
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(setLoading(true));

            // add a default URI
            // set it on main state machine
            // encode query as URI

            let query = `${encodeURIComponent(label)}`;

            // query options
            // take a deep look at this!

            let options = {
                method: "GET",
                    headers: {
                      "Content-Type": "application/javascript",
                      //"Content-Type": "application/x-www-form-urlencoded;",
                      "Origin": "http://localhost:3000/",
                      "Access-Control-Request-Method": "GET",
                      "Access-Control-Request-Headers": "X-Requested-With"
                    }
                  };
            const url = `/loki/api/v1/query_range?query=${query}&limit=${limit}${parsedTime}&step=100`;

            fetch(url, options)
                // get response from api

                .then((response) => {
             

                    if (response.status >= 200 && response.status < 300) {
                  
                        return response.json();
                    } else {

                        dispatch(setLoading(false));
                    }
                })

                .then((json) => {
                
                    var messages = [];
                 
                    if (json?.status === "success") {
                    
                    } else {
                        console.log(json.data.response);
                    }
                    var data = json.data.result; // array
             
                    data.forEach((element) => {
                        element.values.forEach((log) => {
                            const [ts, text] = log;

                            messages.push({
                                timestamp: parseInt(ts / 1000000),
                                text,
                                tags: element.stream,
                                showTs: true,
                                showLabels: false,
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
