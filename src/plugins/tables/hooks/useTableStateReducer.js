import { useCallback } from "react";
import { getFieldDisplayName } from "../Tables";

export function useTableState({ onColumnResize, onSortByChange, data }) {
    return useCallback(
        (newState, action) => {
            switch (action.type) {
                case "columnDoneResizing":
                    if (onColumnResize) {
                        const info = newState.columnResizing.headerIdWidths[0];
                        const columnIdString = info[0];
                        const fieldIndex = parseInt(columnIdString, 10);
                        const width = Math.round(
                            newState.columnResizing.columnResizing.columnWidths[
                                columnIdString
                            ]
                        );
                        const field = data.fields[fieldIndex];
                        if (!field) {
                            return newState;
                        }
                        const fieldDisplayName = getFieldDisplayName(
                            field,
                            data
                        );
                        onColumnResize(fieldDisplayName, width);
                    }
                    break;
                case "toggleSortBy":
                    if (onSortByChange) {
                        const sortByFields = [];
                        for (const sortItem of newState.sortBy) {
                            const field =
                                data.fields[parseInt(sortItem.id, 10)];
                            if (!field) {
                                continue;
                            }
                            sortByFields.push({
                                displayName: getFieldDisplayName(field, data),
                                desc: sortItem.desc,
                            });
                        }
                        onSortByChange(sortByFields);
                    }
                    break;

                default:
                    return;
            }
            return newState;
        },
        [data, onColumnResize, onSortByChange]
    );
}
