import React, { useRef } from "react";
import SeriesHeader, { type SeriesHeaderProps } from "./SeriesHeader";
import SeriesRow, { type SeriesRowProps } from "./SeriesRow";
import SeriesRowHeaders from "./SeriesRowHeaders";
import useTheme from "@ui/theme/useTheme";
import { useSeriesGroupStyles } from "./SeriesGroupStyles";
import { useSortedColumns } from "./useSortColumn";

export type SeriesGroupProps = {
    rows: SeriesRowProps[];
    sectionHeader: string;
    sectionHeaderName: string;
} & SeriesHeaderProps;

import { ChartsGroup } from "./ChartsGroup";

// This components is used to display a group of series
export const SeriesGroup: React.FC<SeriesGroupProps> = ({
    title,
    rows,
    sectionHeader,
    sectionHeaderName,
}: SeriesGroupProps) => {
    const theme = useTheme();

    const { seriesGroupContainer, seriesGroupStyles } = useSeriesGroupStyles(theme);

    const { sortedRows, handleSort } = useSortedColumns(rows);
    const containerRef: any = useRef(null);

    return (
        <div className={seriesGroupContainer} ref={containerRef}>
            <SeriesHeader title={title} />
            <div className="c-table">
                {rows && (
                    <SeriesRowHeaders
                        handleSort={handleSort}
                        headerName={sectionHeaderName}
                        name={sectionHeader}
                        theme={seriesGroupStyles}
                    />
                )}
                {sortedRows &&
                    sortedRows?.length > 0 &&
                    sortedRows.map((row: SeriesRowProps, key: number) => (
                        <SeriesRow
                            key={key}
                            theme={seriesGroupStyles}
                            hasShare={
                                sectionHeaderName !==
                                "labelValueCountByLabelName"
                            }
                            {...row}
                        />
                    ))}
            </div>
            <ChartsGroup rows={sortedRows} theme={theme} />
        </div>
    );
};
