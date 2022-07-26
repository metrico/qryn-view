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
    return moment(props.value).format("YYYY-MM-DDTHH:mm:ss.SSZ");
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
    const headers = [
        {
            Header: "Time",
            accesor: "time",
            Cell: (props: any) => timeFormatter(props),
            width: 20,
            minWidth: 20,
            maxWidth: 20,
        },
        { Header: "Metric", accessor: "metric" },
        {
            Header: "Value",
            accessor: "value",
            width: 30,
            minWidth: 30,
            maxWidth: 30,
        },
    ];

    const rows = getMatrixTableRows(data);

    let dataRows = [];

    for (let row of rows) {
        dataRows.push(row.rows);
    }

    const length = rows.length;

    return {
        columnsData: headers,
        dataRows: sortBy(dataRows.flat(), (row) => row.time),
        length,
    };
}

export function parseMatrixResponse(responseProps: QueryResult) {
    const { result, debugMode, dispatch, panel, id } = responseProps;

    // here should set the table response
    const tableResult = getMatrixTableResult(result);

    dispatch(setTableData(tableResult));
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

        const panelData = {
            id,
            type: "matrix",
            tableData: tableResult,
            data: idResult,
            total: idResult?.length || 0
        };
        
        if (panel === "left") {
            dispatch(setLeftDataView(panelData));
        } else {
            dispatch(setRightDataView(panelData));
        }
    } catch (e) {
        if (debugMode)
            console.log(
                "🚧 loadLogs / getting an error from rendering matrix type streams"
            );
        console.log(e);
    }
}
