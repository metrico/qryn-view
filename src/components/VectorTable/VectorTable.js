import { useMemo } from "react";
import {
    useAbsoluteLayout,
    useBlockLayout,
    useFilters,
    usePagination,
    useResizeColumns,
    useSortBy,
    useTable,
} from "react-table";

import { styled } from "@emotion/styled";

// get the datasource
// format into Columns
// format into data rows
// render at view!

const Styles = styled.div`
    padding: 1rem;

    .table {
        display: inline-block;
        border-spacing: 0;
        border: 1px solid black;

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
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            ${"" /* In this example we use an absolutely position resizer,
     so this is required. */}
            position: relative;

            :last-child {
                border-right: 0;
            }
            .resizer {
                display: inline-block;
                background: gray;
                width: 10px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                transform: translateX(50%);
                z-index: 1;
                ${"" /* prevents from scrolling while dragging on touch devices */}
                touch-action:none;

                &.isResizing {
                    background: red;
                }
            }
        }
    }
`;

function Table({ columns, data }) {
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
                                {row.cells.map((cell,idx) => {
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

export default function VectorTable() {
    const cols = [
        { Header: "Header Label", accessor: "label" },
        { Header: "Header Labels 2", accessor: "labels2" },
    ];
    const data = [
        { label: "row", labels2: "row2" },
        { label: "mow", labels2: "mow2" },
        { label: "dow", labels2: "dow2" },
    ];
    const columns = useMemo(() => cols,[]);

    const dataRows = useMemo(() => data,[]);

    return (
        <Styles>
            <Table columns={columns} data={dataRows} />
        </Styles>
    );
}
