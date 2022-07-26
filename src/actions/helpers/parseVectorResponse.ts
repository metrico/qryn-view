import { setColumnsData } from ".";
import setIsEmptyView from "../setIsEmptyView";
import { setLeftDataView } from "../setLeftDataView";
import { setRightDataView } from "../setRightDataView";
import { setVectorData } from "../setVectorData";
import { QueryResult } from "../types";
import { getAsyncResponse } from "./parseResponse";
import { prepareCols } from "./prepareCols";
import { prepareVectorRows } from "./prepareVectorRows";

/**
 *
 * @param responseProps : QueryResult
 * process restult type: vector
 *
 */
export function parseVectorResponse(responseProps: QueryResult) {
    const { result, debugMode, dispatch, panel, id } = responseProps;
    try {
        const colsData = prepareCols(result);
        if (colsData.length > 0) {
            const columnsData = setColumnsData(colsData);
            const dataRows: any = prepareVectorRows(result);
            const vectorTableData = {
                columnsData,
                dataRows,
                panel,
                id,
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
                        dispatch(setVectorData({}));
                    }
                    dispatch(setIsEmptyView(false));
                });
                const panelResult = {
                    id,
                    type: "vector",
                    data: vectorTableData || {},
                    total: vectorTableData?.dataRows?.length || 0
                };

                
            if (panel === "left") {
                dispatch(setLeftDataView(panelResult));
            } else {
                dispatch(setRightDataView(panelResult));
            }
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
