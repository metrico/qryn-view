import { setColumnsData } from ".";
import store from "../../store/store";
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

function setDataView(panel: string) {
    if (panel === "left") {
        return {
            state: "leftDataView",
            action: setLeftDataView,
        };
    } else {
        return {
            state: "rightDataView",
            action: setRightDataView,
        };
    }
}

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
                    total: vectorTableData?.dataRows?.length || 0,
                };
                const dataView = setDataView(panel)
                const { action, state } = dataView;
                const prevDV = store.getState()?.[state];
                if (prevDV.some((dv: any) => dv.id === panelResult.id)) {
                    let newPanel = [];
                    dispatch(action([]));
                    const filtered = prevDV.filter(
                        (dv: any) => dv.id !== panelResult.id
                    );
                    newPanel = [...filtered, { ...panelResult }];
                    dispatch(action(newPanel));
                } else {
                    let newPanel = [...prevDV, panelResult];
                    dispatch(action(newPanel));
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
