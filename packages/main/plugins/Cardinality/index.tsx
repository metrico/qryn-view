import React, { useEffect, useState } from "react";
import { cx, css } from "@emotion/css";
import useTheme from "@ui/theme/useTheme";
import { Plugin } from "../types";
import { nanoid } from "nanoid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Configurator from "./Configurator";
import { SeriesRowProps } from "./SeriesRow";
import { SeriesGroup } from "./SeriesGroup";
import { CardinalityResponse } from "./types";
import { resultsContainerStyles, openCardinalityStyles } from "./styles";
import useCardinalityStore from "./store/CardinalityStore";
import { setIsCardinality } from "./store/setIsCardinality";
import { useCardinalityRequest } from "./api/CardinalityRequest";

const sectionsTitles = (str: string | null): Record<string, string> => ({
    seriesCountByMetricName: "Metric names with highest number of series",
    seriesCountByLabelName: " Labels with the highest number of series",
    seriesCountByFocusLabelValue: `Values for "${str}" label with the highest number of series`,
    seriesCountByLabelValuePair:
        "Label=value pairs with the highest number of series",
    labelValueCountByLabelName:
        "Labels with the highest number of unique values",
});

const tableHeaders: any = {
    seriesCountByMetricName: "Metric Name",
    seriesCountByLabelName: "Label name",
    seriesCountByFocusLabelValue: "Label value",
    seriesCountByLabelValuePair: "Label=value pair",
    labelValueCountByLabelName: "Label name",
};

import { defaultCardinalityStatus, queryUpdater } from "./helpers";
import { useDispatch, useSelector } from "react-redux";

const LoaderStyle = css`
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-left: 4px;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loader = () => {
    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
            }}
        >
            <div className={cx(LoaderStyle)}></div>
        </div>
    );
};

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

    const dispatch: any = useDispatch();

    const isCardinality = useSelector((store: any) => store.isCardinality);

    const theme = useTheme();

    const {
        setTotal,
        focusLabel,
        timeSeriesSelector: match,
        setFocusLabel,
        setTimeSeriesSelector,
    } = useCardinalityStore();

    // activates and deactivates view extras (timerange datasource etc)
    useEffect(() => {
        dispatch(setIsCardinality(true));
        return () => {
            dispatch(setIsCardinality(false));
        };
    }, []);

    // updates the focuslabel and actual query on clicking on a row value
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
            diff: query.diff,
            prev: query.valuePrev,
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

    const { result, isLoading } = useCardinalityRequest(true);

    // updated all data on result change
    // this should be submitted with execute query button

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
            <div
                className={cx(
                    resultsContainerStyles,
                    isCardinality && openCardinalityStyles
                )}
            >
                {!isLoading ? (
                    data?.formattedSeries?.map((series: any, key: number) => (
                        <SeriesGroup
                            key={key}
                            title={
                                sectionsTitles("metric")[Object.keys(series)[0]]
                            }
                            sectionHeader={tableHeaders[Object.keys(series)[0]]}
                            rows={series[Object.keys(series)[0]]}
                        />
                    ))
                ) : (
                    <Loader />
                )}
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
