import store  from "@ui/store/store";
import { QueryParams, QueryDirection, QueryType } from "../types";
import getTimeParams from "./getTimeParams";

export function getEndpointParams(
    type: string,
    query: string,
    limit: number,
    tSpan: number,
    direction: QueryDirection,
    settingUrl = "",
    queryType: QueryType,
    customUrl: string,
    customStep: number,
    id: string,
    panel: string
): QueryParams {
    const localStore = store.getState();
    const { isSplit } = localStore;
    const splitVal = isSplit ? 2 : 1;
    const wWidth = window.innerWidth;
    const { parsedTime, time } = getTimeParams(type, id, panel);
    const url = settingUrl;
    let stepCalc = 0;

    if (customStep > 0) {
        stepCalc = customStep;
    } else {
        stepCalc = wWidth / Math.round(((wWidth / tSpan) * 10) / splitVal);
    }

    if (stepCalc === 0) {
        stepCalc = 1;
    }

    const queryStep = `&step=${stepCalc}`;

    if (type === "traces") {
    }

    const encodedQuery = `${encodeURIComponent(query)}`;
    // traces api takes only an ID
    let queryUrl = "";
    switch (type) {
        case "logs":
            queryUrl = `${url}/loki/api/v1`;
            break;
        case "metrics":
            queryUrl = `${url}/api/v1`;
            break;
        case "flux":
            queryUrl = `${url}/api/v2/query`;
            break;
        case "traces":
            queryUrl =
                queryType === "trace-search"
                    ? `${customUrl}`
                    : `${url}/api/traces/${query}/json`;
            break;
        default:
            queryUrl = `${url}/loki/api/v1`;
    }

    return {
        queryUrl,
        encodedQuery,
        parsedTime,
        time,
        queryStep,
        limit,
        direction,
        queryType,
    };
}


