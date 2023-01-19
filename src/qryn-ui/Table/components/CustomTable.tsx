import { css, cx } from "@emotion/css";
import {
    flexRender,
    HeaderGroup,
    Row,
    RowData,
    Table,
} from "@tanstack/react-table";
import { useTheme } from "../../../components/DataViews/components/QueryBuilder/hooks";
import Filter from "./Filter";
import "../styles/table.css";
import { ThemeProvider } from "@emotion/react";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
export const TableHeader = css`
    position: relative;
    &.resizer {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 5px;
        cursor: col-resize;
        user-select: none;
        touch-action: none;
        &.isResizing {
            background: blue;
            opacity: 1;
        }
    }
`;
export const SortIcon = (color: string, border: string) => css`
    height: 14px !important;
    width: 14px !important;
    color: ${color} !important;
    cursor: pointer;
    border: 1px solid ${border};
    border-radius: 3px;
    padding: 2px;
`;

type TableGroup = "center" | "left" | "right";

function getTableHeaderGroups<T extends RowData>(
    table: Table<T>,
    tg?: TableGroup
): [HeaderGroup<T>[], HeaderGroup<T>[]] {
    if (tg === "left") {
        return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()];
    }

    if (tg === "right") {
        return [table.getRightHeaderGroups(), table.getRightFooterGroups()];
    }

    if (tg === "center") {
        return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()];
    }

    return [table.getHeaderGroups(), table.getFooterGroups()];
}

function getRowGroup<T extends RowData>(row: Row<T>, tg?: TableGroup) {
    if (tg === "left") return row.getLeftVisibleCells();
    if (tg === "right") return row.getRightVisibleCells();
    if (tg === "center") return row.getCenterVisibleCells();
    return row.getVisibleCells();
}

type Props<T extends RowData> = {
    table: Table<T>;
    tableGroup?: TableGroup;
    columnResizeMode: string;
};

export function CustomTable<T extends RowData>({
    table,
    tableGroup,
    columnResizeMode,
}: Props<T>) {
    const theme = useTheme();

    const [headerGroups] = getTableHeaderGroups(table, tableGroup);
    return (
        <ThemeProvider theme={theme}>
            <table style={{ width: "100%" }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    className={cx(TableHeader)}
                                    {...{
                                        key: header.id,
                                        colSpan: header.colSpan,
                                        style: {
                                            width: header.getSize(),
                                        },
                                    }}
                                >
                                    {" "}
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "6px",
                                            alignItems: "center",
                                            fontSize: "13px",
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                        <div
                                            {...{
                                                onMouseDown:
                                                    header.getResizeHandler(),
                                                onTouchStart:
                                                    header.getResizeHandler(),
                                                className: `resizer ${
                                                    header.column.getIsResizing()
                                                        ? "isResizing"
                                                        : ""
                                                }`,
                                            }}
                                        />

                                        <div
                                            style={{
                                                fontSize: "12px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                            }}
                                        >
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter
                                                        column={header.column}
                                                        table={table}
                                                    />
                                                </div>
                                            ) : null}
                                            <button
                                                onClick={header.column.getToggleSortingHandler()}
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    display:'flex',
                                                    alignItems:'center'
                                                }}
                                                title={'Sort'}
                                                className={
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : ""
                                                }
                                            >
                                                {{
                                                    asc: (
                                                        <KeyboardArrowUpOutlinedIcon
                                                            className={cx(
                                                                SortIcon(
                                                                    theme.textColor,
                                                                    theme.buttonBorder
                                                                )
                                                            )}
                                                        />
                                                    ),
                                                    desc: (
                                                        <KeyboardArrowDownOutlinedIcon
                                                            className={cx(
                                                                SortIcon(
                                                                    theme.textColor,
                                                                    theme.buttonBorder
                                                                )
                                                            )}
                                                        />
                                                    ),
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? (
                                                    <SortOutlinedIcon
                                                        className={cx(
                                                            SortIcon(
                                                                theme.textColor,
                                                                theme.buttonBorder
                                                            )
                                                        )}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {getRowGroup(row, tableGroup).map((cell) => (
                                <td
                                    key={cell.id}
                                    style={{
                                        width: cell.column.getSize(),
                                        fontSize: "12px",
                                    }}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </ThemeProvider>
    );
}

export default CustomTable;
