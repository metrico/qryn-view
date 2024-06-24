import { useMemo } from "react";
import { getSeriesUrl, getTimeParsed, getLabelsFromData } from "../helpers";
import { AxiosResponse } from "axios";

// format timestamp for Ns request start and end
export const useTimeNano = (stop: Date) => {
    return useMemo(() => {
        return getTimeParsed(stop);
    }, [stop]);
};

// get memoized url from current labels used inside query
export const useSeriesUrl = (
    url: string,
    label: string,
    start: string,
    end: string
) => {
    return useMemo(() => {
        return getSeriesUrl(url, label, start, end);
    }, [url, start, end, label]);
};

// find and use current datasource by id
export const useCurrentDataSource = (
    dataSources: any[],
    dataSourceId: string
) =>
    useMemo(() => {
        return dataSources.find((f: any) => f.id === dataSourceId);
    }, [dataSources, dataSourceId]);

// prepare series labels for the operations that need it
export const useSeries = (res: AxiosResponse) =>
    useMemo<string[]>(() => {
        if (
            res?.data?.data &&
            Array.isArray(res?.data?.data) &&
            res?.data?.data?.length > 0
        ) {
            return getLabelsFromData(res.data.data);
        } else {
            return [];
        }
    }, [res]);

// extract labels from operation id

export const useLabelsFromProps = (id: number, props: any) => {
    // we should pass labelOps
    return useMemo(() => {
        if (props?.labelOpts) {
            return props.labelOpts?.filter((f: any) => f !== "__name__") || [];
        }
        return [];
          
    }, [id, props]);
};
