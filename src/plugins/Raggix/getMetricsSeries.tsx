import axios from "axios";

const getMetricsLabels = async (
    host: string,
    start: number,
    end: number,
    options: any
) => {
    /* Get all labels */
    let metricLabels: any = [];
    let labelsData = await axios.get(
        `${host}/api/v1/label/__name__/values?start=${Math.floor(
            start / 1000
        )}&end=${Math.floor(end / 1000)}`,
        options
    );
    if (labelsData?.data?.data?.length > 0) {
        for (let val of labelsData.data.data) {
            metricLabels.push(`{__name__="${val}"}`);
        }
    }
    return metricLabels;
};

export const formatMetricString = (metric: any) => {
    let keys: any = Object.entries(metric);
    let prev: string = "";
    let str: any = "";
    let strArr: any = [];
    for (let [key, val] of keys) {
        if (key !== "__name__") {
            strArr.push(` ${key}="${val}"`)
        }
    }

    let labels: any = ""
    if (metric["__name__"]) {
        labels = strArr.join(",");
        prev = metric["__name__"]
    }
    str = `${prev}{${labels}}`;
    return str
}

const getMetricsResults = async (
    host: string,
    metricQueries: any[],
    start: number,
    end: number,
    options: any
) => {
    let result: any = [];
    for (let query of metricQueries) {
        let logs = await axios.get(
            `${host}/loki/api/v1/query_range?query=${query}&start=${start * 1000000
            }&end=${end * 1000000}&limit=10`,
            options
        );
        if (logs?.data?.data?.result?.length > 0) {
            result = result.concat(logs?.data?.data?.result);
        }
    }
    return result; 
}

const getMetricsSeries = async (
    host: string,
    start: number,
    end: number,
    options: any,
    setLoading: Function
) => {
    setLoading(true);
    let metricsLabels: any = [];
    let result: any;
    metricsLabels = await getMetricsLabels(host, start, end, options);
    if (metricsLabels?.length > 0) {
        result = await getMetricsResults(
            host,
            metricsLabels,
            start,
            end,
            options
        );
    }
    setLoading(false);
    return result;
};

export default getMetricsSeries;
