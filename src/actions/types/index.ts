import { AxiosRequestHeaders, Method } from "axios";

export type QueryResultType = "streams" | "vector" | "matrix" | "scalar" | "flux" | "traces";

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
    dsType: string;
    panel: string;
    id: string;
    ts: number;
    direction: QueryDirection;
    hasStats?: boolean;
    statsData?:any;
    raw?:any;

};

export type TracesResultType = {
    resourceSpans: Array<any>;
    result:Array<any>;
    length:any;
}

export type TracesResult = {
    result: TracesResultType;
    time?: number;
    debugMode?: boolean;
    dispatch: Function;
    type: QueryResultType;
    dsType:string;
    panel: string;
    id: string;
    ts: number;
    queryType?:QueryType;
    raw?:any;
};

export type Message = {
    type: string;
    timestamp: number;
    text: string;
    tags: object;
    isShowTs: boolean;
    showLabels: boolean;
    id: string;
};

export type Stream = {
    values: [[number, string]];
    stream: object;
};

export type QueryOptions = {
    method: Method;
    mode?:string;
    headers: AxiosRequestHeaders;
    cancelToken?: any;
};

export type QueryType = "range" | "instant" | "trace-search";
export type QueryDirection = "forward" | 'backwards'
export type QueryParams = {
    queryUrl?: string;
    encodedQuery?: string;
    limit?: number | string;
    time?: number | string;
    parsedTime?: number | string;
    queryStep: number | string;
    direction: QueryDirection;
    queryType: QueryType;
    customStep?:number;
};
