import getMetricsSeries from "./getMetricsSeries";
import getLogsSeries from "./getLogsSeries";
import getTracesSeries from "./getTracesSeries";

const getLookupSeries = async (
    start: number,
    end: number,
    host: string,
    setLoading: Function,
    dataSourceType: string,
    config: any
) => {
    switch (dataSourceType) {
        case "logs":
            return await getLogsSeries(start, end, host, setLoading, config);
        case "metrics":
            return await getMetricsSeries(host, start, end, config, setLoading);
        case "traces":
                return await getTracesSeries(host, start, end, config, setLoading);
        default:
            return await getLogsSeries(start, end, host, setLoading, config);
    }
};

export default getLookupSeries;
