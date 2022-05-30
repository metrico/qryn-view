import setIsEmptyView from "../setIsEmptyView";
import setLogs from "../setLogs";
import setMatrixData from "../setMatrixData";
import { setQueryTime } from "../setQueryTime";
import { QueryResult } from "../types";
import {
    getAsyncResponse,
    mapStreams,
    sortMessagesByTimestamp,
} from "./parseResponse";

/**
 *
 * @param responseProps : QueryResult
 * process restult type: stream
 */

// add here a table parser for matrix type responses/
// add labels selector for matrix type responses

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
                dispatch(setQueryTime(time));
            }
        } catch (e) {
            console.log(e);
        }
    }
}
