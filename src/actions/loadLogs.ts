import axios from "axios";
import setLogs from "./setLogs";
import setLoading from "./setLoading";
import store from "../store/store";
import setMatrixData from "./setMatrixData";

import { setStartTime, setStopTime } from ".";
import { findRangeByLabel } from "../components/StatusBar/components/daterangepicker/utils";

import setIsEmptyView from "./setIsEmptyView";

import { setVectorData } from "./setVectorData";
import { Endpoint, QueryType, QueryOptions, QueryResult } from "./types";
import { getTimeParsed, parseResponse } from "./helpers/parseResponse";

export default function loadLogs() {
    const localStore = store.getState();
    const { query, limit, step, apiUrl, from, to, debugMode } = localStore;
    let { start: startTs, stop: stopTs, label: rangeLabel } = localStore;
    let startS: Date = startTs;
    const rl: string = rangeLabel;
    const time = localStore.time || new Date().getTime() + "000000";
    const parsedStart = getTimeParsed(startTs);
    const parsedStop = getTimeParsed(stopTs);
    const parsedTime =
        "&start=" + (from || parsedStart) + "&end=" + (to || parsedStop);

    if (findRangeByLabel(rl)) {
        let rngeLabel = findRangeByLabel(rl); // this should be done before
    }

    store.dispatch(setStartTime(startS));
    store.dispatch(setStopTime(stopTs));

    const queryType: QueryType = store.getState().queryType;
    const origin = window.location.origin;
    const url = apiUrl;
    const queryStep = `&step=${step || 120}`;
    const encodedQuery = `${encodeURIComponent(query)}`;
    const queryUrl = `${url}/loki/api/v1`;
    const rangeEP = `${queryUrl}/query_range?query=${encodedQuery}&limit=${limit}${parsedTime}${queryStep}`;
    const instantEP = `${queryUrl}/query?query=${encodedQuery}&limit=${limit}&time=${time}`;

    const endpoint: Endpoint = { instant: instantEP, range: rangeEP };

    let options: QueryOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin": origin,
        },
    };

    // a funciton that process different type of responses
    // and triggers its native display + table

    return async function (dispatch: Function) {
        dispatch(setLoading(true));
        dispatch(setIsEmptyView(false));
        dispatch(setLogs([]));
        dispatch(setMatrixData([]));
        dispatch(setVectorData([]));

        let cancelToken: any;
        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel("Cancelling the previous req");
        }
        cancelToken = axios.CancelToken.source();
        options.cancelToken = cancelToken.token;
        await axios
            .get(endpoint[queryType], options)
            ?.then((response) => {
                if (response?.data?.streams?.length === 0) {
                    if (debugMode)
                        console.log(
                            "🚧 loadLogs / getting no data from streams"
                        );
                    dispatch(setIsEmptyView(true));
                }
                if (response?.data?.data) {
                    const result = response?.data?.data?.result;
                    const type = response?.data?.data?.resultType;
                    const resultQuery: QueryResult = {
                        result,
                        time,
                        debugMode,
                        queryType,
                        dispatch,
                        type,
                    };

                    parseResponse(resultQuery);
                } else {
                    dispatch(setLogs([]));
                    dispatch(setVectorData({}));
                    dispatch(setMatrixData([]));
                }
            })
            .catch((error) => {
                dispatch(setLogs([]));
                dispatch(setMatrixData([]));
                dispatch(setVectorData({}));

                if (debugMode)
                    console.log("getting an error from response: ", error);
                dispatch(setIsEmptyView(true));
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };
}
