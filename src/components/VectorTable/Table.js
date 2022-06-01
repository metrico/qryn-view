import { useCallback, useEffect, useMemo, useState } from "react";
import {
    useFlexLayout,
    useResizeColumns,
    useSortBy,
    useTable,
} from "react-table";

import { FixedSizeList } from "react-window";
import { scrollbarWidth } from "./helpers";
import { getStyles } from "./styles";
import { useSelector } from "react-redux";
import { addLabel } from "../DataView/ValueTags";
import { ZoomIn, ZoomOut } from "@mui/icons-material/";

export const AddLabels = ({ tkey, value, query }) => {
    return (
        <div className="show-add-labels">
            <span
                aria-label="Filter for value"
                title="Filter for value"
                onClick={(e) => addLabel(e, tkey, value, false, query)}
                className={"icon"}
            >
                <ZoomIn
                    color="primary"
                    style={{
                        width: "18px",
                        height: "18px",
                    }}
                />
            </span>
            <span
                aria-label="Filter out value"
                title="Filter out value"
                onClick={(e) => addLabel(e, tkey, value, true, query)}
                className={"icon"}
            >
                <ZoomOut
                    color="primary"
                    style={{
                        width: "18px",
                        height: "18px",
                    }}
                />
            </span>
        </div>
    );
};

export function Table({ columns, data }) {
    const [tableHeight, setTableHeight] = useState(window.innerHeight - 200);
    const { query, responseType } = useSelector((store) => store);
    useEffect(() => {
        if (tableHeight !== window.innerHeight - 200)
            setTableHeight(window.innerHeight - 200);
    }, [setTableHeight, tableHeight]);

    const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

    const defaultColumn = useMemo(
        () => ({
            width: 75,
        }),
        []
    );

    const options = useMemo(
        () => ({ columns, data, defaultColumn }),
        [columns, data, defaultColumn]
    );

    const {
        getTableProps,
        getTableBodyProps,
        totalColumnsWidth,
        headerGroups,
        rows,
        prepareRow,
        page,
        state,
        gotoPage,
        setPageSize,
        pageOptions,
    } = useTable(options, useFlexLayout, useResizeColumns, useSortBy);

    const RenderRow = useCallback(
        ({ index, style }) => {
            const row = rows[index];
            prepareRow(row);
            return (
                <div
                    {...row.getRowProps({
                        style,
                    })}
                    className="tr"
                >
                    {row.cells.map((cell) => {
                        return (
                            <div
                                {...cell.getCellProps(cellProps)}
                                className="td"
                                title={cell.render("Cell").props.value}
                            >
                                {cell.render("Cell")}{" "}
                                {responseType === "vector" && (
                                    <AddLabels
                                        tkey={
                                            cell.render("Cell").props.column
                                                .Header
                                        }
                                        value={cell.render("Cell").props.value}
                                        query={query}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        },
        [prepareRow, rows]
    );

    return (
        <div {...getTableProps()} className="table">
            <div>
                {headerGroups.map((headerGroup) => (
                    <div {...headerGroup.getHeaderGroupProps()} className="tr">
                        {headerGroup.headers.map((column) => (
                            <div
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                                className="th"
                            >
                                {column.render("Header")}

                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? " 🔽"
                                            : " 🔼"
                                        : ""}
                                </span>

                                <div
                                    {...column.getResizerProps()}
                                    className={`resizer ${
                                        column.isResizing ? "isResizing" : ""
                                    }`}
                                ></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div {...getTableBodyProps()}>
                <FixedSizeList
                    height={tableHeight}
                    itemCount={rows.length}
                    itemSize={26}
                    width={totalColumnsWidth + scrollbarWidth}
                >
                    {RenderRow}
                </FixedSizeList>
            </div>
        </div>
    );
}
