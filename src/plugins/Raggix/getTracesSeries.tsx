import axios from "axios";

export const urlState = (
    searchValue: string,
    spanValue: string,
    min: number,
    max: number
) => ({
    searchName: searchValue || "",
    name: spanValue || "",
    tags: "",
    minDuration: Math.round(max / 1000),
    maxDuration: Math.round(min / 1000),
    limit: 10,
});

export const formatTracesString = (log: any) => {
    return JSON.stringify(log);
}


export function formatUrl(state: any) {
    const { searchName, name, minDuration, maxDuration, tags, limit } = state;
    let sn = "";

    if (searchName?.length > 0) {
        sn = ` service.name="${searchName}"`;
    }
    let t = "";
    if (tags?.length > 0) {
        t = ` ${tags}`;
    }

    let n = "";

    if (name?.length > 0) {
        n = ` name="${name}"`;
    }

    let min = "";

    if (minDuration > 0) {
        min = `&start=${String(minDuration)}`;
    }

    let max = "";

    if (maxDuration > 0) {
        max = `&end=${String(maxDuration)}`;
    }

    let lm = "";

    if (limit) {
        lm = `&limit=${limit}`;
    }

    let parsed = encodeURIComponent(`${t}${sn}${n}`);

    return `search?tags=${parsed}${lm}${min}${max}`;
}

export const getTraceServiceNames = async (host: string, config: any) => {
    let url = `${host}/api/search/tag/service.name/values`;
    let data: any = {};
    if (url && config) {
        data = await axios.get(url, config);
    }

    if (data?.data?.tagValues) {
        return data.data.tagValues;
    }
    return [];
};

export const getTracesNames = async (host: string, config: any) => {
    let response: any = [];
    let url = `${host}/api/search/tag/name/values`;
    const res = await axios(url, config);
    if (res?.data?.tagValues?.length > 0) {
        return res.data.tagValues;
    }
    return response;
};

export const getTraceResponse = async (
    host: string,
    start: number,
    stop: number,
    config: any,
    service: string,
    name: string
) => {
    let res: any = [];
    let reqObj = urlState(service, name, start, stop);
    let urlString = formatUrl(reqObj);

    if (host && urlString) {
        let url = `${host}/api/${urlString}`;
        let conf = { headers: { Accept: String(config.headers["Accept"]) } };
        let response = await axios.get(url, conf);

        if (response?.data?.traces.length > 0) {
            let mapped = response.data.traces.map((item: any) => {
                return [item.startTimeUnixNano, JSON.stringify(item)];
            });

            let first = response.data.traces[0];
            res = {
                stream: {
                    Service: first.rootServiceName,
                    Name: first.rootTraceName,
                },
                values: mapped,
            };
        }
    }

    return res;
};

export const getTracesList = async (
    host: string,
    start: number,
    stop: number,
    config: any,
    traceNames: any[],
    traceServiceNames: any[]
) => {
    let res: any = [];
    if (traceNames?.length > 0) {
        for (let service of traceServiceNames) {
            for (let name of traceNames) {
                let response = await getTraceResponse(
                    host,
                    start,
                    stop,
                    config,
                    service,
                    name
                );

                res = res.concat(response);
            }
        }
    }
    return res;
};

const getTracesSeries = async (
    host: string,
    end: number,
    start: number,
    config: any,
    setLoading: Function
) => {
    setLoading(true);
    let result: any = [];
    let traceNames: any = [];

    let traceServiceNames = await getTraceServiceNames(host, config);
    if (traceServiceNames?.length > 0) {
        traceNames = await getTracesNames(host, config);
    }

    if (traceNames?.length > 0) {
        let tl = await getTracesList(
            host,
            start,
            end,
            config,
            traceNames,
            traceServiceNames
        );
        if (tl?.length > 0) {
            result = tl;
        }
    }

    setLoading(false);
    return result;
};

// here we should return a response and the suggestions for the select 
//
export default getTracesSeries;
