import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getHeaders } from "./helpers";
import * as moment from "moment";
export function useMetricsList(id: any, value: any) {

    
    const dataSources = useSelector((store: any) => store.dataSources);
    const start = useSelector((store: any) => store.start);
    const stop = useSelector((store: any) => store.stop);

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
            dataSource?.url !== ""&&
            value && value !== ''

        ) {
            const metricsHeaders = getHeaders(dataSource);

            const url = `${dataSource.url}/api/v1/series?start=${timeParams.start}&end=${timeParams.end}&${valueFormatter}`;
            const apiRequest = async () => {
                try {
                    const req = await axios.get(url, metricsHeaders);
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

// /api/v1/series?start=1669714367&end=1669714594&match%5B%5D=%7B__name__%3D%22go_goroutines%22%7D

// api/v1/label/__name__/values?start=1669710347&end=1669713947

// https://view-oss-demo.qryn.dev/api/v1/series?start=1669710361&end=1669713961&match%5B%5D=%7B__name__%3D%22go_gc_duration_seconds_sum%22%7D

//}

// api/v1/label/__name__/values?start=1669710347&end=1669713947

// api/v1/series?start=1669710361&end=1669713961&match%5B%5D=%7B__name__%3D%22go_gc_duration_seconds_sum%22%7D

// api/v1/series?start=1669713812&end=1669714704&match%5B%5D=%7Bhomer%3D%22http%3A%2F%2Fheplify-server%3A9096%2Fmetrics%22%7D
