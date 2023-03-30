function request<TResponse>(
    url: string,

    config: RequestInit = {}
): Promise<TResponse> {
    return fetch(url, config)
        .then((response) => response.json())
        .then((data) => data);
}

const getLabels = async (labelsUrl: string) => {
    try {
        let labelsData: any = await request(labelsUrl);
        if (labelsData?.data?.length > 0) {
            return labelsData.data;
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};

const getLogQueries = async (
    logLabels: any[],
    filterValues: any[],
    labelValuesUrl: Function
) => {
    let logQueries = [];
    try {
        for (let item of logLabels) {
            /* Filter Metric labels out */
            if (item !== "" && !filterValues.includes(item)) {
                let values: any = await request(labelValuesUrl(item));
                for (let val of values?.data) {
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

const getLogs = async (logQueries: any[], logRequest: Function) => {
    let res: any = [];
    try {
        for (let query of logQueries) {
            let logs: any = await request(logRequest(query));

            if (logs?.data?.result?.length <= 0) {
                continue;
            }

            res = res.concat(logs?.data?.result);
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
    setLoading: Function
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
    let labelsUrl = `${host}/loki/api/v1/labels?start=${start * 1000000}&end=${
        end * 1000000
    }`;

    let labelValuesUrl = (label: string) =>
        `${host}/loki/api/v1/label/${label}/values?start=${
            start * 1000000
        }&end=${end * 1000000}`;

    let logRequest = (query: string) =>
        `${host}/loki/api/v1/query_range?query=${encodeURIComponent(
            query
        )}&start=${start * 1000000}&end=${end * 1000000}&limit=10`;

    let logQueries: any = [];

    let result: any = [];

    let logLabels: any[] = await getLabels(labelsUrl);

    if (logLabels?.length > 0) {
        logQueries = await getLogQueries(
            logLabels,
            filterValues,
            labelValuesUrl
        );
    }

    if (logQueries.length > 0) {
        result = await getLogs(logQueries, logRequest);
    }

    setLoading(() => false);

    return result;
};

export default getLogsSeries;
