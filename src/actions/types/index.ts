import { AxiosRequestHeaders, Method } from "axios";

export type QueryResultType = "streams" | "vector" | "matrix";

export type Endpoint = {
    instant: string;
    range: string;
};

export type QueryResult = {
    result: Array<any>;
    time?: number;
    debugMode?: boolean;
    queryType?: string;
    dispatch: Function;
    type: QueryResultType;
};

export type Message = {
    type: string;
    timestamp: number;
    text: string;
    tags: object;
    showTs: boolean;
    showLabels: boolean;
    id: string;
};

export type Stream = {
    values: [[number, string]];
    stream: object;
};

export type QueryOptions = {
    method: Method;
    headers: AxiosRequestHeaders;
    cancelToken?: any;
};

export type QueryType = "range" | "instant";

export type QueryParams = {
    queryUrl?: string;
    encodedQuery?: string;
    limit?: number | string;
    time?: number | string;
    parsedTime?: number | string;
    queryStep: number | string;
};
