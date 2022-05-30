import setIsEmptyView from "../setIsEmptyView";
import setMatrixData from "../setMatrixData";
import { QueryResult } from "../types";
import { addNanoId } from "./addNanoId";
import { getAsyncResponse } from "./parseResponse";

/**
 *
 * @param responseProps : QueryResult
 * process restult type: matrix
 *
 */

// add here a table parser for matrix type responses/
// add labels selector for matrix type responses

export function parseMatrixResponse(responseProps: QueryResult) {
    const { result, debugMode, dispatch } = responseProps;

    try {
        const idResult = addNanoId(result);
        getAsyncResponse(dispatch(setMatrixData(idResult || []))).then(() => {
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
