import { useMemo, useState } from "react";
import { sortByCol } from "./helpers";

/**
 * Custom hook to sort the columns
 * @param rows
 * @returns sortedRows, handleSort
 */
export const useSortedColumns = (rows) => {

    /**
     * Sorts the columns by the column name
     */

    const [sortColumn, setSortColumn] = useState({
        col: "value",
        order: "desc",
    });

    /**
     * Sorts the rows by the column name
     */
    const sortedRows = useMemo(() => {
        const { col, order } = sortColumn;
        return sortByCol(rows, col, order);
    }, [rows, sortColumn]);


    /**
     * Handles the sorting of the columns
     */

    const handleSort = (e: any) => {
        setSortColumn((prev: any) => ({
            col: e,
            order: prev.order === "asc" ? "desc" : "asc",
        }));
    };

    return { sortedRows, handleSort };

}
