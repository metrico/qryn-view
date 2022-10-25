import { QueryParams, QueryType } from "../types";

function getRangeEP(type: string, params: QueryParams): string {
    return (({
        queryUrl,
        encodedQuery,
        limit,
        parsedTime,
        queryStep,
        direction,
    }) =>
        type !== "flux"
            ? `${queryUrl}/query_range?query=${encodedQuery}&limit=${limit}${parsedTime}${queryStep}&direction=${direction}`
            : `${queryUrl}`)(params);
}

function getInstantEP(type: string, params: QueryParams): string {
    return (({ queryUrl, encodedQuery, limit, time, direction }) =>
        type !== "flux"
            ? `${queryUrl}/query?query=${encodedQuery}&limit=${limit}&time=${time}&direction=${direction}`
            : `${queryUrl}`)(params);
}

export function getEndpoint(type: string, queryType: QueryType) {
    return (params: QueryParams) =>
        ({
            range: getRangeEP(type, params),
            instant: getInstantEP(type, params),
        }[queryType]);
}
