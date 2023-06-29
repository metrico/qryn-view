import { QueryResult } from "../types";
import { addNanoId } from "./addNanoId";
import moment from "moment";
import { sortBy } from "lodash";
import { setLeftDataView } from "../setLeftDataView";
import { setRightDataView } from "../setRightDataView";
import { ColumnDef } from "@tanstack/react-table";
import store  from "@ui/store/store";
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
   return moment(props.getValue()*1000).format(
       "YYYY-MM-DDTHH:mm:ss.SSZ"
   );
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
    const headers: ColumnDef<any>[] = [
        {
            header: "Time",
            accessorKey: "time",
            cell: (data: any) => timeFormatter(data),
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
    const {
        result,
        debugMode,
        dispatch,
        panel,
        id,
        raw,
        dsType,
        isLogsVolume,
    } = responseProps;
    // here should set the table response
    const tableResult = getMatrixTableResult(result);
    // get current dataview and update action
    const dataView = setDataView(panel);
    try {
        const idResult = addNanoId(result);
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
            // if not previous stream type and no logsVolume active
            if (isLogsVolume) {
                newPanel = [...prevDV];
                let mapped = newPanel.map((m) => {
                    if (m.id === id) {
                        return {
                            ...m,
                            logsVolumeData: idResult,
                            total: idResult.length,
                        };
                    } else {
                        return m;
                    }
                });
                dispatch(action([]));
                dispatch(action(mapped));
            } else {
                dispatch(action([]));
                const filtered = prevDV.filter(
                    (dv: any) => dv.id !== panelResult.id
                );
                newPanel = [...filtered, { ...panelResult }];
                dispatch(action(newPanel));
            }
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
