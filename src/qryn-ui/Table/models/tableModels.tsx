import {
    ColumnDef,
    FilterFn,
    SortingFn,
    sortingFns,
} from "@tanstack/react-table";
import React from "react";

import {
    rankItem,
    compareItems,
    RankingInfo,
} from "@tanstack/match-sorter-utils";


export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank);

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0;

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]! as RankingInfo,
            rowB.columnFiltersMeta[columnId]! as RankingInfo
        );
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export type TableMeta = {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
};

// Give our default column cell renderer editing superpowers!

export const defaultColumn: Partial<ColumnDef<any>> = {
    cell: (info: any) => info.getValue(),
};


export const getTableMeta = (
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    skipAutoResetPageIndex: () => void
) =>
    ({
        updateData: (rowIndex, columnId, value) => {
            // Skip age index reset until after next rerender
            skipAutoResetPageIndex();
            setData((old) =>
                old.map((row, index) => {
                    if (index !== rowIndex) return row;

                    return {
                        ...old[rowIndex]!,
                        [columnId]: value,
                    };
                })
            );
        },
    } as TableMeta);
