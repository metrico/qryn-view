import memoizeOne from "memoize-one";

import { FieldType, getFieldDisplayName, getFooterValue } from "../Tables";

import { getCellComponent } from "./getCellComponent";

export function rowToFieldValue(row, field) {
    if (!field || !row) {
        return "";
    }
}

export function getTextAlign(field) {
    if (!field) {
        return "flex-start";
    }

    if (field.config.custom) {
        const custom = field.config.custom;

        switch (custom.align) {
            case "right":
                return "flex-end";
            case "left":
                return "flex-start";
            case "center":
                return "center";
            default:
                return "center";
        }
    }

    if (field.type === FieldType.number) {
        return "flex-end";
    }

    return "flex-start";
}

export function filterByValue(field) {
    return function (rows, id, filterValues = []) {
        if (rows.length === 0) {
            return rows;
        }

        if (!filterValues) {
            return rows;
        }

        if (!field) {
            return rows;
        }

        return rows.filter((row) => {
            if (!row.values.hasOwnProperty(id)) {
                return false;
            }
            const value = rowToFieldValue(row, field);
            return (
                filterValues.find((filter) => filter.value === value) !==
                undefined
            );
        });
    };
}

export function getColumns(
    data,
    availableWidth,
    columnMinWidth,
    footerValues = []
) {
    const columns = [];
    let fieldCountWithoutWidth = 0;

    for (const [fieldIndex, field] of data.fields.entries()) {
        const fieldTableOptions = field.config.custom || {};
  
        if (fieldTableOptions.hidden) {
            continue;
        }

        if (fieldTableOptions.width) {
            availableWidth -= fieldTableOptions.width;
        } else {
            fieldCountWithoutWidth++;
        }

        const selectSortType = (type) => {
            switch (type) {
                case FieldType.number:
                    return "number";
                case FieldType.time:
                    return "basic";
                default:
                    return "alphanumeric-insensitive";
            }
        };

        const Cell = getCellComponent(fieldTableOptions.displayMode, field);

        columns.push({
            Cell,
            id: fieldIndex.toString(),
            field: field,
            Header: getFieldDisplayName(field, data),
            accessor: (row, i) => {
                return field.values.get(i);
            },
            sortType: selectSortType(field.type),
            width: fieldTableOptions.width,
            minWidth: fieldTableOptions.minWidth ?? columnMinWidth,
            filter: memoizeOne(filterByValue(field)),
            justifyContent: getTextAlign(field),
            Footer: getFooterValue(fieldIndex, footerValues),
        });
    }

    // set columns that are at minimum width
    let sharedWidth = availableWidth / fieldCountWithoutWidth;
    for (let i = fieldCountWithoutWidth; i > 0; i--) {
        for (const column of columns) {
            if (!column.width && column.minWidth > sharedWidth) {
                column.width = column.minWidth;
                availableWidth -= column.width;
                fieldCountWithoutWidth -= 1;
                sharedWidth = availableWidth / fieldCountWithoutWidth;
            }
        }
    }

    for (const column of columns) {
        if (!column.width) {
            column.width = sharedWidth;
        }
        column.minWidth = 50;
    }

    return columns;
}
