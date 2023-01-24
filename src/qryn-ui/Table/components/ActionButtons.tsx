import { css, cx } from "@emotion/css";
import { RowData, RowModel } from "@tanstack/react-table";
import { useTheme } from "../../../components/DataViews/components/QueryBuilder/hooks";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import FastRewindOutlinedIcon from "@mui/icons-material/FastRewindOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
type Props<T extends RowData> = {
    getSelectedRowModel: () => RowModel<T>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: () => void;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    previousPage: () => void;
    refreshData: () => void;
    rerender: () => void;
    rowSelection: Object;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    totalRows: number;
};

export const flex_items_gap_1 = css`
    display: flex;
    align-items: center;
    gap: 1px;
`;

export const default_font_size = css`
    font-size: 12px;
`;

export const input_round_border = (theme: any) => css`
    border-radius: 3px;
    outline: none;
    border: 1px solid ${theme.buttonBorder};
    background: ${theme.inputBg};
    color: ${theme.textColor};
    padding: 3px 8px;
    margin: 2px;
    width: 70px;
`;

export const page_select = (theme: any) => css`
    color: ${theme.textColor};
    border: 1px solid ${theme.buttonBorder};
    background: ${theme.inputBg};
    padding: 3px 8px 2px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
`;

export const icon_size = css`
    height: 12px;
    width: 12px;
`;

export const pagination_button = (theme: any) => css`
    display: flex;
    align-items: center;
    border: 1px solid ${theme.buttonBorder};
    color: ${theme.textColor};
    background: ${theme.buttonDefault};
    cursor: pointer;
`;

export function ActionButtons<T extends RowData>({
    getSelectedRowModel,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    pageCount,
    pageIndex,
    pageSize,
    previousPage,
    refreshData,
    rerender,
    rowSelection,
    setPageIndex,
    setPageSize,
    totalRows,
}: Props<T>) {
    const theme = useTheme();
    return (
        <>
            <div
                style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    flex: 1,
                    width: "100%",
                    color: theme.textColor,
                    margin: "5px",
                }}
            >
                <button
                    className={cx(pagination_button(theme))}
                    onClick={() => setPageIndex(0)}
                    disabled={!hasPreviousPage}
                >
                    <FastRewindOutlinedIcon
                        style={{ height: "12px", width: "12px" }}
                    />
                </button>
                <button
                    className={cx(pagination_button(theme))}
                    onClick={() => previousPage()}
                    disabled={!hasPreviousPage}
                >
                    <SkipPreviousOutlinedIcon
                        style={{ height: "12px", width: "12px" }}
                    />
                </button>
                <button
                    className={cx(pagination_button(theme))}
                    onClick={() => nextPage()}
                    disabled={!hasNextPage}
                >
                    <SkipNextOutlinedIcon
                        style={{ height: "12px", width: "12px" }}
                    />
                </button>
                <button
                    className={cx(pagination_button(theme))}
                    onClick={() => setPageIndex(pageCount - 1)}
                    disabled={!hasNextPage}
                >
                    <FastForwardOutlinedIcon
                        style={{ height: "12px", width: "12px" }}
                    />
                </button>
                <span className={cx(flex_items_gap_1, default_font_size)}>
                    <div>
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageCount}
                        </strong>
                    </div>
                </span>
                <span className={cx(flex_items_gap_1, default_font_size)}>
                    - Go to page:
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            setPageIndex(page);
                        }}
                        className={cx(input_round_border(theme))}
                    />
                </span>
                <select
                    className={cx(page_select(theme))}
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize} Rows
                        </option>
                    ))}
                </select>
                <div style={{ fontSize: "12px", marginLeft: "6px" }}>
                    {" "}
                    Total: {totalRows} Rows
                </div>
            </div>

            <div className="flex items-center gap-2"></div>
        </>
    );
}

export default ActionButtons;
