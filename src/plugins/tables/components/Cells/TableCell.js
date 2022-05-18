export const TableCell = ({
    cell,
    tableStyles,
    onCellFilterAdded,
    columnIndex,
    columnCount,
    userProps,
}) => {
    const cellProps = cell.getCellProps();
    const field = cell.column.field;

    if (!field?.display) {
        return null;
    }

    if (cellProps.style) {
        cellProps.style.minWidth = cellProps.style.width;
        cellProps.style.justifyContent = cell.column.justifyContent;
    }

    let innerWidth = (cell.column.width ?? 24) - tableStyles.cellPadding * 2;

    if (columnIndex === columnIndex - 1) {
        innerWidth -= tableStyles.lastChildExtraPadding;
    }

    return cell.render("Cell", {
        field,
        tableStyles,
        onCellFilterAdded,
        cellProps,
        innerWidth,
        userProps,
    });
};
