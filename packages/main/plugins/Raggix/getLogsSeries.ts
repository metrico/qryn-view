import axios from "axios";


export const formatLogsString = (log: any) => {
    let entries = Object.entries(log);

    let labelsConverted = entries
        .map(([key, val]) => {
            return `${key}="${val}"`;
        })
        .join(", ");
    let result = `{${labelsConverted}}`;

    return result;

}

const getLabels = async (labelsUrl: string, config: any) => {
    try {
        let labelsData: any = await axios.get(labelsUrl, config);
        if (labelsData?.data?.data?.length > 0) {
            return labelsData.data.data;
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};

const getLogQueries = async (
    logLabels: any[],
    filterValues: any[],
    labelValuesUrl: any,
    config: any
) => {
    let logQueries:any = [];
    try {
        for (let item of logLabels) {
            /* Filter Metric labels out */
            if (item !== "" && !filterValues.includes(item)) {
                let values: any = await axios.get(labelValuesUrl(item), config);
                for (let val of values?.data?.data) {
                    logQueries.push(`{${item}="${val}"}`);
                }
            }
        }
        return logQueries;
    } catch (e) {
        console.log(e);
        return logQueries;
    }
};

const getLogs = async (
    logQueries: any[],
    logRequest: any,
    config: any
) => {
    let res: any = [];
    try {
        for (let query of logQueries) {
            let logs: any = await axios.get(logRequest(query), query);

            if (logs?.data?.data?.result?.length <= 0) {
                continue;
            }

            res = res.concat(logs?.data?.data?.result);
        }

        return res;
    } catch (e) {
        return res;
    }
};

const getLogsSeries = async (
    start: number,
    end: number,
    host: string,
    setLoading: any,
    config: any
) => {
    setLoading(() => true);
    let filterValues = [
        "__name__",
        "le",
        "server",
        "emitter",
        "client",
        "span_kind",
        "span_name",
        "status_code",
    ];
    let labelsUrl = `${host}/loki/api/v1/labels?start=${start * 1000000}&end=${end * 1000000
        }`;

    let labelValuesUrl = (label: string) =>
        `${host}/loki/api/v1/label/${label}/values?start=${start * 1000000
        }&end=${end * 1000000}`;

    let logRequest = (query: string) =>
        `${host}/loki/api/v1/query_range?query=${encodeURIComponent(
            query
        )}&start=${start * 1000000}&end=${end * 1000000}&limit=10`;

    let logQueries: any = [];

    let result: any = [];

    let logLabels: any[] = await getLabels(labelsUrl, config);

    if (logLabels?.length > 0) {
        logQueries = await getLogQueries(
            logLabels,
            filterValues,
            labelValuesUrl,
            config
        );
    }

    if (logQueries.length > 0) {
        result = await getLogs(logQueries, logRequest, config);
    }

    setLoading(() => false);

    return result;
};

export default getLogsSeries;
