import React from "react";

import { useSeriesGroupStyles } from "./SeriesGroupStyles";
import { useSortedColumns } from "./useSortColumn";
import SeriesRow, { type SeriesRowProps } from "./SeriesRow";
import SeriesRowHeaders from "./SeriesRowHeaders";
import { type SeriesHeaderProps } from "./SeriesHeader";
import Loader from "./Loader";
export type CardinalityTableProps = {
    rows: SeriesRowProps[];
    sectionHeader: string;
    sectionHeaderName: string;
    theme: any;
} & SeriesHeaderProps;

const CardinalityTable: React.FC<CardinalityTableProps> = ({
    rows,
    theme,
    sectionHeader,
    sectionHeaderName,
}) => {
    const { seriesGroupStyles } = useSeriesGroupStyles(theme);

    const { sortedRows, handleSort } = useSortedColumns(rows);

    return (
        <div className="c-table">
            {rows && (
                <SeriesRowHeaders
                    handleSort={handleSort}
                    headerName={sectionHeaderName}
                    name={sectionHeader}
                    theme={seriesGroupStyles}
                />
            )}

            {sortedRows && sortedRows?.length >= 0 ? (
                sortedRows.map((row: SeriesRowProps, key: number) => (
                    <SeriesRow
                        {...row}
                        key={key}
                        theme={seriesGroupStyles}
                        hasShare={
                            sectionHeaderName !== "labelValueCountByLabelName"
                        }
                    />
                ))
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default CardinalityTable;
