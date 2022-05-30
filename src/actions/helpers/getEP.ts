import { QueryParams, QueryType } from "../types";

function getRangeEP(params: QueryParams): string {
    return (({ queryUrl, encodedQuery, limit, parsedTime, queryStep }) =>
        `${queryUrl}/query_range?query=${encodedQuery}&limit=${limit}${parsedTime}${queryStep}`)(
        params
    );
}

function getInstantEP(params: QueryParams): string {
    return (({ queryUrl, encodedQuery, limit, time }) =>
        `${queryUrl}/query?query=${encodedQuery}&limit=${limit}&time=${time}`)(
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
