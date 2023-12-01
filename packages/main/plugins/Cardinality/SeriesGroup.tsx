import React, { useRef, useState } from "react";
import SeriesHeader, { type SeriesHeaderProps } from "./SeriesHeader";
import { type SeriesRowProps } from "./SeriesRow";
import useTheme from "@ui/theme/useTheme";
import { useSeriesGroupStyles } from "./SeriesGroupStyles";
import { useSortedColumns } from "./useSortColumn";

import { ChartsGroup } from "./ChartsGroup";

import CardinalityTable from "./CardinalityTable";

export type SeriesGroupProps = {
    rows: SeriesRowProps[];
    sectionHeader: string;
    sectionHeaderName: string;
} & SeriesHeaderProps;

// This components is used to display a group of series
export const SeriesGroup: React.FC<SeriesGroupProps> = ({
    title,
    rows,
    sectionHeader,
    sectionHeaderName,
}: SeriesGroupProps) => {
    const theme = useTheme();

    const { seriesGroupContainer } = useSeriesGroupStyles(theme);

    const { sortedRows } = useSortedColumns(rows);
    const containerRef: any = useRef(null);
    const [tabsValue, setTabsValue] = useState(0);

    const onTabChange = (event: any, newValue: any) => {
        setTabsValue(newValue);
    };

    return (
        <div className={seriesGroupContainer} ref={containerRef}>
            <SeriesHeader
                theme={theme}
                title={title}
                tabsValue={tabsValue}
                onTabChange={onTabChange}
            />

            {tabsValue === 0 && (
                <CardinalityTable
                    title={title}
                    rows={sortedRows}
                    theme={theme}
                    sectionHeader={sectionHeader}
                    sectionHeaderName={sectionHeaderName}
                />
            )}

            {tabsValue === 1 && <ChartsGroup rows={sortedRows} theme={theme} />}
        </div>
    );
};
