// import axios from "axios";
// import setLogs from "./setLogs";
// import setLoading from "./setLoading";
// import store from "../store/store";
// import setMatrixData from "./setMatrixData";
// import { nanoid } from "nanoid";
// import { setStartTime, setStopTime } from "./";
// import { findRangeByLabel } from "../components/StatusBar/components/daterangepicker/utils";
// import { setQueryTime } from "./setQueryTime";
// import setIsEmptyView from "./setIsEmptyView";

// import { prepareCols, prepareVectorRows, setColumnsData } from "./helpers";

// const debugMode = store.getState().debugMode;
// export async function getAsyncResponse(
//     cb //: callback dispatch function
// ) {
//     return await cb;
// }

// export function sortMessagesByTimestamp(
//     messages //:array sort by timestamp
// ) {
//     const startTime = performance.now();
//     const mess = messages?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
//     const duration = performance.now() - startTime;
//     if (debugMode)
//         console.log("🚧 loadLogs / sorting logs took: ", duration, " ms");
//     return mess;
// }

// export function fromNanoSec(
//     ts // :timestamp
// ) {
//     return parseInt(ts / 1000000);
// }

// export function mapStreams(streams) {
//     const startTime = performance.now();
//     let messages = [];

//     streams.forEach((stream) => {
//         stream.values.forEach(([ts, text], i) => {
//             messages.push({
//                 type: "stream",
//                 timestamp: fromNanoSec(ts),
//                 text,
//                 tags: stream.stream || {},
//                 showTs: true,
//                 showLabels: false,
//                 id: nanoid(),
//             });
//         });
//     });

//     const duration = performance.now() - startTime;

//     if (debugMode)
//         console.log("🚧 loadLogs / mapping logs took: ", duration, " ms");
//     return sortMessagesByTimestamp(messages);
// }

// function getTimeParsed(time) {
//     return time.getTime() + "000000";
// }

// export function parseResponse(response) {



//     const { result, type } = response;

//     switch (type) {
//         case "stream":
//             parseStreamResponse(result);

//             break;
//         case "vector":
//             parseVectorResponse(result);
//             break;
//         case "matrix":
//             parseMatrixResponse(result);
//             break;
//         default:
//             parseStreamResponse(result);
//     }
// }

// export function useStreamResponse(result) {
//     const streamParsed = mapStreams(result);

//     return {
//         source: "A",
//         logs: streamParsed,
//     };
// }

// function useVectorTableData(data) {
//     const cols = prepareCols(data);

//     if (cols) {
//         const columns = setColumnsData(cols);

//         const rowData = prepareVectorRows(data);
//         return {
//             columns,
//             rowData,
//         };
//     }
// }

// function useStreamTableData(data) {

//     const cols = prepareStreamCols(data);

//     if (cols) {
//         const columns = setStreamColumnsData(cols);

//         const rowData = prepareStreamRows(data);

//         return {
//             columns,
//             rowData,
//         };
//     }
// }

// function useMatrixTableData(data) {

//     const cols = prepareMatrixCols(data);

//     if (cols) {
//         const columns = setMatricColumnsData(cols);

//         const rowData = prepareMatrixRows(data);

//         return {
//             columns,
//             rowData,
//         };
//     }
// }

// function tableProcessor(type) {
//     switch (type) {
//         case "stream":
//             return useStreamTableData;
//         case "vector":
//             return useVectorTableData;
//         case "matrix":
//             return useMatrixTableData;
//         default:
//             return useVectorTableData;
//     }
// }

// export function getTableResponse(result, type) {

//     const processResponse = tableProcessor(type);
//     const tableResponse = processResponse(result);

//     return {
//         source: "A",
//         tableData: tableResponse,
//     };
// }


// export function parseStreamResponse(result) {

//     /**
//      * queryType
//      * dispatch
//      * time
//      * res
//      */

//     const messages = mapStreams(result);
//     const tableData = getTableResponse(result,'stream')
    

//     dispatch(setMatrixData([]));

//     const messSorted = sortMessagesByTimestamp(messages);
//     if (messSorted) {
//         try {
//             getAsyncResponse(dispatch(setLogs(messSorted || []))).then(() => {
//                 if (messSorted.length === 0) {
//                     if (debugMode)
//                         console.log("🚧 loadLogs / getting no messages sorted");
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

//     setStreamTable(result);
// }

// export function parseVectorResponse(res) {
//     setVectorTable(res);
// }
// export function parseMatrixResponse(res) {
//     setMatrixTable(res);
// }

// export function setStreamTable(res) {}
// export function setVectorTable(res) {}
// export function setMatrixTable(res) {}

// function resetStore(dispatch) {
//     dispatch(setLoading(true));
//     dispatch(setIsEmptyView(false));
//     dispatch(setLogs([]));
//     dispatch(setMatrixData([]));
// }

// function getTimeParsedString(fromTs, toTs) {
//     const { startTs, from } = fromTs;
//     const { stopTs, to } = toTs;
//     const parsedStart = getTimeParsed(startTs);
//     const parsedStop = getTimeParsed(stopTs);
//     return "&start=" + (from || parsedStart) + "&end=" + (to || parsedStop);
// }
// function getActualTime(source) {
//     return source.time || new Date().getTime() + "000000";
// }

// function getRangeEP(props) {
//     const { queryUrl, encodedQuery, limit, parsedTime, queryStep } = props;

//     return `${queryUrl}/query_range?query=${encodedQuery}&limit=${limit}${parsedTime}${queryStep}`;
// }

// function getInstantEP(props) {
//     const { queryUrl, encodedQuery, limit, time } = props;

//     return `${queryUrl}/query?query=${encodedQuery}&limit=${limit}&time=${time}`;
// }

// function getEndPoint(props) {
//     return { instant: getInstantEP(props), range: getRangeEP(props) };
// }

// function getQueryOptions() {
//     return {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/javascript",
//             "Access-Control-Allow-Origin": window.location.origin,
//         },
//     };
// }

// function setActualTs(dispatch, startTs, stopTs) {
//     dispatch(setStartTime(startTs));
//     dispatch(setStopTime(stopTs));
// }

// function getTimeQueryParams() {
//     const localStore = store.getState();
//     const { label: rangeLabel, from, to } = localStore;
//     let { start: startTs, stop: stopTs } = localStore;

//     const time = getActualTime(localStore);
//     const fromTs = { from, startTs };
//     const toTs = { to, stopTs };

//     const parsedTime = getTimeParsedString(fromTs, toTs);

//     if (findRangeByLabel(rangeLabel)) {
//         ({ dateStart: startTs, dateEnd: stopTs } = findRangeByLabel(
//             rangeLabel
//         ));
//     }

//     return {
//         time,
//         parsedTime,
//         startTs,
//         stopTs,
//     };
// }

// function getQueryRequest() {
//     const localStore = store.getState();
//     const { query, limit, step, apiUrl, debugMode, queryType } = localStore;

//     const url = apiUrl;
//     const queryStep = `&step=${step || 120}`;
//     const encodedQuery = `${encodeURIComponent(query)}`;
//     const queryUrl = `${url}/loki/api/v1`;

//     const { time, parsedTime, startTs, stopTs } = getTimeQueryParams();

//     const queryProps = {
//         queryUrl,
//         encodedQuery,
//         limit,
//         parsedTime,
//         queryStep,
//         time,
//     };

//     const endpoint = getEndPoint(queryProps);

//     const options = getQueryOptions();

//     return { endpoint, options, debugMode, queryType, time, startTs, stopTs };
// }

// export default function loadLogs() {
//     const {
//         endpoint,
//         queryType,
//         debugMode,
//         options,
//         time,
//         startTs,
//         stopTs,
//     } = getQueryRequest();

//     return async function (dispatch) {
//         setActualTs(dispatch, startTs, stopTs);

//         resetStore(dispatch);

//         await axios
//             .get(endpoint[queryType], options)
//             ?.then((response) => {
//                 // do something with response
//                 if (response?.data?.streams?.length === 0) {
//                     if (debugMode)
//                         console.log(
//                             "🚧 loadLogs / getting no data from streams"
//                         );
//                     dispatch(setIsEmptyView(true));
//                 }

//                 if (response?.data?.data) {
//                     let messages = [];
//                     const result = response?.data?.data?.result;
//                     const type = response?.data?.data?.resultType;

//                     // add dispatcher on 're

//                     if (type === "streams") {
//                         messages = mapStreams(result);
//                         dispatch(setMatrixData([]));
//                         const messSorted = sortMessagesByTimestamp(messages);
//                         if (messSorted) {
//                             try {
//                                 getAsyncResponse(
//                                     dispatch(setLogs(messSorted || []))
//                                 ).then(() => {
//                                     if (messSorted.length === 0) {
//                                         if (debugMode)
//                                             console.log(
//                                                 "🚧 loadLogs / getting no messages sorted"
//                                             );
//                                         dispatch(setIsEmptyView(true));
//                                     }
//                                     dispatch(setIsEmptyView(false));
//                                     dispatch(setLoading(false));
//                                 });
//                                 if (queryType === "instant") {
//                                     store.dispatch(setQueryTime(time));
//                                 }
//                             } catch (e) {
//                                 console.log(e);
//                             }
//                         }
//                     }
//                     if (type === "vector") {
//                         try {
//                             getAsyncResponse(
//                                 dispatch(setLogs(result || []))
//                             ).then(() => {
//                                 dispatch(setLoading(false));
//                                 if (result.length === 0) {
//                                     if (debugMode)
//                                         console.log(
//                                             "🚧 loadLogs / getting no data from matrix"
//                                         );
//                                     dispatch(setIsEmptyView(true));
//                                 }
//                                 dispatch(setIsEmptyView(false));
//                             });
//                         } catch (e) {
//                             if (debugMode)
//                                 console.log(
//                                     "🚧 loadLogs / getting an error from rendering vector type streams"
//                                 );
//                             console.log(e);
//                         }
//                     }

//                     if (type === "matrix") {
//                         try {
//                             const idResult =
//                                 result?.map((m) => ({ ...m, id: nanoid() })) ||
//                                 [];

//                             getAsyncResponse(
//                                 dispatch(setMatrixData(idResult || []))
//                             ).then(() => {
//                                 dispatch(setLoading(false));
//                                 if (idResult.length === 0) {
//                                     if (debugMode)
//                                         console.log(
//                                             "🚧 loadLogs / getting no data from matrix"
//                                         );
//                                     dispatch(setIsEmptyView(true));
//                                 }
//                                 dispatch(setIsEmptyView(false));
//                             });
//                         } catch (e) {
//                             if (debugMode)
//                                 console.log(
//                                     "🚧 loadLogs / getting an error from rendering matrix type streams"
//                                 );
//                             console.log(e);
//                         }
//                     }
//                 } else {
//                     dispatch(setLogs([]));

//                     dispatch(setMatrixData([]));
//                 }
//             })
//             .catch((error) => {
//                 dispatch(setLogs([]));
//                 dispatch(setMatrixData([]));
//                 dispatch(setLoading(false));

//                 if (debugMode)
//                     console.log("getting an error from response: ", error);
//                 dispatch(setIsEmptyView(true));
//             });
//     };
// }
