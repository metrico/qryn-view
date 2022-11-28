import { QueryParams, QueryType } from "../types";

function getEndpointWithParams(
    type: string,
    params: QueryParams,
    queryType: QueryType
): string {
    const {
        queryUrl,
        encodedQuery,
        limit,
        parsedTime,
        queryStep,
        direction,
        time,
    } = params;

    if (type === "metrics" || type === "logs") {
        if (queryType === "instant") {
            return `${queryUrl}/query?query=${encodedQuery}&limit=${limit}&time=${time}&direction=${direction}`;
        }

        return `${queryUrl}/query_range?query=${encodedQuery}&limit=${limit}${parsedTime}${queryStep}&direction=${direction}`;
    }
    if (type === "flux") {
        return `${queryUrl}`;
    }
    if (type === "traces") {
        if (queryType === "trace-search") {
            return `${queryUrl}${parsedTime}`;
        }
        return `${queryUrl}`;
    }

    return ``;
}

export function getEndpoint(
    type: string,
    queryType: QueryType,
    params: QueryParams
) {
    return getEndpointWithParams(type, params, queryType);
}
