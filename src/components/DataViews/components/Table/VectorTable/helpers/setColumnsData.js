import { setColumnsTsValue } from "./setColumnsValue";
/**
 * 
 * @param {*} columns : the table columns ;
 * @returns the columns formatted for react-table
 */
export function setColumnsData(columns) {
    const columnsData = columns?.map((row) => ({ Header: row, accessor: row }));
    const columnsDated = setColumnsTsValue(columnsData);
    return columnsDated;
}
