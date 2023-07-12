import React from "react";
import {css, cx} from '@emotion/css'
import  useTheme  from "@ui/theme/useTheme";
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


/**
 * types of series 
 * Metric Name
 * Label Name
 * Focus Label Value
 * Label Value Pair
 *  Label Name
 */

interface SeriesCountByLabelName {
    Name: string;
    Value: number;
}

const dataObj: RootObject = {
    data: {
        totalSeries: 2946,
        totalLabelValuePairs: 987,
        seriesCountByMetricName: null,
        seriesCountByLabelName: [
            {
                Name: "__ttl_days__",
                Value: 2946,
            },
            {
                Name: "sender",
                Value: 2946,
            },
            {
                Name: "container",
                Value: 2946,
            },
        ],
        seriesCountByFocusLabelValue: [
            {
                Name: "elegant-albattani",
                Value: 3,
            },
            {
                Name: "jolly-antonelli",
                Value: 3,
            },
            {
                Name: "reverent-euler",
                Value: 3,
            },
        ],
        seriesCountByLabelValuePair: [
            {
                Name: "__ttl_days__=25",
                Value: 2946,
            },
            {
                Name: "sender=logtest",
                Value: 2946,
            },
            {
                Name: "level=error",
                Value: 982,
            },
        ],
        labelValueCountByLabelName: [
            {
                Name: "container",
                Value: 982,
            },
            {
                Name: "level",
                Value: 3,
            },
            {
                Name: "__ttl_days__",
                Value: 1,
            },
        ],
    },
    isPartial: false,
    status: "success",
};

export const TotalSeriesStyles = (theme:any)=> css`
display: flex;
flex-direction:column;
background: ${theme.shadow};

border-radius: 3px;
margin: 0px 4px;
padding: 4px 6px;
.title {
    color: ${theme.contrast};
    font-size:10px;
    margin-bottom:1px;
  
}
.total-num {
    color:${theme.primary};

  
    font-size:16px;
    letter-spacing:1px;
}

`

const calcPercent = ( num: number, total: number) => (num * 100) / total


// this one will show the summary of the cardinality items
export const TotalSeries: React.FC = () => {

    const theme = useTheme()

    const total = dataObj.data.totalSeries;

    return (
        <div className={cx(TotalSeriesStyles(theme))}>
            <div className="title">Total Series</div>
            <div className="total-num">{total}</div>
        </div>
    );
};

export const SeriesRows = ( ) => {

}

export const TotalSeriesPlugin: Plugin = {
    name: "Total Series",
    section: "Query Options",
    id: nanoid(),
    Component: TotalSeries,
    description: "Total series summary",
    active: false,
    roles:["admin","superAdmin"]
};

