import getTimeParams from "./getTimeParams";
import { QueryDirection, QueryResult } from "../types";
import store from "../../store/store";
import setIsEmptyView from "../setIsEmptyView";
import { parseResponse } from "./parseResponse";
import { resetNoData } from "./resetNoData";
import setResponseType from "../setResponseType";

export async function processResponse(
    type:string,
    response: any,
    dispatch: Function,
    panel: string,
    id: string,
    direction:QueryDirection
) {
    const { time } = getTimeParams(type);
    const { queryType, debugMode } = store.getState();
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
            direction
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
            direction
        };

        parseResponse(resultQuery);
    } else {
        resetNoData(dispatch);
    }
}
