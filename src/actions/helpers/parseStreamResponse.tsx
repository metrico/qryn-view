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
import store from "../../store/store";
import {
    ColumnDef,
} from "@tanstack/react-table";
import { fuzzyFilter, fuzzySort } from "../../qryn-ui/Table/models/tableModels";

function timeFormatter(props: any) {
    return moment(parseInt(props.getValue()) / 1000000).format(
        "YYYY-MM-DDTHH:mm:ss.SSZ"
    );
}



export function getStreamTableRows(data: any[]) {
    return data?.map(({ stream, values }: { stream: object; values: [] }) => ({
        stream: `${JSON.stringify(stream)}`,
        rows: values?.map(([time, log]: [string, string]) => ({
            time,
            stream: JSON.stringify(stream),
            log,
        })),
        get rowsLength(): number {
            return this?.rows?.length || 0;
        },
    }));
}

export function formattedWhiteSpaceCell(info: any) {
    return (
        <span title={info.getValue()}>
            {info.getValue()}
        </span>
    );
}

export function getStreamTableResult(data: any[]) {
    const headers: ColumnDef<any>[] = [
        {
            id: "time",
            header: "Time",
            accessorKey: "time",
            cell: (info: any) => timeFormatter(info),
        },
        {
            id: "stream",
            header: "Stream",
            accessorKey: "stream",
            cell: (info: any) => formattedWhiteSpaceCell(info),
        },
        {
            id: "log",
            accessorKey: "log",
            header: "Log",
            cell: (info: any) => formattedWhiteSpaceCell(info),
            
        },
    ];

    const rows = getStreamTableRows(data);

    const length = rows?.length || 0;
    let dataRows = [];

    if (length > 0) {
        for (let row of rows) {
            dataRows.push(row.rows);
        }
    }

    return {
        columnsData: headers,
        dataRows: sortBy(dataRows.flat(), (row) => row.time),

        length,
    };
}

// set current state and action to target dataview

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

export function parseStreamResponse(responseProps: QueryResult) {
    const {
        result,
        raw,
        time,
        debugMode,
        queryType,
        panel,
        id,
        dispatch,
        dsType,
        direction,
    } = responseProps;
    // get sorted messages
    const messages = mapStreams(result, direction);
    // get current dataView and update action
    const dataView = setDataView(panel);

    dispatch(setMatrixData([]));

    const tableResult = getStreamTableResult(result);
    dispatch(setTableData(tableResult));

    const messSorted = sortMessagesByTimestamp(messages, direction);
    function unite(args: any) {
        return [].concat.apply([], args).filter(function (elem, index, self) {
            return self.indexOf(elem) === index;
        });
    }

    let panelResult = {
        id,
        type: "stream",
        tableData: {},
        data: [{}],
        raw: "[]",
        labels: [],
        total: 0,
        dsType
    };

    if (messSorted) {
        try {
            getAsyncResponse(dispatch(setLogs(messSorted || []))).then(() => {
                if (messSorted.length === 0) {
                    if (debugMode)
                        console.log("🚧 getData / getting no messages sorted");
                    dispatch(setIsEmptyView(true));
                }

                dispatch(setIsEmptyView(false));
            });
            const labelsList = Array.from(
                new Set(messSorted?.map((m) => Object.keys(m.tags)))
            );
            const labels = unite(labelsList);
            panelResult = {
                id,
                type: "stream",
                dsType,
                tableData: tableResult,
                data: messSorted,
                raw,
                labels: [...labels],
                total: messSorted?.length || 0,
            };

            // new action
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

            //

            if (queryType === "instant") {
                dispatch(setQueryTime(time));
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        const { action, state } = dataView;
        const prevDV = store.getState()?.[state];
        if (prevDV.some((dv: any) => dv.id === panelResult.id)) {
            let newPanel = [];
            dispatch(action([]));
            const filtered =
                prevDV?.filter((dv: any) => dv.id !== panelResult.id) || [];
            newPanel = [...filtered, { ...panelResult }];
            dispatch(action(newPanel));
        } else {
            let newPanel = [...prevDV, panelResult];
            dispatch(action(newPanel));
        }
    }
}
