import store from "../../store/store";
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
    customUrl: string
): QueryParams {
    // in here should add the apiUrl from settings

    const localStore = store.getState();
    const { apiUrl, isSplit } = localStore;
    const splitVal = isSplit ? 2 : 1;
    const wWidth = window.innerWidth;
    const { parsedTime, time } = getTimeParams(type);
    const url = settingUrl !== "" ? settingUrl : apiUrl;
    let stepCalc = 0;
    stepCalc = wWidth / Math.round(((wWidth / tSpan) * 10) / splitVal);

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

// export as function~
