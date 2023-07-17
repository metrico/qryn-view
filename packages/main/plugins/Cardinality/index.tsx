import React from "react";
import { css, cx } from "@emotion/css";
import useTheme from "@ui/theme/useTheme";
import { Plugin } from "../types";
import { nanoid } from "nanoid";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import Configurator from "./Configurator";
import { SeriesRowProps } from "./SeriesRow";
import { SeriesGroup } from "./SeriesGroup";
import { CardinalityResponse } from "./types";

import useCardinalityStore from "./store/CardinalityStore";
import { useSelector } from "react-redux";

const sectionsTitles = (str: string | null): Record<string, string> => ({
    seriesCountByMetricName: "Metric names with highest number of series",
    seriesCountByLabelName: " Labels with the highest number of series",
    seriesCountByFocusLabelValue: `Values for "${str}" label with the highest number of series`,
    seriesCountByLabelValuePair:
        "Label=value pairs with the highest number of series",
    labelValueCountByLabelName:
        "Labels with the highest number of unique values",
});

const calcPercent = (num: number, total: number) => {
    return (num * 100) / total;
};

// this one will show the summary of the cardinality items
const resultsContainerStyles = css`
    height: 500px;
    overflow-y: auto;
`;

export const CardinalityView = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Cardinality />
        </QueryClientProvider>
    );
};

export const Cardinality = () => {
    const theme = useTheme();
    const dataSources = useSelector((store:any)=> store.dataSources)

    console.log(dataSources)
    const { setTotal } = useCardinalityStore();
    const onFilter = (val: string) => {
        console.log(val);
    };

    function formatSeries(arr: any, data: any): SeriesRowProps[] {
        return arr.map((query: any) => ({
            name: query.name,
            value: query.value,
            share: calcPercent(query.value, data?.data.totalSeries),
            theme,
            onFilter,
        }));
    }

    const formattedSeries = (data: CardinalityResponse) => {
        if (data?.data) {
            return Object.keys(data?.data)
                ?.filter((f: any) => Array.isArray(data?.data[f]))
                ?.map((key: string) => ({
                    [key]: formatSeries(data?.data[key], data),
                }));
        }
        return [];
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            axios
                .get("http://localhost:5173/ch/api/v1/status/tsdb?topN=10", {
                    headers: { "X-Scope-OrgID": "0" },
                })
                .then((res) => {
                    setTotal(res?.data?.data?.totalSeries);
                    return {
                        data: res?.data,
                        formattedSeries: formattedSeries(res.data),
                    };
                }),
    });

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

// totlal: total series   / percentage from total when label selected
// percentage from total
