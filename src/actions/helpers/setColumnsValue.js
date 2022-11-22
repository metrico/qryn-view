/**
 *
 * @param {*} columns : Table columns ;
 * @returns Default Time and Value column headers with time formatter
 */

import * as moment from "moment";

// format time colum
function timeFormatter(props) {
    return moment(parseInt(props.value + "000")).format(
        "YYYY-MM-DDTHH:mm:ss.SSZ"
    );
}

function fluxTimeFormatter(props) {
    return moment(props.value).format("YYYY-MM-DDTHH:mm:ss.SSZ");
}

export function setColumnsTsValue(columns, type = "logs", timeAccessor ) {

    if (columns.length > 0 && type === "flux") {

        return columns?.map((m) => {
            if (m.accessor === timeAccessor || m.accessor === "_time") {
                return {
                    Header: "Time",
                    accessor: m.accessor ,
                    Cell: (props) => fluxTimeFormatter(props),
                    width: 190,
                };
            }
            return m
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
