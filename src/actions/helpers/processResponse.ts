import getTimeParams from "./getTimeParams";
import { QueryDirection, QueryResult, QueryType, TracesResult } from "../types";
import store from "../../store/store";
import setIsEmptyView from "../setIsEmptyView";
import { parseResponse } from "./parseResponse";
import { resetNoData } from "./resetNoData";
import setResponseType from "../setResponseType";
import { convertFlux } from "./convertFlux";
import { setLeftPanel } from "../setLeftPanel";
import { setRightPanel } from "../setRightPanel";

export function setPanelData(panel: string, data: any) {
    if (panel === "left") {
        return setLeftPanel(data);
    } else {
        return setRightPanel(data);
    }
}

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
                result: response.data.traces || [],
                raw:response.data,
                time,
                debugMode,
                dispatch,
                dsType: type,
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
                result: response?.data || [],
                raw: response?.data,
                time,
                debugMode,
                dispatch,
                type,
                dsType: type,
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
                    result: data.data || [],
                    raw:data?.data,
                    time,
                    debugMode,
                    queryType,
                    dispatch,
                    dsType:type,
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
            raw: '[]',
            time,
            debugMode,
            queryType,
            dispatch,
            type: "streams",
            dsType:type,
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
        const rtype = response?.data?.data?.resultType;
        let statsInfo = { hasStats: false, statsData: {} };
        if (
            response?.data?.data?.stats &&
            Object.keys(response?.data?.data?.stats)?.length > 0
        ) {
            statsInfo = {
                hasStats: true,
                statsData: { ...response?.data?.data?.stats },
            };
        }

        const actPanel = store.getState()[panel];

        const newPanel = actPanel?.map((m: any) => {
            if (m.id === id) {
                return {
                    ...m,
                    hasStats: statsInfo?.hasStats || false,
                    statsData: statsInfo?.statsData || {},
                };
            }
            return m;
        });
        dispatch(setPanelData(panel, newPanel));

        dispatch(setResponseType(type));

        const resultQuery: QueryResult = {
            result,
            raw:response?.data?.data,
            time,
            debugMode,
            queryType,
            dispatch,
            type:rtype,
            dsType: type,
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
