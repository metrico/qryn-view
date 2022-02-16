import axios from "axios";
import { environment } from "../environment/env.dev";
import setLogs from "./setLogs";
import setLoading from "./setLoading";


// *query : LogQl Query
// *limit : Limit of returned lines
// *start : The start time for the query as a nanosecond Unix epoch. Defaults to one hour ago
// *end : The end time for the query as a nanosecond Unix epoch. Defaults to now
// *step : Resolution step width in either a duration [1s, 5s, 5m etc] or number of seconds
// *direction : Determines sort order of logs. Either forward or backward. Default is backward

// *time: [start,end]

export default function loadLogs(label, time, limit, step, apiUrl) {
    // const step = 120
    // const direction = 'backward'
    const origin = window.location.origin;
    const url = apiUrl;
    const [startTs, stopTs] = time;
    const parsedTime ="&start=" + startTs.getTime() +"000000" +"&end=" + stopTs.getTime() + "000000";

    const queryStep = `&step=${step || 120}`;

    const query = `${encodeURIComponent(label)}`;

    const getUrl = `${url}/loki/api/v1/query_range?query=${query}&limit=${limit}${parsedTime}${queryStep}`;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin": origin,
        },
    };

    const fromNanoSec = (ts) => parseInt(ts / 1000000); // stream type will come in Nanoseconds
    const toMiliseC = (ts) => parseInt(ts * 1000); // matrix type will come without millisec
    const getTimestamp = (type) => (ts) =>
        type === "streams"
            ? fromNanoSec(ts)
            : type === "matrix"
            ? toMiliseC(ts)
            : ts;
    const mapStreams = (streams, messages, type) => {
        streams.forEach((stream) => {
            stream.values.forEach((log,i) => {
                let [ts, text] = log;
                messages.push({
                    type,
                    timestamp: getTimestamp(type)(ts),
                    text,
                    tags: type === "streams"
                            ? stream.stream
                            : type === "matrix"
                            ? stream.metric
                            : {},
                    showTs: true,
                    showLabels: false,
                    id:i+ts
                });
            });
        });
    };

    //const mapMatrix
    return function (dispatch) {
        dispatch(setLoading(true));

        axios
            .get(getUrl, options)
            ?.then((response) => {
                if (response?.data?.data) {
                    let messages = [];
                    const result = response?.data?.data.result; // array
                    const type = response?.data?.data?.resultType;

                    mapStreams(result, messages, type);
                    dispatch(setLogs(messages || []));
                    dispatch(setLoading(false));
                }
                dispatch(setLoading(false));
            })
            .catch((error) => {
                dispatch(setLoading(false));
                console.log(error);
            });
    };
}
