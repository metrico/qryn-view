import { useEffect } from "react";
import dayjs from "dayjs";
import moment from "moment";

import { DATE_FORMAT } from "../consts";

import {
    useDataSourceData,
    ConfiguratorBuilder,
    defaultCardinalityStatus,
} from "../helpers";
import { createAlert } from "@ui/store/actions";
import store from "@ui/store/store";
import useCardinalityStore from "../store/CardinalityStore";

export type CardinalityRequestResponse = {
    handleDelete?: (query: string, amount: number) => void;
    handleCardinalityRequest?: (params: any) => void;
    handleGetDeletedFingerprints?: () => void;
    result?: any;
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

export const getDeletedFingerprints = async (
    url,
    setError,
    setDeletedQueries,
    setIsLoading,
    headers,
    auth
) => {
    const deleteEndpoint = import.meta.env.VITE_API_DELETE_URL || url;

    try {
        setIsLoading(true);
        const urlDelete = deleteEndpoint + "/loki/api/v1/delete";
        const { u, p } = auth;
        await fetch(urlDelete, {
            method: "GET",
            headers: {
                ...headers,
                Authorization: `Basic ${btoa(u + ":" + p)}`,
            },
        }).then((response) => {
            if (
                (response && response?.status === 204) ||
                response?.status === 200
            ) {
                console.log(response);
            }
        });
    } catch (e) {
        console.log(e);
        setError(JSON.stringify(e));
    } finally {
    }
};

export const deleteFingerprints = async (
    url,
    query,
    amount,
    start,
    end,
    setError,
    setDeleteQueries,
    setIsLoading,
    headers,
    auth
) => {
    const deleteEndpoint = import.meta.env.VITE_API_DELETE_URL || url;

    try {
        // start and end should calculated according to current date in seconds
        setIsLoading(true);
        const { u, p } = auth;
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
                Authorization: `Basic ${btoa(u + ":" + p)}`,
            },
        }).then(async (response) => {
            if (
                (response && response?.status === 500) ||
                response?.status === 400
            ) {
                setError(response.statusText);
                setIsLoading(false);
                let error = await response.text();
                store.dispatch(
                    createAlert({
                        message: error,
                        type: "error",
                    })
                );
            }

            if (
                (response && response?.status === 204) ||
                response?.status === 200
            ) {
                setIsLoading(false);
                setError("");
                store.dispatch(
                    createAlert({
                        message: `Deleted ${amount} Fingerprints from ${query}`,
                        type: "success",
                    })
                );
            }
        });
    } catch (e) {
        setError(JSON.stringify(e));
        setIsLoading(false);
        setDeleteQueries((prev) => [...prev, query]);
        store.dispatch(
            createAlert({
                message: `${amount} Fingerprints from ${query} not deleted`,
                type: "error",
            })
        );
    } finally {
        setIsLoading(false);
    }
};

const requestCardinality = async (
    url: string,
    reqParams: RequestParams,
    setError: (error: string) => void,
    setIsLoading: (isLoading: boolean) => void,
    setTsdbStatus: (tsdbStatus: any) => void,
    headers: any,
    auth: { u: string; p: string }
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

    try {
        const { u, p } = auth;
        const responses = await Promise.all(
            urls.map((url) =>
                fetch(url, {
                    headers: {
                        ...headers,
                        Authorization: `Basic ${btoa(u + ":" + p)}`,
                    },
                })
            )
        ); // add headers and auth in here . make it with axios

        if (responses[0].status === 400 || responses[0].status === 500) {
            const res = await responses[0].text();

            setError(res);
            setIsLoading(false);
            store.dispatch(
                createAlert({
                    message: res,
                    type: "error",
                })
            );

            return;
        }

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
    const {
        timeSeriesSelector: match,
        focusLabel,
        limitEntries: topN,
        date,
        setDeletedQueries,
        setError,
        setIsLoading,
        setTsdbStatus,
        error,
    } = useCardinalityStore();

    const reqDate = date || dayjs().format(DATE_FORMAT);

    const reqParams = { match, focusLabel, topN, date: reqDate };

    const { url, headers, user_pass } = useDataSourceData("logs");

    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState("");
    // const [tsdbStatus, setTsdbStatus] = useState<any>({});

    const handleDelete = async (query, amount) => {
        const locale = moment.tz.guess(true);
        const hasTimeOffset = new Date(reqDate).getTimezoneOffset() < 0;

        const getDayToAdd = (hasOffset) => (hasOffset ? 1 : 0);

        const mDay = moment
            .tz(reqDate, DATE_FORMAT, locale)
            .add(getDayToAdd(hasTimeOffset), "day");
        const endDay = moment
            .tz(reqDate, DATE_FORMAT, locale)
            .add(getDayToAdd(hasTimeOffset), "day");
        const dayStart = mDay.clone().utc().startOf("day").unix();

        const dayEnd = endDay.clone().utc().endOf("day").unix();

        await deleteFingerprints(
            url,
            query,
            amount,
            dayStart,
            dayEnd,
            setError,
            setDeletedQueries,
            setIsLoading,
            headers,
            user_pass
        );
    };

    const handleGetDeletedFingerprints = async () => {
        await getDeletedFingerprints(
            url,
            setError,
            setDeletedQueries,
            setIsLoading,
            headers,
            user_pass
        );
    };

    const handleCardinalityRequest = async (params: any) => {
        const reqDate = date || dayjs().format(DATE_FORMAT);

        let reqParams = { match, focusLabel, topN, date: reqDate };
        if (params !== undefined) {
            reqParams = { ...reqParams, ...params };
        }

        await requestCardinality(
            url,
            reqParams,
            setError,
            setIsLoading,
            setTsdbStatus,
            headers,
            user_pass
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
                headers,
                user_pass
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
        handleDelete,
        handleGetDeletedFingerprints,
        handleCardinalityRequest,
    };
};
