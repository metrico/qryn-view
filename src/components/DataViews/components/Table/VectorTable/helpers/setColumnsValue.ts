/**
 * 
 * @param {*} columns : Table columns ;
 * @returns Default Time and Value column headers
 */
export function setColumnsTsValue(columns:any) {
    if (columns.length > 0) {
        return [
            { Header: "Time", accessor: "time" },
            ...columns,
            { Header: "Value", accessor: "value" },
        ];
    } else return [];
}
