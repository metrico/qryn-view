import axios from "axios";
import setLogs from "./setLogs";
import setLoading from "./setLoading";
import store from "../store/store";
import setMatrixData from "./setMatrixData";
import { nanoid } from "nanoid";
import { setStartTime, setStopTime } from "./";
import { findRangeByLabel } from "../components/StatusBar/components/daterangepicker/utils";
import { setQueryTime } from "./setQueryTime";
import setIsEmptyView from "./setIsEmptyView";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";

// import adjustedStep from "../components/QueryTypeBar/helpers";
const debugMode = store.getState().debugMode;
export async function getAsyncResponse(
    cb //: callback dispatch function
) {
    return await cb;
}

export function sortMessagesByTimestamp(
    messages //:array sort by timestamp
) {
    const startTime = performance.now();
    const mess = messages?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    const duration = performance.now() - startTime;
    if (debugMode)
        console.log("🚧 loadLogs / sorting logs took: ", duration, " ms");
    return mess;
}

export function fromNanoSec(
    ts // :timestamp
) {
    return parseInt(ts / 1000000);
}

export function mapStreams(streams) {
    const startTime = performance.now();
    let messages = [];

    streams.forEach((stream) => {
        stream.values.forEach(([ts, text], i) => {
            messages.push({
                type: "stream",
                timestamp: fromNanoSec(ts),
                text,
                tags: stream.stream || {},
                showTs: true,
                showLabels: false,
                id: nanoid(),
            });
        });
    });

    const duration = performance.now() - startTime;

    if (debugMode)
        console.log("🚧 loadLogs / mapping logs took: ", duration, " ms");
    return sortMessagesByTimestamp(messages);
}

function getTimeParsed(time) {
    return time.getTime() + "000000";
}

export const responseActions = {
    stream: (props) => parseStreamResponse(props),
    vector: (props) => parseVectorResponse(props),
    matrix: (props) => parseMatrixResponse(props),
};

export function parseResponse(responseProps) {
    const { type } = responseProps;
    responseActions[type](responseProps)
}

export function parseStreamResponse(responseProps) {
    const { result, time, debugMode, queryType, dispatch } = responseProps;

    // get the needed params from parent
    let messages = mapStreams(result);
    dispatch(setMatrixData([]));
    const messSorted = sortMessagesByTimestamp(messages);
    if (messSorted) {
        try {
            getAsyncResponse(dispatch(setLogs(messSorted || []))).then(() => {
                if (messSorted.length === 0) {
                    if (debugMode)
                        console.log("🚧 loadLogs / getting no messages sorted");
                    dispatch(setIsEmptyView(true));
                }
                dispatch(setIsEmptyView(false));
                dispatch(setLoading(false));
            });
            if (queryType === "instant") {
                store.dispatch(setQueryTime(time));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export function parseMatrixResponse(responseProps) {
    const { result, debugMode, dispatch } = responseProps;

    try {
        const idResult = result?.map((m) => ({ ...m, id: nanoid() })) || [];

        getAsyncResponse(dispatch(setMatrixData(idResult || []))).then(() => {
            dispatch(setLoading(false));
            if (idResult.length === 0) {
                if (debugMode)
                    console.log("🚧 loadLogs / getting no data from matrix");
                dispatch(setIsEmptyView(true));
            }
            dispatch(setIsEmptyView(false));
        });
    } catch (e) {
        if (debugMode)
            console.log(
                "🚧 loadLogs / getting an error from rendering matrix type streams"
            );
        console.log(e);
    }
}

export function parseVectorResponse(responseProps) {
    // gotta process this sht
    const { result, debugMode, dispatch } = responseProps;
    try {
        getAsyncResponse(dispatch(setLogs(result || []))).then(() => {
            dispatch(setLoading(false));
            if (result.length === 0) {
                if (debugMode)
                    console.log("🚧 loadLogs / getting no data from matrix");
                dispatch(setIsEmptyView(true));
            }
            dispatch(setIsEmptyView(false));
        });
    } catch (e) {
        if (debugMode)
            console.log(
                "🚧 loadLogs / getting an error from rendering vector type streams"
            );
        console.log(e);
    }
}

export function useStreamResponse(result) {
    const streamParsed = useMemo(() => {
        return mapStreams(result);
    }, [result]);

    return {
        source: "A",
        logs: streamParsed,
    };
}

export function useTableStreamResponse(result) {
    const tableStreamParsed = useMemo(() => {}, [result]);

    return {
        source: "A",
        tableData: tableStreamParsed,
    };
}

// export function parseVectorResponse(res) {
//     setVectorTable(res);
// }

export function setStreamTable(res) {}
export function setVectorTable(res) {}
export function setMatrixTable(res) {}

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
        debugMode,
    } = localStore;
    let { start: startTs, stop: stopTs } = localStore;

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

    // a funciton that process different type of responses
    // and triggers its native display + table

    return async function (dispatch) {
        dispatch(setLoading(true));
        dispatch(setIsEmptyView(false));
        dispatch(setLogs([]));
        dispatch(setMatrixData([]));

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
                    let messages = [];
                    const result = response?.data?.data?.result;
                    const type = response?.data?.data?.resultType;
                    const parseProps = {
                        result,
                        time,
                        debugMode,
                        queryType,
                        dispatch,
                        type,
                    };
                    parseResponse(parseProps)

                    // if (type === "streams") {
                    //     const streamProps = {
                    //         result,
                    //         time,
                    //         debugMode,
                    //         queryType,
                    //         dispatch,
                    //         type,
                    //     };

                    //     messages = mapStreams(result);
                    //     dispatch(setMatrixData([]));
                    //     const messSorted = sortMessagesByTimestamp(messages);
                    //     if (messSorted) {
                    //         try {
                    //             getAsyncResponse(
                    //                 dispatch(setLogs(messSorted || []))
                    //             ).then(() => {
                    //                 if (messSorted.length === 0) {
                    //                     if (debugMode)
                    //                         console.log(
                    //                             "🚧 loadLogs / getting no messages sorted"
                    //                         );
                    //                     dispatch(setIsEmptyView(true));
                    //                 }
                    //                 dispatch(setIsEmptyView(false));
                    //                 dispatch(setLoading(false));
                    //             });
                    //             if (queryType === "instant") {
                    //                 store.dispatch(setQueryTime(time));
                    //             }
                    //         } catch (e) {
                    //             console.log(e);
                    //         }
                    //     }
                    // }
                    // if (type === "vector") {
                    //     // gotta process this sht
                    //     try {
                    //         getAsyncResponse(
                    //             dispatch(setLogs(result || []))
                    //         ).then(() => {
                    //             dispatch(setLoading(false));
                    //             if (result.length === 0) {
                    //                 if (debugMode)
                    //                     console.log(
                    //                         "🚧 loadLogs / getting no data from matrix"
                    //                     );
                    //                 dispatch(setIsEmptyView(true));
                    //             }
                    //             dispatch(setIsEmptyView(false));
                    //         });
                    //     } catch (e) {
                    //         if (debugMode)
                    //             console.log(
                    //                 "🚧 loadLogs / getting an error from rendering vector type streams"
                    //             );
                    //         console.log(e);
                    //     }
                    // }

                    // if (type === "matrix") {
                    //     try {
                    //         const idResult =
                    //             result?.map((m) => ({ ...m, id: nanoid() })) ||
                    //             [];

                    //         getAsyncResponse(
                    //             dispatch(setMatrixData(idResult || []))
                    //         ).then(() => {
                    //             dispatch(setLoading(false));
                    //             if (idResult.length === 0) {
                    //                 if (debugMode)
                    //                     console.log(
                    //                         "🚧 loadLogs / getting no data from matrix"
                    //                     );
                    //                 dispatch(setIsEmptyView(true));
                    //             }
                    //             dispatch(setIsEmptyView(false));
                    //         });
                    //     } catch (e) {
                    //         if (debugMode)
                    //             console.log(
                    //                 "🚧 loadLogs / getting an error from rendering matrix type streams"
                    //             );
                    //         console.log(e);
                    //     }
                    // }
                } else {
                    dispatch(setLogs([]));

                    dispatch(setMatrixData([]));
                }
            })
            .catch((error) => {
                dispatch(setLogs([]));
                dispatch(setMatrixData([]));
                dispatch(setLoading(false));

                if (debugMode)
                    console.log("getting an error from response: ", error);
                dispatch(setIsEmptyView(true));
            });
    };
}
