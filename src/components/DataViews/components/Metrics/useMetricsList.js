
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getHeaders } from "./helpers";
import * as moment from "moment";
export function useMetricsList(id, value) {
    const dataSources = useSelector((store) => store.dataSources);
    const start = useSelector((store) => store.start);
    const stop = useSelector((store) => store.stop);

    const timeParams = useMemo(() => {
        return {
            start: moment(start).unix(),
            end: moment(stop).unix(),
        };
    }, [start, stop]);

    const [metricNames, setMetricNames] = useState([]);

    const dataSource = useMemo(() => {
        return dataSources.find((f) => f.id === id);
    }, [dataSources, id]);

    // get the auth headers in here \


    useEffect(() => {
        if (
            dataSource.type === "metrics" &&
            dataSource?.url &&
            dataSource?.url !== ""
        ) {
            const metricsHeaders = getHeaders(dataSource);

            const url = `${dataSource.url}/api/v1/label/__name__/values?start=${timeParams.start}&end=${timeParams.end}`;
            console.log(url);
            const apiRequest = async () => {
                // setLoading(true);

                try {
                    const req = await axios.get(url, metricsHeaders);
                    console.log(req);
                    if (req?.status === 200) {
                        setMetricNames(req?.data?.data || []);
                    }
                } catch (e) {
                    console.log("Error at loading Span Names", e);
                }
            };

            apiRequest();
        }
    }, []);

    return useMemo(() => {
        if (metricNames?.length > 0) {
            return metricNames.map((val) => ({
                name: val,
                value: val,
            }));
        }
        return [{ name: "", value: "" }];
    }, [metricNames]);
}

// /api/v1/series?start=1669714367&end=1669714594&match%5B%5D=%7B__name__%3D%22go_goroutines%22%7D

// api/v1/label/__name__/values?start=1669710347&end=1669713947

// api/v1/series?start=1669710361&end=1669713961&match%5B%5D=%7B__name__%3D%22go_gc_duration_seconds_sum%22%7D

//}

// api/v1/label/__name__/values?start=1669710347&end=1669713947

// api/v1/series?start=1669710361&end=1669713961&match%5B%5D=%7B__name__%3D%22go_gc_duration_seconds_sum%22%7D

// api/v1/series?start=1669713812&end=1669714704&match%5B%5D=%7Bhomer%3D%22http%3A%2F%2Fheplify-server%3A9096%2Fmetrics%22%7D
