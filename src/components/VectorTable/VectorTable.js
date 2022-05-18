import { useMemo } from "react";
import { useBlockLayout, useResizeColumns, useTable } from "react-table";

import styled from "@emotion/styled";

// get the datasource
// format into Columns
// format into data rows
// render at view!

const Styles = styled.div`
    padding: 1rem;

    .table {
        display: inline-block;
        border-spacing: 0;
        border: 1px solid lightgray;
        font-size: 12px;
        .tr {
            :last-child {
                .td {
                    border-bottom: 0;
                }
            }
        }

        .th,
        .td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid lightgray;
            border-right: 1px solid transparent;

            ${"" /* In this example we use an absolutely position resizer,
     so this is required. */}
            position: relative;

            :last-child {
                border-right: 0;
            }
            .resizer {
                display: inline-block;
                background: lightgray;
                width: 3px;
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
`;

// from JSON const parsed = (rawData['data']['result'])

function prepareCols(data) {
    let cache = [];
    for (let header of data) {
        let metricKeys = Object.keys(header.metric);
        for (let metric in metricKeys) {
            if (!cache.includes(metricKeys[metric])) {
                cache.push(metricKeys[metric]);
            }
        }
    }
    console.log(cache);
    return cache;
}

function setColumnsData(columns) {
    console.log(columns);
    return columns
        ?.map((row) => ({ Header: row, accessor: row }))
        ?.concat([
            { Header: "Time", accessor: "time" },
            { Header: "Value", accessor: "value" },
        ]);
}
function hasKey(obj, value) {
    return Object.keys(obj).includes(value);
}

function prepareVectorRows(data) {
    const cols = prepareCols(data);
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
    console.log(rows);
    return rows;
}

function Table({ columns, data }) {
    console.log(columns, data);
    const defaultColumn = useMemo(
        () => ({
            minWidth: 30,
            width: 150,
            maxWidth: 400,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        resetResizing,
    } = useTable(
        { columns, data, defaultColumn },
        useBlockLayout,
        useResizeColumns
    );
    return (
        <>
            <button onClick={resetResizing}>Reset Resizing</button>
            <div {...getTableProps()} className="table">
                <div>
                    {headerGroups.map((headerGroup) => (
                        <div
                            {...headerGroup.getHeaderGroupProps()}
                            className="tr"
                        >
                            {headerGroup.headers.map((column) => (
                                <div
                                    {...column.getHeaderProps()}
                                    className="th"
                                >
                                    {column.render("Header")}
                                    <div
                                        {...column.getResizerProps()}
                                        className={`resizer ${
                                            column.isResizing
                                                ? "isResizing"
                                                : ""
                                        }`}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className="tr" key={i}>
                                {row.cells.map((cell, idx) => {
                                    return (
                                        <div
                                            {...cell.getCellProps()}
                                            key={idx}
                                            className="td"
                                        >
                                            {cell.render("Cell")}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default function VectorTable(props) {
    const colsData = prepareCols(props.data);
    const columnsData = setColumnsData(colsData);
    const columns = columnsData;

    const dataRows = prepareVectorRows(props.data);

    return (
        <Styles>
            <Table columns={columns} data={dataRows} />
        </Styles>
    );
}
