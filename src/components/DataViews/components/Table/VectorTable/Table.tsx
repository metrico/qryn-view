import {memo, useCallback,  useMemo, FC } from "react";
import {

    useFlexLayout,
    useResizeColumns,
    useSortBy,
    useTable,
} from "react-table";

import { FixedSizeList } from "react-window";
import { getStyles } from "./styles";
import { ZoomIn, ZoomOut } from "@mui/icons-material/";
import { addLabel } from "../../ValueTags";

export const AddLabels = (props: any) => {
    // get queryObject from parent
    const { tkey, value, actualQuery } = props;

    return (
        <div className="show-add-labels">
            <span
                aria-label="Filter for value"
                title="Filter for value"
                onClick={(e) => addLabel(e, tkey, value, false, actualQuery)}
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
                onClick={(e) => addLabel(e, tkey, value, true, actualQuery)}
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

export interface Props {
    columns: any;
    data:any;
    actQuery: any;
    size: any;
    width: any;
    height:any;

}


export const Table: FC <Props> =  memo((props: Props)=> {
    // modify height from props in here

    const { columns, data, actQuery, size, width } = props;

    const { responseType } = actQuery;

    const cellProps = (props: any, { cell }: { cell: any }) =>
        getStyles(props, cell.column.align);

    const defaultColumn = useMemo(
        () => ({
          width: 75,
            minWidth: 20,
            maxWidth:150,
           // canResize: true,
        }),
        []
    );

    const options = useMemo(
        () => ({ columns, data, defaultColumn }),
        [columns, data, defaultColumn]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(options, useFlexLayout, useResizeColumns, useSortBy);

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
                    {row.cells.map((cell: any, id:any) => {
                        return (
                            <div
                            key={id}
                                {...cell.getCellProps(cellProps)}
                                className="td"
                                title={cell.render("Cell").props.value}
                            >
                                {cell.render("Cell")}{" "}
                                {responseType === "vector" && (
                                    <AddLabels
                                        actualQuery={actQuery}
                                        tkey={ 
                                            cell.render("Cell").props.column
                                                .Header
                                        }
                                        value={cell.render("Cell").props.value}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        },
        [prepareRow, rows,actQuery,responseType]
    );

    return (
        <div {...getTableProps()} className="table">
            <div>
                {headerGroups?.map((headerGroup: any) => (
                    <div {...headerGroup.getHeaderGroupProps({})} className="tr">
                        {headerGroup.headers.map((column: any) => (
                            <div
                                key={column.id}
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                             
                                className="th"
                            >
                                      <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? " 🔽"
                                            : " 🔼"
                                        : ""}
                                </span>
                                {column.render("Header")}

                          

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
                    height={parseInt(size) || 600}
                    itemCount={rows.length}
                    itemSize={26}
                    width={'100%'}
                >
                    {RenderRow}
                </FixedSizeList>
            </div>
        </div>
    );
});
