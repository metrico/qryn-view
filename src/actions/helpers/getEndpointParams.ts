import store from "../../store/store";
import { QueryParams } from "../types";
import getTimeParams from "./getTimeParams";

export function getEndpointParams(
    query: string,
    limit: number,
    tSpan: number
): QueryParams {
    const localStore = store.getState();
    const { apiUrl, isSplit } = localStore;
    const splitVal = isSplit ? 2 : 1;
    const wWidth = window.innerWidth;
    const { parsedTime, time } = getTimeParams();
    const url = apiUrl;

    let stepCalc = 0;

    stepCalc = wWidth / Math.round(((wWidth / tSpan) * 10) / splitVal);

    const queryStep = `&step=${stepCalc}`;
    const encodedQuery = `${encodeURIComponent(query)}`;
    const queryUrl = `${url}/loki/api/v1`;
    return {
        queryUrl,
        encodedQuery,
        parsedTime,
        time,
        queryStep,
        limit,
    };
}

// export as function~
