import React from "react";
import { css, cx } from "@emotion/css";
import useTheme from "@ui/theme/useTheme";
import { Plugin } from "../types";
import { nanoid } from "nanoid";
interface RootObject {
    data: Data;
    isPartial: boolean;
    status: string;
}

interface Data {
    totalSeries: number;
    totalLabelValuePairs: number;
    seriesCountByMetricName?: any;
    seriesCountByLabelName: SeriesCountByLabelName[];
    seriesCountByFocusLabelValue: SeriesCountByLabelName[];
    seriesCountByLabelValuePair: SeriesCountByLabelName[];
    labelValueCountByLabelName: SeriesCountByLabelName[];
}

export const sectionsTitles = (str: string | null): Record<string, string> => ({
    seriesCountByMetricName: "Metric names with highest number of series",
    seriesCountByLabelName: " Labels with the highest number of series",
    seriesCountByFocusLabelValue: `Values for "${str}" label with the highest number of series`,
    seriesCountByLabelValuePair:
        "Label=value pairs with the highest number of series",
    labelValueCountByLabelName:
        "Labels with the highest number of unique values",
});

/**
 * types of series
 * Metric name
 * Label name
 * Focus Label value
 * Label value Pair
 *  Label name
 */

interface SeriesCountByLabelName {
    name: string;
    value: number;
}


const dataObj: RootObject = {
    data: {
        totalSeries: 2946,
        totalLabelValuePairs: 987,
        seriesCountByMetricName: null,
        seriesCountByLabelName: [
            {
                name: "__ttl_days__",
                value: 296,
            },
            {
                name: "sender",
                value: 946,
            },
            {
                name: "container",
                value: 46,
            },
        ],
        seriesCountByFocusLabelValue: [
            {
                name: "elegant-albattani",
                value: 3,
            },
            {
                name: "jolly-antonelli",
                value: 3,
            },
            {
                name: "reverent-euler",
                value: 3,
            },
        ],
        seriesCountByLabelValuePair: [
            {
                name: "__ttl_days__=25",
                value: 2946,
            },
            {
                name: "sender=logtest",
                value: 2946,
            },
            {
                name: "level=error",
                value: 982,
            },
        ],
        labelValueCountByLabelName: [
            {
                name: "container",
                value: 982,
            },
            {
                name: "level",
                value: 3,
            },
            {
                name: "__ttl_days__",
                value: 1,
            },
        ],
    },
    isPartial: false,
    status: "success",
};

export const TotalSeriesStyles = (theme: any) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.shadow};
    border-radius: 3px;
    margin: 0px 4px;
    padding: 4px 6px;
    .title {
        color: ${theme.contrast};
        font-size: 10px;
        margin-bottom: 1px;
    }
    .total-num {
        color: ${theme.primary};
        font-size: 16px;
        letter-spacing: 1px;
    }
`;
export const SeriesGroupContainer = (theme: any) => css`
    margin: 4px;
    display: flex;
    flex-direction: column;
    padding: 8px 4px;
    background: ${theme.shadow};
    .c-header {
        font-size: 14px;
        padding:8px 6px;
        //margin: 0px 12px;
        border-bottom:1px solid ${theme.lightContrast};
        font-weight:bold;
    }
`;
const calcPercent = (num: number, total: number) => {
    return (num * 100) / total;
};

// this one will show the summary of the cardinality items
export const TotalSeries: React.FC = () => {
    const theme = useTheme();

    const total = dataObj.data.totalSeries;

    return (
        <div className={cx(TotalSeriesStyles(theme))}>
            <div className="title">Total Series</div>
            <div className="total-num">{total}</div>
        </div>
    );
};

export type SeriesHeaderProps = {
    title: string;
};

export const SeriesHeader = ({ title }: SeriesHeaderProps) => {
    return <div className="c-header">{title}</div>;
};

export type SeriesRowProps = {
    name: string;
    value: number;
    share: number;
    theme: any;
    onFilter: (e: any) => void;
};

export const SeriesRowStyle = (theme: any) => css`
    display: flex;
    align-items: center;
    padding: 12px 8px;
    border-bottom: 1px solid ${theme.lightContrast};
    .c-name {
        font-size: 12px;
        color: ${theme.primary};
        flex: 1;
        cursor: pointer;
        margin: 0px 12px;
    }
    .c-value {
        color: ${theme.contrast};
        font-size: 12px;
        margin: 0px 12px;
        font-weight: bold;
    }
    .c-share {
        font-size: 12px;
        font-family: monospace;
        margin: 0px 12px;
    }
    progress {
        background: ${theme.deep};
        border-radius: 3px;
        // width: 50%;
        height: 12px;

        border: 1px solid ${theme.accentNeutral};
    }
    progress::-webkit-progress-bar {
        background-color: ${theme.deep};
        border-radius: 3px;
    }
    progress::-webkit-progress-value {
        background-color: ${theme.primary};
        border-radius: 3px;
    }
    progress::-moz-progress-bar {
        background-color: ${theme.primary};
        border-radius: 3px;
    }
`;
export const SeriesRow = ({
    name,
    value,
    share,
    theme,
    onFilter,
}: SeriesRowProps) => {
    return (
        <div className={cx(SeriesRowStyle(theme))}>
            <div className="c-name" onClick={onFilter}>
                {name}
            </div>
            <div className="c-value">{value}</div>
            <progress value={share} max={100} />
            <div className="c-share">{share.toFixed(2)}%</div>
        </div>
    );
};

export type SeriesGroupProps = {
    rows: SeriesRowProps[];
} & SeriesHeaderProps;

export const SeriesGroup = ({ title, rows }: SeriesGroupProps) => {
    const theme = useTheme();

    return (
        <div className={cx(SeriesGroupContainer(theme))}>
            <SeriesHeader title={title} />
            {rows &&
                rows?.length > 0 &&
                rows.map((row: SeriesRowProps, key: number) => (
                    <SeriesRow key={key} {...row} />
                ))}
        </div>
    );
};

export const CardinalityView = () => {
    const theme = useTheme();

    const onFilter = (val: string) => {
        console.log(val);
    };


    function formatSeries(arr: any): SeriesRowProps[] {
        return arr.map((query: any) => ({
            name: query.name,
            value: query.value,
            share: calcPercent(query.value, dataObj.data.totalSeries),
            theme,
            onFilter,
        }));
    }

    const formattedSeries = () =>
        Object.keys(dataObj.data)
            ?.filter((f: any) => Array.isArray(dataObj.data[f]))
            ?.map((key: string) => ({
                [key]: formatSeries(dataObj.data[key]),
            }));



    return (
        <>
            {formattedSeries()?.map((series: any, key: number) => (
                <SeriesGroup
                    key={key}
                    title={sectionsTitles("metric")[Object.keys(series)[0]]}
                    rows={series[Object.keys(series)[0]]}
                />
            ))}
        </>
    );
};

export const CardinalViewPlugin: Plugin = {
    name: "Cardinal View",
    section: "Query Item",
    id: nanoid(),
    Component: CardinalityView,
    description: "A cardinality view for labels",
    active: false,
    roles: ["admin", "superAdmin"],
};

export const TotalSeriesPlugin: Plugin = {
    name: "Total Series",
    section: "Query Options",
    id: nanoid(),
    Component: TotalSeries,
    description: "Total series summary",
    active: false,
    roles: ["admin", "superAdmin"],
};
