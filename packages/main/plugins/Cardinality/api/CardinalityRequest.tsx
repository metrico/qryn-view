import { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";

import { DATE_FORMAT } from "../consts";

import {
    useStoreParams,
    useDataSourceData,
    ConfiguratorBuilder,
    defaultCardinalityStatus,
} from "../helpers";
import { createAlert } from "@ui/store/actions";
import store from "@ui/store/store";
export type CardinalityRequestResponse = {
    fetchurl?: string[];
    isLoading?: boolean;
    handleDelete?: (query: string, amount:number) => void;
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

export type deleteFingerprintsResponse = {
    status: number;
    error: string;
    success: boolean;
    message: string;
};

export const deleteFingerprints = async (
    url,
    query,
    amount,
    start,
    end,
    setError,
    setIsLoading,
    headers
) => {
    const deleteEndpoint = import.meta.env.VITE_API_DELETE_URL || url;

    const deleteFingerprint = async () => {
        try {
            // start and end should calculated according to current date in seconds
            setIsLoading(true);
            const urlDelete =
                deleteEndpoint +
                "/loki/api/v1/delete?query=" +
                encodeURIComponent(query) +
                "&start=" +
                start +
                "&end=" +
                end;

            await fetch(urlDelete, {
                method: "POST",
                headers: {
                    ...headers,
                },
            }).then((response) => {
                if (
                    (response && response?.status === 204) ||
                    response?.status === 200
                ) {
                    setIsLoading(false);
                    store.dispatch(
                        createAlert({
                            message: `Deleted ${amount} Fingerprints from ${query}`,
                            type: "success",
                        })
                    );

                return ({
                    status: response?.status || 200,
                    success: true,
                    error: "",
                    message: ` ${query} Fingerprints deleted`,
                });
            }

            });

        } catch (e) {
            console.log(e);
            setError(JSON.stringify(e));
            setIsLoading(false);

            store.dispatch(
                createAlert({
                    message: `${amount} Fingerprints from ${query} not deleted`,
                    type: "error",
                })
            );

           return ({
                status: 500,
                error: JSON.stringify(e),
                success: false,
                message: ` ${query} Fingerprints not deleted`,
            });
        }
    };

    return deleteFingerprint();
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

export const useCardinalityRequest = (
    isRequest = false
): CardinalityRequestResponse => {
    const { match, focusLabel, topN, date } = useStoreParams();
    const reqDate = date || dayjs().format(DATE_FORMAT);

    const reqParams = { match, focusLabel, topN, date: reqDate };

    const { url, headers } = useDataSourceData("logs");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");
    const [tsdbStatus, setTsdbStatus] = useState<any>({});

    const handleDelete = async (query, amount) => {
        const locale = moment.tz.guess(true);
        const mDay = moment.tz(reqDate, locale).add(1, "day");
        const endDay = moment.tz(reqDate, locale).add(2, "day");
        const dayStart = mDay.clone().utc().startOf("day").unix();
        const dayEnd = endDay.clone().utc().startOf("day").unix();

        const result = deleteFingerprints(
            url,
            query,
            amount,
            dayStart,
            dayEnd,
            setError,
            setIsLoading,
            headers
        );

    
        await result.then((res) => {
            console.log(res);
        });

        // if (result && result?.success) {

        //     dispatch(createAlert({ message: result.message, type: "success" }));

        //     requestCardinality(
        //         url,
        //         reqParams,
        //         setError,
        //         setIsLoading,
        //         setTsdbStatus,
        //         headers
        //     );
        // }

        // if (result && !result?.success) {

        //     setError(result.message);
        // }
    };

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
        if (isRequest) {
            requestCardinality(
                url,
                reqParams,
                setError,
                setIsLoading,
                setTsdbStatus,
                headers
            );
        }
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
