import { setColumnsTsValue } from "./setColumnsValue";
/**
 * 
 * @param {*} columns : the table columns ;
 * @returns the columns formatted for react-table
 */
export function setColumnsData(columns:any) {
    const columnsData = columns?.map((row:any) => ({ Header: row, accessor: row }));
    const columnsDated = setColumnsTsValue(columnsData);
    return columnsDated;
}
