import { QueryOptions } from "../types";

export function getQueryOptions():QueryOptions {
    return {
        method: "GET",
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin": window.location.origin,
        },
    };
}
