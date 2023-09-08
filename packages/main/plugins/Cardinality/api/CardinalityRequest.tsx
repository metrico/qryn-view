import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../consts";

import {
    toTimeSeconds,
    timeMinusOneDay,
    useStoreParams,
    useDataSourceData,
    ConfiguratorBuilder,
    defaultCardinalityStatus,
} from "../helpers";

export type CardinalityRequestResponse = {
    fetchurl?: string[];
    isLoading?: boolean;
    handleDelete?: (name: string, source: string) => void;
    handleCardinalityRequest?: () => void;
    error?: any;
    result: any;
};

export type RequestParams = {
    match: string;
    focusLabel: string;
    topN: number;
    date: string;
};

const requestCardinality = async (
    url: string,

    reqParams: RequestParams,
    setError: (error: string) => void,
    setIsLoading: (isLoading: boolean) => void,
    setTsdbStatus: (tsdbStatus: any) => void,
    headers: any
) => {
    const { match } = reqParams;

    /// we should make the three requests in parallel
    // one for now, one for yesterday, one plain

    const totalParams = {
        date: reqParams.date,
        topN: 0,
        match: "",
        focusLabel: "",
    };

    const prevDayParams = {
        ...reqParams,
        date: dayjs(reqParams.date).subtract(1, "day").format(DATE_FORMAT),
    };

    const urlBase = ConfiguratorBuilder(url, reqParams);
    const urlPrev = ConfiguratorBuilder(url, prevDayParams);
    const urlTotal = ConfiguratorBuilder(url, totalParams);

    const urls = [urlBase, urlPrev, urlTotal];
    if (!url) return;
    setError("");
    setIsLoading(true);
    // set
    //this makes the multiple fetch requests
    try {
        const responses = await Promise.all(
            urls.map((url) => fetch(url, { headers }))
        ); // add headers and auth in here . make it with axios
        const [resp, respPrev, respTotals] = await Promise.all(
            responses.map((resp) => resp.json())
        );

        if (responses[0].ok) {
            const { data: dataTotal } = respTotals;
            const prevResult = { ...respPrev.data };
            const result = { ...resp.data };
            result.totalSeriesByAll = dataTotal?.totalSeries;
            result.totalSeriesPrev = prevResult?.totalSeries;

            const name = match?.replace(/[{}"]/g, "");
            result.seriesCountByLabelValuePair =
                result.seriesCountByLabelValuePair.filter(
                    (s) => s.name !== name
                );
            // this maps all the values to the previous day
            Object.keys(result).forEach((k) => {
                const key = k;
                const entries = result[key];
                const prevEntries = prevResult[key];

                if (Array.isArray(entries) && Array.isArray(prevEntries)) {
                    entries.forEach((entry) => {
                        const valuePrev = prevEntries.find(
                            (prevEntry) => prevEntry.name === entry.name
                        )?.value;
                        entry.diff = valuePrev ? entry.value - valuePrev : 0;
                        entry.valuePrev = valuePrev || 0;
                    });
                }
            });

            setTsdbStatus(result);
            setIsLoading(false);
        } else {
            setError(resp.error);
            setTsdbStatus(defaultCardinalityStatus);
        }
    } catch (e) {
        setIsLoading(false);
        if (e instanceof Error) setError(`${e.name}: ${e.message}`);
    }
};

// main function, manages the requests
export const useCardinalityRequest = (): CardinalityRequestResponse => {
    const { match, focusLabel, topN, date, timeRange } = useStoreParams();
    const reqDate = date || dayjs().format(DATE_FORMAT);

    const reqParams = { match, focusLabel, topN, date: reqDate };

    // const { url, auth, headers }  = useDataSourceData('metrics')
    //  should get auth / headers / url from params
    const { url, headers } = useDataSourceData("logs");

    const [range, setRange] = useState<any>(
        timeRange || {
            end: toTimeSeconds(new Date(date)),
            start: timeMinusOneDay(new Date(date)),
        }
    );

    useEffect(() => {
        setRange({
            end: toTimeSeconds(new Date(date)),
            start: timeMinusOneDay(new Date(date)),
        });
    }, [date]);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");
    const [tsdbStatus, setTsdbStatus] = useState<any>({});

    const handleDelete = (name, source) => {
        console.log(range, name, source);

        //  setTsdbStatus(defaultCardinalityStatus);
        // console.log("deleted", tsdbStatus);
    };
    // this should be submitted with execute query button
    const handleCardinalityRequest = () => {
        requestCardinality(
            url,
            reqParams,
            setError,
            setIsLoading,
            setTsdbStatus,
            headers
        );
    };

    useEffect(() => {
        requestCardinality(
            url,
            reqParams,
            setError,
            setIsLoading,
            setTsdbStatus,
            headers
        );
    }, [url, match, focusLabel, topN, date]);

    useEffect(() => {
        if (error) {
            setTsdbStatus(defaultCardinalityStatus);
            setIsLoading(false);
        }
    }, [error]);

    return {
        isLoading,
        handleDelete,
        handleCardinalityRequest,
        error,
        result: tsdbStatus,
    };
};
