import { useEffect, useState } from "react";
import { defaultCardinalityStatus, queryUpdater } from "../helpers";
import useCardinalityStore from "../store/CardinalityStore";
import { CardinalityResponse } from "../types";
import { SeriesRowProps } from "../SeriesRow";

// This hook is used to fetch the data from the API and format it for the UI
export const useCardinalityData = (historyManager?, setHistoryItem?) => {
    const {
        focusLabel,
        timeSeriesSelector: match,
        setFocusLabel,
        setTimeSeriesSelector,
        setTotal,
        tsdbStatus: result,
        isLoading,
    } = useCardinalityStore();

    const [data, setData] = useState<any>({
        data: defaultCardinalityStatus,
        formattedSeries: [],
    });

    const handleFilterClick = (key: string, query: string) => {
        const value = queryUpdater[key]({ query, focusLabel, match });

        setTimeSeriesSelector(value);

        setHistoryItem("timeSeriesSelector", value);
        if (
            key === "labelValueCountByLabelName" ||
            key == "seriesCountByLabelName"
        ) {
            setFocusLabel(query);
            setHistoryItem("focusLabel", query);
        }
        if (key == "seriesCountByFocusLabelValue") {
            setFocusLabel("");
        }
    };

    const onFilter = (e: any, val: any) => {
        handleFilterClick(val.source, val.name);
    };

    const calcPercent = (num: number, total: number) => {
        return (num * 100) / total;
    };

    const mapSeries = (arr: SeriesRowProps[], data: any, key: string) => {
        return arr.map((query: SeriesRowProps) => ({
            name: query.name || "",
            value: query.value || 0,
            diff: query.diff || 0,
            prev: query.valuePrev || 0,
            share: calcPercent(query.value, data?.totalSeries) || 0,
            quota: data.quota,
            source: key,
            onFilter,
        }));
    };

    const formattedSeries = (data: CardinalityResponse["data"]) => {
        if (data) {
            let dataFormatted: CardinalityResponse["data"] = data;
            if (!dataFormatted?.quota) {
                dataFormatted.quota = 0;
            }
            const keys = Object.keys(dataFormatted);
            const filteredKeys = keys.filter((f: any) =>
                Array.isArray(dataFormatted[f])
            );
            const mappedKeys = filteredKeys.map((key: string) => ({
                [key]: mapSeries(dataFormatted[key], dataFormatted, key),
            }));

            return mappedKeys;
        }
        return [];
    };

    useEffect(() => {
        if (result) {
            setTotal({
                amount: result.totalSeries,
                prev: result.totalSeriesPrev,
                diff: result.totalSeries - result.totalSeriesPrev,
                quota: result?.quota || 0
            });

            setData({
                data: result,
                formattedSeries: formattedSeries(result),
            });
        }
    }, [result]);
    return {
        data,
        totalSeries: data?.data?.totalSeries ?? 0,
        formattedSeries: data?.formattedSeries ?? [],
        isLoading,
    };
};
