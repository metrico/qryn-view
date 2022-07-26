import store from "../../store/store";
import { QueryParams } from "../types";
import getTimeParams from "./getTimeParams";

export function getEndpointParams(query:string,limit:number):QueryParams {
    const localStore = store.getState();
    const { step, apiUrl } = localStore;
    const { parsedTime, time } = getTimeParams();

    const url = apiUrl;
    const queryStep = `&step=${step || 120}`;
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
