import { useMemo, useState, useEffect, memo, useCallback } from "react";
import {
    useBlockLayout,
    useResizeColumns,
    useTable,
    useSortBy,
    useFlexLayout,
    useRowSelect,
} from "react-table";

import styled from "@emotion/styled";
import memoizeOne from "memoize-one";
import { FixedSizeList } from "react-window";
import { sortBy } from "lodash";

// get the datasource
// format into Columns
// format into data rows
// render at view!

const Styles = styled.div`
    padding: 1rem;

    .table {
        border-spacing: 0;
        border: 1px solid lightgray;
        font-size: 12px;

        .tr {
            display: flex;
            :last-child {
                .td {
                    border-bottom: 0;
                }
            }
        }
        .th {
                :last-child {
                    box-sizing: unset !important;
                }
            }
        .th,
        .td {
            display: flex;
            flex: 1;
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid lightgray;
            border-right: 1px solid lightgray;

            ${"" /* In this example we use an absolutely position resizer,
     so this is required. */}
            position: relative;

            :last-child {
                border-right: 0;
                padding-right: 0px;
            }
        

            .resizer {
                display: inline-block;
                background: lightgray;
                width: 1px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                transform: translateX(50%);
                z-index: 1;
                ${"" /* prevents from scrolling while dragging on touch devices */}
                touch-action:none;

                &.isResizing {
                    background: blue;
                }
            }
        }
    }
    .pagination {
        padding: 0.5rem;
    }
`;

// from JSON const parsed = (rawData['data']['result'])
// PREPARE COLS
export function prepareCols(data) {
    const startTime = performance.now();

    let cache = [];
    try {
        for (let header of data) {
            let metricKeys = Object.keys(header.metric);

            for (let metric in metricKeys) {
                if (!cache.includes(metricKeys[metric])) {
                    cache.push(metricKeys[metric]);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
    const duration = performance.now() - startTime;
    console.log("prepareCols took ", duration, " seconds");

    return cache;
}

export function setColumnsData(columns) {
    const startTime = performance.now();
    const columnsData = columns?.map((row) => ({ Header: row, accessor: row }));
    const columnsDated = setColumnsTsValue(columnsData);
    const duration = performance.now() - startTime;
    console.log("prepareCols took ", duration, " seconds");

    return columnsDated;
}

export function setColumnsTsValue(columns) {
    if (columns.length > 0) {
        return [
            { Header: "Time", accessor: "time" },
            ...columns,
            { Header: "Value", accessor: "value" },
        ];
    } else return [];
}

// PREPARE ROWS
export function prepareVectorRows(data) {
    const startTime = performance.now();
    const cols = prepareCols(data);
    try {
        let rows = [];
        const dataLength = data.length;
        const colsLength = cols.length;

        for (let i = 0; i < dataLength; i++) {
            let dataRow = data[i];
            let metric = dataRow.metric;
            let [time, value] = dataRow.value;
            let row = {};
            for (let j = 0; j < colsLength; j++) {
                let col = cols[j];

                row[col] = metric[col] || "";
            }
            row.time = time;
            row.value = value;
            rows.push(row);
        }

        const sorted = sortBy( rows , (row) => row.time )
        const duration = performance.now() - startTime;
        console.log("prepareVectorRows took ", duration, " seconds");
        return sorted;
    } catch (e) {
        console.log(e);
    }
}

function Table({ columns, data }) {

  const [tableHeight,setTableHeight] = useState(window.innerHeight - 200)
useEffect(()=>{
if(tableHeight !== window.innerHeight - 200)
setTableHeight(window.innerHeight - 200)
},[setTableHeight, tableHeight])


    const getStyles = (props, align = "left") => [
        props,
        {
            style: {
                justifyContent: align === "right" ? "flex-end" : "flex-start",
                alignItems: "flex-start",
                display: "flex",
            },
        },
    ];

    const headerProps = (props, { column }) => getStyles(props, column.align);

    const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

    console.log(columns, data);

    const startTime = performance.now();
    const defaultColumn = useMemo(
        () => ({
            width: 75,
        }),
        []
    );

    const scrollbarWidth = () => {
        // thanks too https://davidwalsh.name/detect-scrollbar-width
        const scrollDiv = document.createElement("div");
        scrollDiv.setAttribute(
            "style",
            "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;"
        );
        document.body.appendChild(scrollDiv);
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };

    console.log(data);

    const enablePagination = true;

    const duration1 = performance.now() - startTime;
    if (duration1) {
        console.log("duration 1 process took: ", duration1 / 1000, " Seconds");
    }
    const options = useMemo(() => ({ columns, data, defaultColumn }), [
        columns,
        data,
        defaultColumn,
    ]);

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
    console.log(data);
    const duration = performance.now() - duration1;

    if (duration) {
        console.log("duration 2 process took: ", duration / 1000, " Seconds");
    }

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
                            >
                                {cell.render("Cell")}
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
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className="th"
                            >
                                {column.render("Header")}
                                <span>
                                {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
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

                {/* {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className="tr">
                                {row.cells.map((cell) => {
                                    return (
                                        <div
                                            {...cell.getCellProps(cellProps)}
                                            
                                            className="td"
                                        >
                                            {cell.render("Cell")}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })} */}
            </div>
        </div>
    );
}

// prepare data for the table as table format
//columns: Header , accessor
// data [{acccesor:value}]
export const VectorTable = memo((props) => {
    // get the data processed before
    // memoize already processed data ?
    const startTime = performance.now();

    const colsData = useMemo(() => prepareCols(props.data), [props.data]);

    const columnsData = useMemo(() => setColumnsData(colsData), [colsData]);

    const dataRows = useMemo(() => prepareVectorRows(props.data), [props.data]);

    const duration = performance.now() - startTime;

    if (duration) {
        console.log("process took: ", duration, " Seconds");
    }
    return (
        <Styles>
            <Table columns={columnsData} data={dataRows} />
        </Styles>
    );
});
