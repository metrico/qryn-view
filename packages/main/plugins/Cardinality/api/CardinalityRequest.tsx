import { CardinalityRequest } from "./types";
import useCardinalityStore from "../store/CardinalityStore";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../consts";

export const ConfiguratorBuilder = (
    server: string,
    reqState: CardinalityRequest
) => {
    const match = reqState.match
        ? `&match[]=${encodeURIComponent(reqState.match)}`
        : "";
    const focusLabel = reqState.focusLabel
        ? `&focusLabel=${encodeURIComponent(reqState.focusLabel)}`
        : "";
    return `${server}/ch/api/v1/status/tsdb?topN=${reqState.topN}&date=${reqState.date}${match}${focusLabel}`;
};

function serializeUserPassword(user: string, password: string) {
    return `${btoa(user)}${password && password !== "" ? ":" : ""}${btoa(
        password
    )}`;
}

export const defaultCardinalityStatus = {
    totalSeries: 0,
    totalSeriesPrev: 0,
    totalSeriesByAll: 0,
    totalLabelValuePairs: 0,

    seriesCountByMetricName: [],
    seriesCountByLabelName: [],
    seriesCountByFocusLabelValue: [],
    seriesCountByLabelValuePair: [],
    labelValueCountByLabelName: [],
};

const useDataSourceData = (type: string) => {
    const datasources = useSelector((store: any) => store.dataSources);

    let auth = ``;

    const {
        auth: authData,
        url,
        headers,
    } = datasources.find((f: any) => f.value === type);

    let reqHeaders = headers?.reduce(
        (obj, item) => Object.assign(obj, { [item.header]: item.value }),
        {}
    );

    const isAuth = authData.basicAuth.value;

    if (isAuth) {
        let [user, password] = authData.fields.basicAuth;
        let passwordValue = password.value;
        let userValue = user.value;

        auth = serializeUserPassword(userValue, passwordValue);
    }

    return { url, auth, headers: reqHeaders };
};

const useStoreParams = () => {
    const {
        timeSeriesSelector: match,
        focusLabel,
        limitEntries: topN,
        date,
    } = useCardinalityStore();
    return { match, focusLabel, topN, date };
};

export const useCardinalityRequest = (): {
    fetchurl?: string[];
    isLoading?: boolean;
    error?: any;
    result: any;
} => {
    const { match, focusLabel, topN, date } = useStoreParams();
    // const { url, auth, headers }  = useDataSourceData('metrics')
    //  should get auth / headers / url from params

    const { url, headers } = useDataSourceData("logs");

    const reqDate = date || dayjs().format(DATE_FORMAT);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [tsdbStatus, setTsdbStatus] = useState<any>({});

    const requestCardinality = async (url: string) => {
        const reqParams = { match, focusLabel, topN, date: reqDate };

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

                Object.keys(result).forEach((k) => {
                    const key = k;
                    const entries = result[key];
                    const prevEntries = prevResult[key];

                    if (Array.isArray(entries) && Array.isArray(prevEntries)) {
                        entries.forEach((entry) => {
                            const valuePrev = prevEntries.find(
                                (prevEntry) => prevEntry.name === entry.name
                            )?.value;
                            entry.diff = valuePrev
                                ? entry.value - valuePrev
                                : 0;
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

    useEffect(() => {
        requestCardinality(url);
    }, [url, match, focusLabel, topN, date]);

    useEffect(() => {
        if (error) {
            setTsdbStatus(defaultCardinalityStatus);
            setIsLoading(false);
        }
    }, [error]);

    return {
        isLoading,
        error,
        result: tsdbStatus,
    };
};
