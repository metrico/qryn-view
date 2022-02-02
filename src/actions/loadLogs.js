import setLogs from "./setLogs";
import setLoading from "./setLoading";
import { environment } from "../environment/env.dev";
import axios from "axios";

// *query : LogQl Query 
// *limit : Limit of returned lines
// *start : The start time for the query as a nanosecond Unix epoch. Defaults to one hour ago 
// *end : The end time for the query as a nanosecond Unix epoch. Defaults to now
// *step : Resolution step width in either a duration [1s, 5s, 5m etc] or number of seconds
// *direction : Determines sort order of logs. Either forward or backward. Default is backward
// time: [start,end]

export default function loadLogs(label, time, limit, step, direction ) {

console.log("step",step)
    // const step = 120
    // const direction = 'backward'

    const [startTs, stopTs] = time;
    const origin = window.location.origin
    const parsedTime = "&start=" + startTs.getTime() + "000000" + "&end=" + stopTs.getTime() + "000000";
    const url = environment.apiUrl;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin": origin,

        }
    };
    const queryStep = `&step=${step || 120}`
    const query = `${encodeURIComponent(label)}`;

    const getUrl = `${url}/loki/api/v1/query_range?query=${query}&limit=${limit}${parsedTime}${queryStep}`

    return function (dispatch) {
        dispatch(setLoading(true))
        axios.get(getUrl, options)
            ?.then(response => {
                console.log(response)
                if (response?.data?.data) {
                    let messages = [];

                    var data = response?.data?.data.result; // array
                    data.forEach((element) => {
                        element?.values?.forEach((log) => {
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
                }
            }).catch(error => {
                dispatch(setLoading(false))
                console.log(error)
            })
    }
}
