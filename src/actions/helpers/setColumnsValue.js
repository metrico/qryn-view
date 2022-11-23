/**
 *
 * @param {*} columns : Table columns ;
 * @returns Default Time and Value column headers with time formatter
 */

import * as moment from "moment";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { themes } from "../../theme/themes";
import store from "../../store/store";
import getData from "../getData";
import { cx, css } from "@emotion/css";

const TraceLink = (theme) => css`
    border: none;
    background: none;
    color: ${theme.primaryLight};
    cursor: pointer;
`;

TimeAgo.addDefaultLocale(en);
// format time colum
function timeFormatter(props) {
    return moment(parseInt(props.value + "000")).format(
        "YYYY-MM-DDTHH:mm:ss.SSZ"
    );
}

function traceTimeFormatter(props) {
    return props.value + " ms";
}

function traceStartTimeFormatter(props) {
    const timeAgo = new TimeAgo("en-US");

    return timeAgo.format(props.value / 1_000_000);
}

function traceRequest(data, value) {
    const dispatch = store.dispatch;

    const { panel, id, dataSourceId, url } = data;

    dispatch(
        getData(
            "traces",
            value,
            "range",
            100,
            panel,
            id,
            "forward",
            dataSourceId,
            url
        )
    );
}

function fluxTimeFormatter(props) {
    return moment(props.value).format("YYYY-MM-DDTHH:mm:ss.SSZ");
}

export function setColumnsTsValue(
    columns,
    type = "logs",
    timeAccessor,
    data = {}
) {
    const query = store.getState()?.[data.panel].find((f) => f.id === data.id);

    if (query) {
        data.dataSourceId = query.dataSourceId;
        data.url = query.dataSourceURL;
    }

    const storeTheme = store.getState()?.["theme"];

    const theme = themes[storeTheme];

    if (columns.length > 0 && type === "traces") {
        return columns?.map((m) => {
            if (m.accessor === "durationMs") {
                return {
                    Header: "Duration Ms",
                    accessor: m.accessor,
                    Cell: (props) => traceTimeFormatter(props),
                    width: 90,
                };
            }
            if (m.accessor === "startTimeUnixNano") {
                return {
                    Header: "Start Time",
                    accessor: m.accessor,
                    Cell: (props) => traceStartTimeFormatter(props),
                    width: 90,
                };
            }
            if (m.accessor === "traceID" || m.accessor === "traceId") {
                return {
                    Header: "Trace Id",
                    accessor: m.accessor,
                    Cell: (props) => (
                        <button
                            onClick={(e) => traceRequest(data, props.value)}
                            className={cx(TraceLink(theme))}
                        >
                            {props.value}
                        </button>
                    ),
                    width: 180,
                };
            }
            if (m.accessor === "rootServiceName") {
                return {
                    Header: "Service Name",
                    accessor: m.accessor,
                    Cell: (props) => props.value,
                    width: 90,
                };
            }
            if (m.accessor === "rootTraceName") {
                return {
                    Header: "Trace Name",
                    accessor: m.accessor,
                    Cell: (props) => props.value,
                    width: 90,
                };
            }

            return m;
        });
    }

    if (columns.length > 0 && type === "flux") {
        return columns?.map((m) => {
            if (m.accessor === timeAccessor || m.accessor === "_time") {
                return {
                    Header: "Time",
                    accessor: m.accessor,
                    Cell: (props) => fluxTimeFormatter(props),
                    width: 190,
                };
            }
            return m;
        });
    }

    if (columns.length > 0) {
        return [
            {
                Header: "Time",
                accessor: "time",
                Cell: (props) => timeFormatter(props),
                width: 190,
            },
            ...columns,
            {
                Header: "Value",
                accessor: "value",
            },
        ];
    } else return [];
}
