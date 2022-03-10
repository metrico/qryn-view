import axios from "axios";
import setLogs from "./setLogs";
import setLoading from "./setLoading";
import store from "../store/store";
import setMatrixData from "./setMatrixData";
import {nanoid} from 'nanoid'
import { findRangeByLabel } from "../plugins/daterangepicker/utils";
import { setStartTime, setStopTime } from "./";
// *query : LogQl Query
// *limit : Limit of returned lines
// *start : The start time for the query as a nanosecond Unix epoch. Defaults to one hour ago
// *end : The end time for the query as a nanosecond Unix epoch. Defaults to now
// *step : Resolution step width in either a duration [1s, 5s, 5m etc] or number of seconds
// *direction : Determines sort order of logs. Either forward or backward. Default is backward

export default function loadLogs() {
    // const step = 120
    // const direction = 'backward'
    const localStore = store.getState();
    const { query, limit, step, apiUrl, label: rangeLabel } = localStore;
    let { start: startTs, stop: stopTs } = localStore;

    if (findRangeByLabel(rangeLabel)) {
        ({ dateStart: startTs, dateEnd: stopTs } =
            findRangeByLabel(rangeLabel));
    }

    store.dispatch(setStartTime(startTs));
    store.dispatch(setStopTime(stopTs));

    const origin = window.location.origin;
    const url = apiUrl;
    const parsedTime ="&start=" +
        startTs?.getTime() +
        "000000" +
        "&end=" +
        stopTs?.getTime() +
        "000000";

    const queryStep = `&step=${step || 120}`;

    const encodedQuery = `${encodeURIComponent(query)}`;

    const getUrl = `${url}/loki/api/v1/query_range?query=${encodedQuery}&limit=${limit}${parsedTime}${queryStep}`;

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
            stream.values.forEach((log, i) => {
                let [ts, text] = log;
                messages.push({
                    type,
                    timestamp: getTimestamp(type)(ts),
                    text,
                    tags:
                        type === "streams"
                            ? stream.stream
                            : type === "matrix"
                            ? stream.metric
                            : {},
                    showTs: true,
                    showLabels: false,
                    id: nanoid(),
                });
            });
        });
    };

    //const mapMatrix
    return function (dispatch) {
        dispatch(setLoading(true));
        dispatch(setLogs([]));
        dispatch(setMatrixData([]));

        axios
            .get(getUrl, options)
            ?.then((response) => {
                if (response?.data?.data) {
                    let messages = [];
                    const result = response?.data?.data?.result; // array
                    const type = response?.data?.data?.resultType;
                    if (type === "streams") {
                        mapStreams(result, messages, type);
                        dispatch(setMatrixData([]));
                        const messSorted = messages?.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1);
                        dispatch(setLogs(messSorted || []));
                        dispatch(setLoading(false));
                    }

                    if (type === "matrix") {
                        const idResult = result.map( m => ({...m,id:nanoid()}))
                        dispatch(setMatrixData(idResult || []));
                        dispatch(setLoading(false));
                    }
                    dispatch(setLoading(false));
                } else {
                    dispatch(setLogs([]));
                    dispatch(setMatrixData([]));
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
