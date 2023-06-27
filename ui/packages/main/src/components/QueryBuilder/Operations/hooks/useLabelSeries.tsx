import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    useCurrentDataSource,
    useTimeNano,
    useSeriesUrl,
    useSeries,
} from "../hooks";
import { UseLabelSeriesFn } from "../types";
import { getApiRequest } from "../helpers";
// gets labels from current label selection, matching series

export const useLabelSeries: UseLabelSeriesFn = (
    dataSourceId: string,
    label: string
) => {
    const { start, stop } = useSelector((store: any) => store);
    const dataSources = useSelector((store: any) => store.dataSources);
    const [res, setRes] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const currentDataSource = useCurrentDataSource(dataSources, dataSourceId);
    const timeStart = useTimeNano(start);
    const timeEnd = useTimeNano(stop);
    const url = useSeriesUrl(currentDataSource.url, label, timeStart, timeEnd);

    useEffect(() => {
        if (label !== "" && label !== "{}")
            getApiRequest(currentDataSource, url, setLoading, setRes);
    }, [url, currentDataSource, setLoading, setRes, label]);

    const labelSeries = useSeries(res);

    return { loading, labelSeries };
};
