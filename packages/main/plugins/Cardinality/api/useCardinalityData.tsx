import { useEffect, useState } from "react";
import { useCardinalityRequest } from "./CardinalityRequest";
import { defaultCardinalityStatus, queryUpdater } from "../helpers";
import useCardinalityStore from "../store/CardinalityStore";
import { CardinalityResponse } from "../types";
import { SeriesRowProps } from "../SeriesRow";


// This hook is used to fetch the data from the API and format it for the UI
export const useCardinalityData = () => {
    const {
        focusLabel,
        timeSeriesSelector: match,
        setFocusLabel,
        setTimeSeriesSelector,
        setTotal,
    } = useCardinalityStore();

    const { result, isLoading } = useCardinalityRequest(true);

    const [data, setData] = useState<any>({
        data: defaultCardinalityStatus,
        formattedSeries: [],
    });

    const handleFilterClick = (key: string, query: string) => {
        const value = queryUpdater[key]({ query, focusLabel, match });

        
        setTimeSeriesSelector(value);
        if (
            key === "labelValueCountByLabelName" ||
            key == "seriesCountByLabelName"
        ) {
            setFocusLabel(query);
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
            name: query.name,
            value: query.value,
            diff: query.diff,
            prev: query.valuePrev,
            share: calcPercent(query.value, data?.totalSeries),
            source: key,
            onFilter,
        }));
    }

    const formattedSeries = (data: CardinalityResponse) => {
        if (data) {
            const keys = Object.keys(data);
            const filteredKeys = keys.filter((f: any) => Array.isArray(data[f]));
            const mappedKeys = filteredKeys.map((key: string) => ({
                [key]: mapSeries(data[key], data, key),
            }));
            return mappedKeys;
        }
        return [];
    }



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

    return {
        data,
        totalSeries: data?.data?.totalSeries ?? 0,
        formattedSeries: data?.formattedSeries ?? [],
        isLoading,
    };
};
