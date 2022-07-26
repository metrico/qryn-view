import { sortBy } from "lodash";
import setIsEmptyView from "../setIsEmptyView";
import setLogs from "../setLogs";
import setMatrixData from "../setMatrixData";
import { setQueryTime } from "../setQueryTime";
import { setTableData } from "../setTableData";
import { QueryResult } from "../types";
import {
    getAsyncResponse,
    mapStreams,
    sortMessagesByTimestamp,
} from "./parseResponse";

import moment from "moment";
import { setLeftDataView } from "../setLeftDataView";
import { setRightDataView } from "../setRightDataView";

function timeFormatter(props: any) {
    return moment(parseInt(props.value) / 1000000).format(
        "YYYY-MM-DDTHH:mm:ss.SSZ"
    );
}

export function getStreamTableRows(data: any[]) {
    return data.map(({ stream, values }: { stream: object; values: [] }) => ({
        stream: `${JSON.stringify(stream)}`,
        rows: values?.map(([time, log]: [string, string]) => ({
            time,
            stream: JSON.stringify(stream),
            log,
        })),
        get rowsLength(): number {
            return this.rows?.length;
        },
    }));
}

export function getStreamTableResult(data: any[]) {
    const headers = [
        {
            Header: "Time",
            accessor: "time",
            Cell: (props: any) => timeFormatter(props),
            width: 20,
            minWidth: 20,
            maxWidth: 20,
        },
        {
            Header: "Stream",
            accessor: "stream",
            width: 30,
            minWidth: 30,
            maxWidth: 30,
        },
        { Header: "Log", accessor: "log" },
    ];

    const rows = getStreamTableRows(data);

    const length = rows.length;
    let dataRows = [];

    for (let row of rows) {
        dataRows.push(row.rows);
    }

    return {
        columnsData: headers,
        dataRows: sortBy(dataRows.flat(), (row) => row.time),

        length,
    };
}

export function parseStreamResponse(responseProps: QueryResult) {
    const { result, time, debugMode, queryType, panel, id, dispatch } =
        responseProps;

    let messages = mapStreams(result);
    dispatch(setMatrixData([]));
    const tableResult = getStreamTableResult(result);
    dispatch(setTableData(tableResult));
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
            });

            const panelResult = {
                id,
                type: "stream",
                tableData: tableResult,
                data: messSorted || [],
                total: messSorted?.length || 0,
            };

            if (panel === "left") {
                dispatch(setLeftDataView(panelResult));
            } else {
                dispatch(setRightDataView(panelResult));
            }

            if (queryType === "instant") {
                dispatch(setQueryTime(time));
            }
        } catch (e) {
            console.log(e);
        }
    }
}
