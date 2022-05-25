import { Stream, Message, QueryResult, QueryResultType, } from '../types'
import store from '../../store/store'

import {nanoid} from 'nanoid'
import setMatrixData from '../setMatrixData'
import setLogs from '../setLogs'
import setIsEmptyView from '../setIsEmptyView'
import { setQueryTime } from '../setQueryTime'
import { setVectorData } from '../setVectorData'
import { prepareCols } from './prepareCols'
import { setColumnsData } from './setColumnsData'
import { prepareVectorRows } from './prepareVectorRows'


const {debugMode} =  store.getState()

export async function getAsyncResponse(
    cb: Function //: callback dispatch function
) {
    return await cb;
}

export function sortMessagesByTimestamp(
    messages: Message[] //:array sort by timestamp
) {
    const startTime = performance.now();
    const mess = messages?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    const duration = performance.now() - startTime;
    if (debugMode)
        console.log("🚧 loadLogs / sorting logs took: ", duration, " ms");
    return mess;
}

export function fromNanoSec(
    ts: number // :timestamp
) {
    return ts / 1000000;
}

export function mapStreams(streams: any[]) {
    const startTime = performance.now();
    let messages: Message[] = [];

    streams.forEach((stream: Stream) => {
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

export function getTimeParsed(time: Date) {
    return time.getTime() + "000000";
}

export const responseActions = {
    streams: (props: QueryResult) => parseStreamResponse(props),
    vector: (props: QueryResult) => parseVectorResponse(props),
    matrix: (props: QueryResult) => parseMatrixResponse(props),
};

export async function parseResponse(responseProps: QueryResult) {
    const { type }: { type: QueryResultType } = responseProps;
    responseActions[type](responseProps);
}

export function parseStreamResponse(responseProps: QueryResult) {
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
                //   dispatch(setLoading(false));
            });
            if (queryType === "instant") {
                store.dispatch(setQueryTime(time));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export function parseMatrixResponse(responseProps: QueryResult) {
    const { result, debugMode, dispatch } = responseProps;

    try {
        const idResult = result?.map((m) => ({ ...m, id: nanoid() })) || [];
        // const matrixResponse = { type: "matrix", data: idResult };
        getAsyncResponse(dispatch(setMatrixData(idResult || []))).then(() => {
            //   dispatch(setLoading(false));
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

export function parseVectorResponse(responseProps: QueryResult) {

    const { result, debugMode, dispatch } = responseProps;
    try {
        // here should dispatch the parsed table view and the state should be a 'tableState' with dataframe identifyed as the 'source'

        const colsData = prepareCols(result);
        if (colsData.length > 0) {
            const columnsData = setColumnsData(colsData);
            const dataRows: any = prepareVectorRows(result);
            const vectorTableData = {
                columnsData,
                dataRows,
            };
            if (columnsData.length > 0 && dataRows.length > 0) {
                getAsyncResponse(
                    dispatch(setVectorData(vectorTableData || {}))
                ).then(() => {
                    if (result.length === 0) {
                        if (debugMode)
                            console.log(
                                "🚧 loadLogs / getting no data from matrix"
                            );
                        dispatch(setIsEmptyView(true));
                    }
                    dispatch(setIsEmptyView(false));
                });
            }
        }
    } catch (e) {
        if (debugMode)
            console.log(
                "🚧 loadLogs / getting an error from rendering vector type streams"
            );
        console.log(e);
    }
}