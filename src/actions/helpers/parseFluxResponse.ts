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
import store from "../../store/store";
/**
 *
 * @param responseProps : QueryResult
 * process restult type: Flux
 *
 */

// add here a table parser for Flux type responses/
// add labels selector for Flux type responses

// headers for Flux :
// time  / value

function timeFormatter(props: any) {
    return moment(props.value).format("YYYY-MM-DDTHH:mm:ss.SSZ");
}
function fluxDataToMetricData(data: any[]) {
    console.log(data);
    const out: any[] = [{
        metric: {__name__: 'Flux'},
        values: data.map(
            (item: any) =>
                Object.values(item)
                    .map((i: any, k: number) => (
                        isNaN(+i) ?
                            null :
                            (i instanceof Date ? (i.getTime() / 1000) : i)
                            + (k === 0 ? 0 : "")
                    ) 
                    )
                    .filter(item => !!item)
        ),
    }]
    return out;
}
export function getFluxTableRows(data: any[]) {

    console.log('getFluxTableRows', { data });
    
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

export function getFluxTableResult(data: any[]) {
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

    const rows = getFluxTableRows(data);

    let dataRows = [];

    for (let row of rows) {
        dataRows.push(row.rows);
    }

    const dr = sortBy(dataRows.flat(), (row) => row.time)
    return {
        columnsData: headers,
        dataRows: dr,
        total: dr.length
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

export function parseFluxResponse(responseProps: QueryResult) {
    let { result, debugMode, dispatch, panel, id } = responseProps;
    result = fluxDataToMetricData(result);
    console.log({ responseProps });
    // here should set the table response
    const tableResult = getFluxTableResult(result);
    // get current dataview and update action
    const dataView = setDataView(panel);

    dispatch(setTableData(tableResult));
    try {
        const idResult = addNanoId(result);

        getAsyncResponse(dispatch(setMatrixData(idResult || []))).then(() => {
            if (idResult.length === 0) {
                if (debugMode)
                    console.log("🚧 getData / getting no data from Flux");
                dispatch(setIsEmptyView(true));
            }
            dispatch(setIsEmptyView(false));
        });
        // get table total as chart total is less that table total rows
        const panelResult = {
            id,
            type: "vector",
            tableData: tableResult,
            data: idResult,
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
                "🚧 getData / getting an error from rendering Flux type streams"
            );
        console.log(e);
    }
}
