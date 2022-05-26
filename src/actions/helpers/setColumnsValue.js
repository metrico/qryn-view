/**
 *
 * @param {*} columns : Table columns ;
 * @returns Default Time and Value column headers with time formatter
 */


import * as moment from "moment";

// format time colum
function timeFormatter(props) {
    return moment(parseInt(props.value+'000')).format("YYYY-MM-DDTHH:mm:ss.SSZ");
}

export function setColumnsTsValue(columns) {
    if (columns.length > 0) {
        return [
            {
                Header: "Time",
                accessor: "time",
                Cell: (props) => timeFormatter(props),
            },
            ...columns,
            {
                Header: "Value",
                accessor: "value",
            },
        ];
    } else return [];
}
