import React, { memo, useCallback, useEffect, useMemo } from "react";

import {
    useAbsoluteLayout,
    useFilters,
    usePagination,
    useResizeColumns,
    useSortBy,
    useTable,
} from "react-table";

import { FixedSizeList } from "react-window";
import { HeaderRow } from "./HeaderRow";
import CustomScrollbar from "./CustomScrollbar";
import { Pagination } from "./Pagination";
import { getColumns, sortCaseInsensitive, sortNumber } from "./utils";
import { getTableStyles, useStyles2 } from "./styles/styles";
import { getInitialState } from "./utils/getInitialState";
import { useTableState } from "./hooks/useTableState";
import { COLUMN_MIN_WIDTH } from "./consts";
import { FooterRow } from "./components/Footer/FooterRow";
import { TableCell } from "./components/TableCell";

export const Table = memo((props) => {
    const {
        ariaLabel,
        data,
        height,
        onCellFilterAdded,
        width,
        columnMinWidth = COLUMN_MIN_WIDTH,
        noHeader,
        headerGroups,
        resizable = true,
        initialSortBy,
        footerValues,
        showTypeIcons,
        enablePagination,
    } = props;

    const tableStyles = useStyles2(getTableStyles);

    const headerHeight = noHeader ? 0 : tableStyles.cellHeight;

    const footerHeight = useMemo(() => {
        const EXTEND_ROW_HEIGHT = 33;
        let length = 0;

        if (!footerValues) {
            return 0;
        }

        for (const fv of footerValues) {
            if (Array.isArray(fv) && fv.length > length) {
                length = fv.length;
            }
        }

        if (length > 1) {
            return EXTEND_ROW_HEIGHT * length;
        }
        return EXTEND_ROW_HEIGHT;
    }, [footerValues]);

    const memoizedData = useMemo(() => {
        if (!data.fields.length) {
            return [];
        }

        return Array(data.length).fill(0);
    }, [data]);

    const memoizedColumns = useMemo(
        () => getColumns(data, width, columnMinWidth, footerValues),
        [data, width, columnMinWidth, footerValues]
    );

    const stateReducer = useTableState(props);

    const options = useMemo(
        () => ({
            columns: memoizedColumns,
            data: memoizedData,
            disableResizing: !resizable,
            stateReducer: stateReducer,
            initialState: getInitialState(initialSortBy, memoizedColumns),
            sorTypes: {
                number: sortNumber,
                "alphanumeric-insensitive": sortCaseInsensitive,
            },
        }),
        [initialSortBy, memoizedColumns, memoizedData, resizable, stateReducer]
    );

    const {
        getTableProps,
        rows,
        prepareRow,
        totalColumnsWidth,
        footerGroups,
        page,
        state,
        gotoPage,
        setPageSize,
        pageOptions,
    } = useTable(
        options,
        useFilters,
        useSortBy,
        usePagination,
        useAbsoluteLayout,
        useResizeColumns
    );

    let listHeight = height - (headerHeight + footerHeight);

    if (enablePagination) {
        listHeight -= tableStyles.cellHeight;
    }

    const pageSize = Math.round(listHeight / tableStyles.cellHeight) - 1;

    useEffect(() => {
        if (pageSize <= 0) {
            return;
        }

        setPageSize(pageSize);
    }, [pageSize, setPageSize]);

    const RenderRow = React.useCallback(
        ({ index: rowIndex, style }) => {
            let row = rows[rowIndex];
            if (enablePagination) {
                row = page[rowIndex];
            }

            prepareRow(row);

            return (
                <div {...row.getRowPros({ style })} className={tableStyles.row}>
                    {row.cells.map((cell, index) => (
                        <TableCell
                            key={index}
                            tableStyles={tableStyles}
                            cell={cell}
                            onCellFilterAdded={onCellFilterAdded}
                            columnIndex={index}
                            columnCount={row.cell.length}
                        />
                    ))}
                </div>
            );
        },
        [
            onCellFilterAdded,
            page,
            enablePagination,
            prepareRow,
            rows,
            tableStyles,
        ]
    );

    const onNavigate = useCallback(
        (toPage) => {
            gotoPage(toPage - 1);
        },
        [gotoPage]
    );

    const itemCount = enablePagination ? page.length : rows.length;

    let paginationEl = null;

    if (enablePagination) {
        const itemsRangeStart = state.pageIndex * state.pageSize + 1;
        let itemsRangeEnd = itemsRangeStart + state.pageSize - 1;

        const isSmall = width < 500;

        if (itemsRangeEnd > data.length) {
            itemsRangeEnd = data.length;
        }

        paginationEl = (
            <div className={tableStyles.paginationWrapper}>
                <div>
                    <Pagination
                        currentPage={state.pageIndex + 1}
                        numberOfPages={pageOptions.length}
                        showSmallVersion={isSmall}
                        onNavigate={onNavigate}
                    />
                </div>
                {isSmall ? null : (
                    <div className={tableStyles.paginationSummary}>
                        {itemsRangeStart} - {itemsRangeEnd} of {data.length}{" "}
                        rows
                    </div>
                )}
            </div>
        );
    }
    return (
        <div
            {...getTableProps()}
            className={tableStyles.stable}
            aria-label={ariaLabel}
            role="table"
        >
            <CustomScrollbar hideVerticalTrack={true}>
                <div
                    className={tableStyles.tableContentWrapper(
                        totalColumnsWidth
                    )}
                >
                    {!noHeader && (
                        <HeaderRow
                            data={data}
                            headerGroups={headerGroups}
                            showTypeIcons={showTypeIcons}
                        />
                    )}
                    {itemCount > 0 ? (
                        <FixedSizeList
                            height={listHeight}
                            itemCount={itemCount}
                            itemSize={tableStyles.rowHeight}
                            width={"100%"}
                            style={{ overflow: "hidden auto" }}
                        >
                            {RenderRow}
                        </FixedSizeList>
                    ) : (
                        <div
                            style={{ height: height - headerHeight }}
                            className={tableStyles.noData}
                        >
                            No data
                        </div>
                    )}
                    {footerValues && (
                        <FooterRow
                            height={footerHeight}
                            isPaginationVisible={Boolean(enablePagination)}
                            footerValues={footerValues}
                            footerGroups={footerGroups}
                            totalColumnsWidth={totalColumnsWidth}
                        />
                    )}
                </div>
            </CustomScrollbar>
            {paginationEl}
        </div>
    );
});

Table.displayName = "Table";
