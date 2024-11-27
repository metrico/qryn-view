import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getHeaders } from "./helpers";
import moment from "moment";
export function useMetricsList(id: any, value: any, start, stop) {
    const dataSources = useSelector((store: any) => store.dataSources);

    const timeParams = useMemo(() => {
        return {
            start: (moment as any)(start).unix(),
            end: (moment as any)(stop).unix(),
        };
    }, [start, stop]);

    const [metricNames, setMetricNames] = useState([]);

    const dataSource = useMemo(() => {
        return dataSources.find((f: any) => f.id === id);
    }, [dataSources, id]);

    // get the auth headers in here \

    const valueFormatter = useMemo(() => {
        const val = encodeURIComponent(`{__name__="${value}"}`);
        const paren = "[]";
        const param = `match${encodeURIComponent(paren)}`;

        if (value) {
            return `${param}=${val}`;
        }
    }, [value]);

    useEffect(() => {
        if (
            dataSource.type === "metrics" &&
            dataSource?.url &&
            dataSource?.url !== "" &&
            value &&
            value !== ""
        ) {
            const metricsHeaders = getHeaders(dataSource);

            const url = `${dataSource.url}/api/v1/series?start=${timeParams.start}&end=${timeParams.end}&${valueFormatter}`;
            const apiRequest = async () => {
                try {
                    const req = await axios.get(url, {
                        ...metricsHeaders.options,
                    });
                    if (req?.status === 200) {
                        setMetricNames(req?.data?.data || []);
                    }
                } catch (e) {
                    console.log("Error at loading Span Names", e);
                }
            };

            apiRequest();
        }
    }, [dataSource, timeParams.end, timeParams.start, valueFormatter]);

    return useMemo(() => {
        if (metricNames?.length > 0) {
            const metricsCP = [...metricNames];
            let metricSelect: any = {};
            metricsCP.forEach((metric) => {
                const metricKeys = Object.keys(metric);
                metricKeys.forEach((metricKey: any) => {
                    if (
                        !metricSelect[metricKey]?.some(
                            (s: any) => s === metric[metricKey]
                        )
                    ) {
                        metricSelect[metricKey] = [
                            ...(metricSelect[metricKey] || []),
                            metric[metricKey],
                        ];
                    }
                });
            });

            return metricSelect;
        }
        return {};
    }, [metricNames]);
}
