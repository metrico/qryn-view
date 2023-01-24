import { setColumnsTsValue } from "./setColumnsValue";
import { ColumnDef } from "@tanstack/react-table";
/**
 *
 * @param {*} columns : the table columns ;
 * @returns the columns formatted for react-table
 */

export function setColumnsData(
    columns: any,
    type = "logs",
    timeAccessor: any,
    data: any = {}
) {
    console.log(columns)
    const columnsData: ColumnDef<any>[] = columns?.map((row: any) => ({
        header: row,
        accessorKey: row,
        id: row,
        cell: (info: any) => info.getValue(),
    }));
    const columnsDated = setColumnsTsValue(
        columnsData,
        type,
        timeAccessor,
        data
    );
    return columnsDated;
}
