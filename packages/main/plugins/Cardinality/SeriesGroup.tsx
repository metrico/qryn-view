import React, { useState, useMemo } from "react";
import { SeriesHeader, SeriesHeaderProps } from "./SeriesHeader";
import { SeriesRow, SeriesRowHeaders, SeriesRowProps } from "./SeriesRow";
import useTheme from "@ui/theme/useTheme";
import { cx, css } from "@emotion/css";
import { sortByCol} from './helpers'

export const SeriesGroupContainer = (theme: any) => css`
    margin: 4px;
    display: flex;
    flex-direction: column;
    padding: 8px 4px;
    background: ${theme.shadow};
    .c-header {
        font-size: 14px;
        padding: 8px 6px;
        border-bottom: 1px solid ${theme.neutral};
       
        font-weight: bold;
    }
    .c-table {
        display: table;
        widht: 100%;
    }
`;

export type SeriesGroupProps = {
    rows: SeriesRowProps[];
    sectionHeader: string;
    sectionHeaderName:string;
} & SeriesHeaderProps;

// format the header according to the header type

export const SeriesGroup: React.FC<SeriesGroupProps> = ({
    title,
    rows,
    sectionHeader,
    sectionHeaderName
}: SeriesGroupProps) => {
    const theme = useTheme();

    const [sortColumn, setSortColumn] = useState({
        col: "value",
        order: "desc",
    });

    const sortedRows = useMemo(() => {
        const { col, order } = sortColumn;
        return sortByCol(rows, col, order);
    }, [rows, sortColumn]);

    

    const handleSort = (e: any) => {
        setSortColumn((prev: any) => ({
            col: e,
            order: prev.order === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <div className={cx(SeriesGroupContainer(theme))}>
            <SeriesHeader title={title} />
            <div className="c-table">
                {rows && (
                    <SeriesRowHeaders
                        handleSort={handleSort}
                        headerName={sectionHeaderName}
                        name={sectionHeader}
                        theme={theme}
                    />
                )}
                {sortedRows &&
                    sortedRows?.length > 0 &&
                    sortedRows.map((row: SeriesRowProps, key: number) => (
                        <SeriesRow  key={key} headerName={sectionHeaderName} {...row} />
                    ))}
            </div>
        </div>
    );
};
