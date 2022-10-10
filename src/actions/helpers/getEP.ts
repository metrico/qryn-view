import { QueryParams, QueryType } from "../types";

function getRangeEP(params: QueryParams): string {
    return (({ queryUrl, encodedQuery, limit, parsedTime, queryStep, direction }) =>
        `${queryUrl}/query_range?query=${encodedQuery}&limit=${limit}${parsedTime}${queryStep}&direction=${direction}`)(
        params
    );
}

function getInstantEP(params: QueryParams): string {
    return (({ queryUrl, encodedQuery, limit, time, direction }) =>
        `${queryUrl}/query?query=${encodedQuery}&limit=${limit}&time=${time}&direction=${direction}`)(
        params
    );
}

export function getEndpoint(type: QueryType) {

    return (params: QueryParams) =>
        ({
            range: getRangeEP(params),
            instant: getInstantEP(params),
        }[type]);
}
