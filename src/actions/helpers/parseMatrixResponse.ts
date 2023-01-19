import setIsEmptyView from "../setIsEmptyView";
import setMatrixData from "../setMatrixData";
import { QueryResult } from "../types";
import { addNanoId } from "./addNanoId";
import { getAsyncResponse } from "./parseResponse";
import { setTableData } from "../setTableData";
import moment from "moment";
import { sortBy } from "lodash";
import { setLeftDataView } from "../setLeftDataView";
import { setRightDataView } from "../setRightDataView";
import { ColumnDef } from "@tanstack/react-table";
import store from "../../store/store";
/**
 *
 * @param responseProps : QueryResult
 * process restult type: matrix
 *
 */

// add here a table parser for matrix type responses/
// add labels selector for matrix type responses

// headers for matrix :
// time  / value

function timeFormatter(props: any) {
    return moment(props.getValue()).format("YYYY-MM-DDTHH:mm:ss.SSZ");
}

export function getMatrixTableRows(data: any[]) {
    return data.map(({ metric, values }: { metric: object; values: [] }) => ({
        metric: JSON.stringify(metric),
        rows: values.map(([time, value]: [string, string]) => ({
            time,
            metric: JSON.stringify(metric),
            value,
        })),
        get rowsLength() {
            return this.rows?.length;
        },
        get title() {
            return `'${this.metric}' (${this.rowsLength})`;
        },
    }));
}

export function getMatrixTableResult(data: any[]) {
    const headers :ColumnDef<any>[] = [
        {
            header: "Time",
            accessorKey: "time",
            cell: (props: any) => timeFormatter(props),
     
        },
        { header: "Metric", accessorKey: "metric" },
        {
            header: "Value",
            accessorKey: "value",
        
        },
    ];

    const rows = getMatrixTableRows(data);

    let dataRows = [];

    for (let row of rows) {
        dataRows.push(row.rows);
    }

    const dr = sortBy(dataRows.flat(), (row) => row.time);
    return {
        columnsData: headers,
        dataRows: dr,
        total: dr.length,
    };
}

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

export function parseMatrixResponse(responseProps: QueryResult) {
    const { result, debugMode, dispatch, panel, id, raw, dsType } = responseProps;
    // here should set the table response
    const tableResult = getMatrixTableResult(result);
    // get current dataview and update action
    const dataView = setDataView(panel);

    dispatch(setTableData(tableResult));
    try {
        const idResult = addNanoId(result);

        getAsyncResponse(dispatch(setMatrixData(idResult || []))).then(() => {
            if (idResult.length === 0) {
                if (debugMode)
                    console.log("🚧 getData / getting no data from matrix");
                dispatch(setIsEmptyView(true));
            }
            dispatch(setIsEmptyView(false));
        });
        // get table total as chart total is less that table total rows
        const panelResult = {
            id,
            type: "matrix",
            tableData: tableResult,
            data: idResult,
            dsType,
            raw,
            total: idResult?.length || 0,
        };

        // add this data to previous
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
    } catch (e) {
        if (debugMode)
            console.log(
                "🚧 getData / getting an error from rendering matrix type streams"
            );
        console.log(e);
    }
}
