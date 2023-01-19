import {
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getGroupedRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    GroupingState,
    useReactTable,
    ColumnResizeMode,
} from "@tanstack/react-table";

import { useState, useEffect, useReducer } from "react";
import {
    defaultColumn,
    fuzzyFilter,
    getTableMeta,
} from "./models/tableModels";

import DebouncedInput from "./components/DebouncedInput";
import ActionButtons from "./components/ActionButtons";
import styled from "@emotion/styled";
import CustomTable from "./components/CustomTable";
import { useSkipper } from "./hooks/useSkipper";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "../../components/DataViews/components/QueryBuilder/hooks";

const Styles = styled.div<{ theme: any }>`
    padding: 5px;

    table {
        border-spacing: 0;
        border: 1px solid ${({ theme }) => theme.buttonBorder};
        border-radius: 4px;
        border-bottom: none;
        border-top: none;
        color: ${({ theme }) => theme.textColor};

        tr {
            :last-child {
                td {
                    border-bottom: none;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.45rem;
            border-bottom: 1px solid ${({ theme }) => theme.buttonBorder};
            border-right: 1px solid ${({ theme }) => theme.buttonBorder};
            :last-child {
                border-right: 0;
            }
        }

        td {
            input {
                font-size: 12px;
                padding: 0;
                margin: 0;
                border: 0;
            }
        }
    }

    .pagination {
        padding: 0.5rem;
    }
`;

export default function Table(props: any) {
    const rerender = useReducer(() => ({}), {})[1];
    const { columns, data: mdata } = props;
    const theme = useTheme();
    const [data, setData] = useState(mdata);
    const refreshData = () => setData(mdata);

    const [columnVisibility, setColumnVisibility] = useState({});
    const [grouping, setGrouping] = useState<GroupingState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
    const [columnResizeMode, setColumnResizeMode] =
        useState<ColumnResizeMode>("onChange");

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        autoResetPageIndex,
        enableColumnResizing: true,
        columnResizeMode, 
        onColumnVisibilityChange: setColumnVisibility,
        onGroupingChange: setGrouping,
        onRowSelectionChange: setRowSelection,
        meta: getTableMeta(setData, skipAutoResetPageIndex),
        state: {
            grouping,
            columnFilters,
            globalFilter,
            columnVisibility,
        },
    });

    useEffect(() => {
        if (table.getState().columnFilters[0]?.id === "fullName") {
            if (table.getState().sorting[0]?.id !== "fullName") {
                table.setSorting([{ id: "fullName", desc: false }]);
            }
        }
    }, [table.getState().columnFilters[0]?.id]);

    return (
        <ThemeProvider theme={theme}>
            <Styles theme={theme}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "4px",
                        marginLeft: 0,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: "14px",
                            gap: "6px",
                            margin: "4px",
                            marginLeft: 0,
                        }}
                    >
                        {table.getAllLeafColumns().map((column) => {
                            return (
                                <div key={column.id}>
                                    <label
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: theme.textColor,
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={column.getIsVisible()}
                                            onChange={column.getToggleVisibilityHandler()}
                                            className="mr-1"
                                        />
                                        {column.id}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "14px",
                            margin: "4px",
                            color: theme.textColor,
                        }}
                    >
                        Search:
                        <DebouncedInput
                            theme={theme}
                            style={{ fontSize: "12px", padding: "3px 8px" }}
                            value={globalFilter ?? ""}
                            onChange={(value) => setGlobalFilter(String(value))}
                            placeholder="Search all columns..."
                        />
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <CustomTable
                        columnResizeMode={columnResizeMode}
                        table={table}
                        tableGroup="center"
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <ActionButtons
                        getSelectedRowModel={table.getSelectedRowModel}
                        hasNextPage={table.getCanNextPage()}
                        hasPreviousPage={table.getCanPreviousPage()}
                        nextPage={table.nextPage}
                        pageCount={table.getPageCount()}
                        pageIndex={table.getState().pagination.pageIndex}
                        pageSize={table.getState().pagination.pageSize}
                        previousPage={table.previousPage}
                        refreshData={refreshData}
                        rerender={rerender}
                        rowSelection={rowSelection}
                        setPageIndex={table.setPageIndex}
                        setPageSize={table.setPageSize}
                        totalRows={table.getPrePaginationRowModel().rows.length}
                    />
                </div>
            </Styles>
        </ThemeProvider>
    );
}
