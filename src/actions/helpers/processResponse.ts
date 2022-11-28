import getTimeParams from "./getTimeParams";
import { QueryDirection, QueryResult, QueryType, TracesResult } from "../types";
import store from "../../store/store";
import setIsEmptyView from "../setIsEmptyView";
import { parseResponse } from "./parseResponse";
import { resetNoData } from "./resetNoData";
import setResponseType from "../setResponseType";
import { convertFlux } from "./convertFlux";
export async function processResponse(
    type: string,
    response: any,
    dispatch: Function,
    panel: string,
    id: string,
    direction: QueryDirection,
    queryType: QueryType
) {
    const { time } = getTimeParams(type);
    const { debugMode } = store.getState();

    if (type === "traces") {
        if (
            queryType === "trace-search" &&
            response?.data?.traces?.length > 0
        ) {
            const resultQuery: TracesResult = {
                result: response.data.traces,
                time,
                debugMode,
                dispatch,
                type,
                panel,
                id,
                ts: Date.now(),
                queryType,
            };
            parseResponse(resultQuery);
        }

        if (response?.data?.resourceSpans?.length > 0) {
            const resultQuery: TracesResult = {
                result: response?.data,
                time,
                debugMode,
                dispatch,
                type,
                panel,
                id,
                ts: Date.now(),
                queryType,
            };
            parseResponse(resultQuery);
        }
    }
    if (type === "flux") {
        await convertFlux(response?.data).then((data) => {
            if (data?.data?.length > 0) {
                const resultQuery: QueryResult = {
                    result: data.data,
                    time,
                    debugMode,
                    queryType,
                    dispatch,
                    type,
                    panel,
                    id,
                    ts: Date.now(),
                    direction,
                };

                parseResponse(resultQuery);
            }
        });
    }

    if (response?.data?.streams?.length === 0) {
        const resultQuery: QueryResult = {
            result: [],
            time,
            debugMode,
            queryType,
            dispatch,
            type: "streams",
            panel,
            id,
            ts: Date.now(),
            direction,
        };

        parseResponse(resultQuery);
        dispatch(setIsEmptyView(true));
    }

    // empty response would respond as data.data = {streams:[]}
    if (response?.data?.data) {
        const result = response?.data?.data?.result;
        const type = response?.data?.data?.resultType;

        dispatch(setResponseType(type));

        const resultQuery: QueryResult = {
            result,
            time,
            debugMode,
            queryType,
            dispatch,
            type,
            panel,
            id,
            ts: Date.now(),
            direction,
        };

        parseResponse(resultQuery);
    } else {
        resetNoData(dispatch);
    }
}
