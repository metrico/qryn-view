import { getTableStyles, useStyles2 } from "../../styles/styles";
import { renderFooterCell } from "./renderFooterCell";



export const FooterRow = (props) => {
    const {
        totalColumnsWidth,
        footerGroups,
        height,
        isPaginationVisible,
    } = props;
   
    const tableStyles = useStyles2(getTableStyles);

    return (
        <table
            style={{
                position: isPaginationVisible ? "relative" : "absolute",
                width: totalColumnsWidth ? `${totalColumnsWidth}px` : "100%",
                bottom: "0px",
            }}
        >
            {footerGroups.map((footerGroup) => {
                const {
                    key,
                    ...footerGroupProps
                } = footerGroup.getFooterGroupProps();
                return (
                    <tfoot
                        className={tableStyles.tfoot}
                        {...footerGroupProps}
                        key={key}
                        style={height ? { height: `${height}px` } : undefined}
                    >
                        <tr>
                            {footerGroup.headers.map((column, index) =>
                                renderFooterCell(
                                    column,
                                    tableStyles,
                                    height,
                                    index
                                )
                            )}
                        </tr>
                    </tfoot>
                );
            })}
        </table>
    );
};