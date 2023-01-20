/**
 *
 * @param {*} columns : Table columns ;
 * @returns Default Time and Value column headers with time formatter
 */

import React from "react";
import * as _moment from "moment";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { themes } from "../../theme/themes";
import store from "../../store/store";
import getData from "../getData";
import { cx, css } from "@emotion/css";
import { setSplitView } from "../../components/StatusBar/components/SplitViewButton/setSplitView";
import { setRightPanel } from "../setRightPanel";
import { ColumnDef } from "@tanstack/react-table";
const moment: any = _moment;

const TraceLink = (theme: any) => css`
    border: none;
    background: none;
    color: ${theme.primaryLight};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

TimeAgo.addDefaultLocale(en);
// format time colum
function timeFormatter(props: any) {
    return moment(parseInt(props.getValue() + "000")).format(
        "YYYY-MM-DDTHH:mm:ss.SSZ"
    );
}

function traceTimeFormatter(props: any) {
    return props.getValue() + " ms";
}

function traceStartTimeFormatter(props: any) {

    const timeAgo = new TimeAgo("en-US");

    return timeAgo.format(props.getValue() / 1_000_000);
}

function traceRequest(data: any, value: any) {
    const dispatch = store.dispatch;
    const actPanel = store.getState()[data.panel];
    const rightPanel = store.getState()["right"];

    const isTabletOrMobile = window.innerWidth <= 914
    const actQuery = actPanel.find((f: any) => f.id === data.id);

    if (data.panel === "left" && !isTabletOrMobile) {

        dispatch(setSplitView(true));
    }

    let previousRight = JSON.parse(JSON.stringify(rightPanel));

    const panelCP = JSON.parse(JSON.stringify(actQuery));

    try {
        const newRight = {
            ...previousRight[0],
            id: previousRight[0].id,
            idRef: "Trace " + value,
            panel: "right",
            queryType: "range",
            dataSourceType: "traces",
            dataSourceId: data.dataSourceId,
            dataSourceURL: data.url,
            expr: value,
            limit: 100,
            step: 100,
            tableView: false,
            chartView: false,
            isShowTs: false,
            browserOpen: false,
            labels: [],
            values: [],
            direction: "forward",
        };

        dispatch(setRightPanel([newRight]));
        dispatch(
            getData(
                "traces",
                value,
                "range",
                panelCP.limit || 100,
                "right",
                newRight.id,
                "forward",
                data.dataSourceId, // datasourceid
                data.url
            )
        );
    } catch (e) {
        console.log(e);
    }
}

function fluxTimeFormatter(props: any) {
    return moment(props.getValue()).format("YYYY-MM-DDTHH:mm:ss.SSZ");
}

export function setColumnsTsValue(
    columns: ColumnDef<any>[],
    type = "logs",
    timeAccessor: any,
    data: any = {}
) {
    const query = store.getState()?.[data.panel]?.find((f: any) => f.id === data.id);

    if (query) {
        data.dataSourceId = query.dataSourceId;
        data.url = query.dataSourceURL;
    }

    const storeTheme = store.getState()?.["theme"];

    const _themes: any = themes;
    const theme = _themes[storeTheme];
    if (columns.length > 0 && type === "traces") {
       
        return columns?.map((m: any) => {
            if (m.accessorKey === "durationMs") {
                return {
                    header: "Duration Ms",
                    accessorKey: m.accessorKey,
                    cell: (props: any) => traceTimeFormatter(props),
            
                };
            }
            if (m.accessorKey === "startTimeUnixNano") {

                return {
                    header: "Start Time",
                    accessorKey: m.accessorKey,
                    cell: (props: any) => traceStartTimeFormatter(props),
            
                };
            }
            if (m.accessorKey === "traceID" || m.accessorKey === "traceId") {
                return {
                    header: "Trace Id",
                    accessorKey: m.accessorKey,
                    cell: (props: any) => (
                        <button
                            onClick={(e) => traceRequest(data, props.getValue())}
                            className={cx(TraceLink(theme))}
                        >
                            {props.getValue()}
                        </button>
                    ),
            
                };
            }
            if (m.accessorKey === "rootServiceName") {
                return {
                    header: "Service Name",
                    accessorKey: m.accessorKey,
                    cell: (props: any) => props.getValue()
            
                };
            }
            if (m.accessorKey === "rootTraceName") {
                return {
                    header: "Trace Name",
                    accessorKey: m.accessorKey,
                    cell: (props: any) => props.getValue(),
            
                };
            }

            return m;
        });
    }

    if (columns.length > 0 && type === "flux") {
        return columns?.map((m: any) => {
            if (m.accessorKey === timeAccessor || m.accessorKey === "_time") {
                return {
                    header: "Time",
                    accessorKey: m.accessorKey,
                    cell: (props: any) => fluxTimeFormatter(props),
            
                };
            }
            return m;
        });
    }

    if (columns.length > 0) {
        return [
            {
                header: "Time",
                accessorKey: "time",
                cell: (props: any) => timeFormatter(props),
        
            },
            ...columns,
            {
                header: "Value",
                accessorKey: "value",
            },
        ];
    } else return [];
}
