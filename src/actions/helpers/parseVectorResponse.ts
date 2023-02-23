import moment from "moment";
import { setColumnsData } from ".";
import store from "../../store/store";
import setIsEmptyView from "../setIsEmptyView";
import { setLeftDataView } from "../setLeftDataView";
import { setRightDataView } from "../setRightDataView";
import { setVectorData } from "../setVectorData";
import { QueryResult, TracesResult } from "../types";
import { getAsyncResponse } from "./parseResponse";
import { prepareCols, prepareFluxCols } from "./prepareCols";
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

export function parseVectorResponse(responseProps: QueryResult | TracesResult) {
    const { result, debugMode, dispatch, panel, id, type, dsType, raw } = responseProps;
    let data = {
        panel,
        id,
        type,
    };
    if (type === "traces") {
        try {
            const colsData = prepareFluxCols(result);

            const timeAccessor = (result: any) => {
                const firstRow = result[0];

                const rowEntries = Object.entries(firstRow);

                if (rowEntries) {
                    const timeRow = rowEntries.find(([_, val]) => {
                        return moment.isDate(val);
                    });

                    return timeRow?.[0] || null;
                }
            };

            if (colsData.length > 0) {
                const tA = timeAccessor(result);
                const tracesData = {
                    panel,
                    id,
                    type
                }

                const columnsData = setColumnsData(
                    colsData,
                    type,
                    tA,
                    tracesData
                );

                const dataRows: any = prepareVectorRows(result, type);

                const vectorTableData = {
                    columnsData,
                    dataRows,
                    panel,
                    id,
                };

                if (columnsData?.length > 0 && dataRows?.length > 0) {
                    dispatch(setVectorData(vectorTableData || {}));

                    const panelResult = {
                        id,
                        type: "vector",
                        raw,
                        dsType,
                        data: { tableData: vectorTableData},
                        tableData: vectorTableData,
                        total: vectorTableData?.dataRows?.length || 0
                    };
                    const dataView = setDataView(panel);
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
            console.log(e);
        }
    } else if (type === "flux") {
        try {
            const colsData = prepareFluxCols(result);

            const timeAccessor = (result: any) => {
                const firstRow = result[0];

                const rowEntries = Object.entries(firstRow);

                if (rowEntries) {
                    const timeRow = rowEntries.find(([_, val]) => {
                        return moment.isDate(val);
                    });

                    return timeRow?.[0] || null;
                }
            };

            if (colsData.length > 0) {
                const tA = timeAccessor(result);

                const columnsData = setColumnsData(colsData, type, tA, data);
                const dataRows: any = prepareVectorRows(result, type);

                const vectorTableData = {
                    columnsData,
                    dataRows,
                    panel,
                    id,
                };

                if (columnsData?.length > 0 && dataRows?.length > 0) {
                    dispatch(setVectorData(vectorTableData || {}));

                    const panelResult = {
                        id,
                        type: "vector",
                        data: { tableData: vectorTableData},
                        raw,
                        dsType,
                        tableData: vectorTableData,
                        total: vectorTableData?.dataRows?.length || 0
                    };
                    const dataView = setDataView(panel);
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
            console.log(e);
        }
    } else {
        try {
            const colsData = prepareCols(result);

            if (colsData.length > 0) {
                const columnsData = setColumnsData(colsData, type, null, data);
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
                        if (result?.length === 0) {
                            if (debugMode)
                                console.log(
                                    "🚧 getData / getting no data from matrix"
                                );
                            dispatch(setIsEmptyView(true));
                            dispatch(setVectorData({}));
                        }
                        dispatch(setIsEmptyView(false));
                    });
                    const panelResult = {
                        id,
                        type: "vector",
                        data: { tableData: vectorTableData} || {},
                        raw,
                        dsType,
                        tableData: vectorTableData||{},
                        total: vectorTableData?.dataRows?.length || 0,
                    };
                    const dataView = setDataView(panel);
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
                    "🚧 getData / getting an error from rendering vector type streams"
                );
            console.log(e);
        }
    }
}
