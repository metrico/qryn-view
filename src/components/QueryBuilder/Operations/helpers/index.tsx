// this one should receive a callback with an event
import { SeriesResponse } from "../types";
import axios, { AxiosRequestConfig } from "axios";

const ACCEPT = "application/json";
const CONTENT_TYPE = "application/json";
const SERIES_ENDPOINT = "/loki/api/v1/series?match";
const METHOD = "GET";

export function getTimeParsed(time: Date) {
    return time.getTime() + "000000";
}

export function getHeaders(dataSource: any) {
    const options = {
        method: METHOD,
        headers: { "Content-Type": CONTENT_TYPE, Accept: ACCEPT },
    };

    const basicAuth = dataSource?.auth?.basicAuth.value;

    let reqHeaders: any = {};

    let auth: any = {};

    if (basicAuth) {
        const authfields = dataSource?.auth?.fields?.basicAuth;

        for (let field of authfields) {
            if (field.name === "user") {
                auth.username = field.value;
            }
            if (field.name === "password") {
                auth.password = field.value;
            }
        }

        reqHeaders.auth = auth;
    }

    reqHeaders.options = options;

    return reqHeaders;
}

// get the series request url
export const getSeriesUrl = (
    api: string,
    label: string, // this will be the {label=value} // match
    start: any,
    end: any
) =>
    `${api}${SERIES_ENDPOINT}${encodeURIComponent("[]")}=${encodeURIComponent(
        label
    )}&start=${start}&end=${end}`;

export const getAuthAndOptions = (currentDataSource: any) => {
    const options = {
        headers: { "Content-Type": "application/json" },
    };

    const basicAuth = currentDataSource?.auth?.basicAuth.value;

    let auth: any = {};

    if (basicAuth) {
        const authfields = currentDataSource?.auth?.fields?.basicAuth;

        for (let field of authfields) {
            if (field.name === "user") {
                auth.username = field.value;
            }
            if (field.name === "password") {
                auth.password = field.value;
            }
        }
    }

    return { basicAuth: auth, options };
};

export const apiRequest = async (
    url: string,
    options: any,
    basicAuth: any,
    setLoading: Function,
    setResponse: Function
) => {
    setLoading(true);
    try {
        const config: AxiosRequestConfig = {
            ...options,
            auth: basicAuth,
        };
        const req: SeriesResponse | any[] = await axios.get(url, config);
        if (req) {
            setResponse(req || []);
        }
    } catch (e) {
        console.error("Error fetching labels");
        console.error(e);
    }
    setLoading(false);
};

export async function getApiRequest(
    dataSource: { type: string; url: string },
    url: string,
    setLoading: Function,
    setResponse: Function
) {
    if (dataSource.url && dataSource.url !== "") {
        const { basicAuth, options } = getAuthAndOptions(dataSource);

        await apiRequest(url, options, basicAuth, setLoading, setResponse);
    }
}



export const getLabelsFromData = (data:[]) => Array.from(
    new Set(
        data.map((m: any) => Object.keys(m))?.flat()
    )
);



