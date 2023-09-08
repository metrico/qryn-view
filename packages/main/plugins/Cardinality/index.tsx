import React, { useEffect, useState } from "react";
import {  cx } from "@emotion/css";
import useTheme from "@ui/theme/useTheme";
import { Plugin } from "../types";
import { nanoid } from "nanoid";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import Configurator from "./Configurator";
import { SeriesRowProps } from "./SeriesRow";
import { SeriesGroup } from "./SeriesGroup";
import { CardinalityResponse } from "./types";
import { resultsContainerStyles } from './styles'
import useCardinalityStore from "./store/CardinalityStore";
import { setIsCardinality } from "./store/setIsCardinality";
import {
    useCardinalityRequest,
} from "./api/CardinalityRequest";


const sectionsTitles = (str: string | null): Record<string, string> => ({
    seriesCountByMetricName: "Metric names with highest number of series",
    seriesCountByLabelName: " Labels with the highest number of series",
    seriesCountByFocusLabelValue: `Values for "${str}" label with the highest number of series`,
    seriesCountByLabelValuePair:
        "Label=value pairs with the highest number of series",
    labelValueCountByLabelName:
        "Labels with the highest number of unique values",
});

const tableHeaders:any =  {
    seriesCountByMetricName: "Metric Name",
    seriesCountByLabelName: "Label name",
    seriesCountByFocusLabelValue: "Label value",
    seriesCountByLabelValuePair: "Label=value pair",
    labelValueCountByLabelName:"Label name",
  };




import { defaultCardinalityStatus, queryUpdater } from "./helpers";
import { useDispatch } from "react-redux";

const calcPercent = (num: number, total: number) => {
    return (num * 100) / total;
};


export const CardinalityView = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Cardinality />
        </QueryClientProvider>
    );
};

export const Cardinality = () => {
    const [data, setData] = useState<any>({
        data: defaultCardinalityStatus,
        formattedSeries: [],
    });

    const dispatch:any = useDispatch();

    const theme = useTheme();

    const {
        setTotal,
        focusLabel,
        timeSeriesSelector: match,
        setFocusLabel,
        setTimeSeriesSelector,
    } = useCardinalityStore();

    useEffect(() => {
        
        dispatch(setIsCardinality(true));
        return () => {
            dispatch(setIsCardinality(false));
        };

    },[]);

    const handleFilterClick = (key: string, query: string) => {
        const value = queryUpdater[key]({ query, focusLabel, match });

        setTimeSeriesSelector(value); //  { match: value };

        if (
            key === "labelValueCountByLabelName" ||
            key == "seriesCountByLabelName"
        ) {
            setFocusLabel(query);
        }
        if (key == "seriesCountByFocusLabelValue") {
            setFocusLabel("");
        }
        // set Here the timeSeriesSelector values  setSearchParamsFromKeys(params);
    };

    const onFilter = (e: any, val: any) => {
        handleFilterClick(val.source, val.name);
    };





    function formatSeries(arr: any, data: any, key: string): SeriesRowProps[] {
        return arr.map((query: any) => ({
            name: query.name,
            value: query.value,
            share: calcPercent(query.value, data?.totalSeries),
            source: key,
            theme,
            onFilter,
        }));
    }

    const formattedSeries = (data: CardinalityResponse) => {
        if (data) {
            return Object.keys(data)
                ?.filter((f: any) => Array.isArray(data[f]))
                ?.map((key: string) => ({
                    [key]: formatSeries(data[key], data, key),
                }));
        }
        return [];
    };

    const { result, isLoading } = useCardinalityRequest();



    useEffect(() => {
        if (result) {
            setTotal({
                amount: result.totalSeries,
                prev: result.totalSeriesPrev,
                diff: result.totalSeries - result.totalSeriesPrev,
            });

            setData({
                data: result,
                formattedSeries: formattedSeries(result),
            });
        }
    }, [result]);

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Configurator
                theme={theme}
                total={data?.data.totalSeries}
                percent={35}
            />
            <div className={cx(resultsContainerStyles)}>
                {!isLoading &&
                    data?.formattedSeries?.map((series: any, key: number) => (
                        <SeriesGroup
                            key={key}
                            title={
                                sectionsTitles("metric")[Object.keys(series)[0]]
                            }
                            sectionHeader={tableHeaders[Object.keys(series)[0]]}
                            rows={series[Object.keys(series)[0]]}
                        />
                    ))}
            </div>
        </div>
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
