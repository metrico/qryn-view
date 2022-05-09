import axios from "axios";
import setLogs from "./setLogs";
import setLoading from "./setLoading";
import store from "../store/store";
import setMatrixData from "./setMatrixData";
import { nanoid } from "nanoid";
import { setStartTime, setStopTime } from "./";
import { findRangeByLabel } from "../components/StatusBar/components/daterangepicker/utils";
import { setQueryTime } from "./setQueryTime";
// import adjustedStep from "../components/QueryTypeBar/helpers";

export default function loadLogs() {
    const localStore = store.getState();
    const {
        query,
        limit,
        step,
        apiUrl,
        label: rangeLabel,
        from,
        to,
    } = localStore;
    let { start: startTs, stop: stopTs } = localStore;

    function getTimeParsed(time) {
        return time.getTime() + "000000";
    }
    const time = localStore.time || new Date().getTime() + "000000";
    const parsedStart = getTimeParsed(startTs);
    const parsedStop = getTimeParsed(stopTs);
    const parsedTime =
        "&start=" + (from || parsedStart) + "&end=" + (to || parsedStop);
    if (findRangeByLabel(rangeLabel)) {
        ({ dateStart: startTs, dateEnd: stopTs } = findRangeByLabel(
            rangeLabel
        ));
    }

    store.dispatch(setStartTime(startTs));
    store.dispatch(setStopTime(stopTs));
    const queryType = store.getState().queryType;
    const origin = window.location.origin;
    const url = apiUrl;

    const queryStep = `&step=${step || 120}`;
    const encodedQuery = `${encodeURIComponent(query)}`;
    const queryUrl = `${url}/loki/api/v1`;

    const rangeEP = `${queryUrl}/query_range?query=${encodedQuery}&limit=${limit}${parsedTime}${queryStep}`;
    const instantEP = `${queryUrl}/query?query=${encodedQuery}&limit=${limit}&time=${time}`;

    const endpoint = { instant: instantEP, range: rangeEP };

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin": origin,
        },
    };

    const fromNanoSec = (ts) => parseInt(ts / 1000000);
    const toMiliseC = (ts) => parseInt(ts * 1000);
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

    return async function (dispatch) {
        dispatch(setLoading(true));
        dispatch(setLogs([]));
        dispatch(setMatrixData([]));

        await axios
            .get(endpoint[queryType], options)
            ?.then((response) => {
                if (response?.data?.data) {
                    let messages = [];
                    const result = response?.data?.data?.result; // array
                    const type = response?.data?.data?.resultType;
                    if (type === "streams") {
                        mapStreams(result, messages, type);
                        dispatch(setMatrixData([]));
                        const messSorted = messages?.sort((a, b) =>
                            a.timestamp < b.timestamp ? 1 : -1
                        );
                        if (messSorted) {
                            dispatch(setLogs(messSorted || []));

                            dispatch(setLoading(false));
                            if (queryType === "instant") {
                                store.dispatch(setQueryTime(time));
                            }
                        }
                    }

                    if (type === "matrix") {
                        const idResult =
                            result?.map((m) => ({ ...m, id: nanoid() })) || [];
                        dispatch(setMatrixData(idResult || []));
                        dispatch(setLoading(false));
                    }
                } else {
                    dispatch(setLogs([]));
                    dispatch(setMatrixData([]));
                    dispatch(setLoading(false));
                }
            })
            .catch((error) => {
                dispatch(setLogs([]));
                dispatch(setMatrixData([]));

                dispatch(setLoading(false));
            });
    };
}
