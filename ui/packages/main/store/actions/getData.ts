import axios from "axios";
import store  from "@ui/store/store";
import setIsEmptyView from "./setIsEmptyView";
import { getEndpoint } from "./helpers/getEP";
import { getQueryOptions } from "./helpers/getQueryOptions";
import { getEndpointParams } from "./helpers/getEndpointParams";
import { resetNoData } from "./helpers/resetNoData";
import { processResponse, resetTraceData } from "./helpers/processResponse";
import { QueryType, QueryDirection } from "./types";
import { getTimeSpan } from "./helpers/getTimeSpan";
import { boscoSend } from "./helpers/boscoRequest";
import { setLeftPanel } from "./setLeftPanel";
import { setRightPanel } from "./setRightPanel";
import { DataViews } from "../store.model";
import { setLeftDataView } from "./setLeftDataView";
import { setRightDataView } from "./setRightDataView";

/**
 *
 * @param queryInput  the expression text
 * @param queryType  the query type: range / instant
 * @param limit  the query limit
 * @param panel  the panel side: left / right
 * @param id  the query ID
 * @returns void
 */

// this one should load logs and metrics data
// just change endpoint

function panelDispatch(panel: string, dispatch: Function, data: any) {
    if (panel === "left") {
        return dispatch(setLeftPanel(data));
    }

    if (panel === "right") {
        return dispatch(setRightPanel(data));
    }
}
export function dataViewDispatch(
    panel: string,
    dataViews: DataViews,
    dispatch: Function
) {
    if (panel === "left") {
        return dispatch(setLeftDataView(dataViews));
    }
    return dispatch(setRightDataView(dataViews));
}
function changeLoadingState(panel: any[], id: string, state: boolean) {
    return [...panel].map((m) => {
        if (m.id === id) {
            return { ...m, loading: state || false };
        }
        return m;
    });
}

export default function getData(
    type: string,
    queryInput: string,
    queryType: QueryType,
    limit: number,
    panel: string,
    id: string,
    direction: QueryDirection = "backwards",
    dataSourceId = "",
    url = "",
    customStep = 0,
    isLogsVolume = false
) {
    let dsSettings = {
        url: "",
        requestHeaders: {},
        method: { value: "" },
        headers: [],
        auth: {
            method: { value: "GET" },
            basicAuth: { value: true },
            fields: {
                basicAuth: [
                    { name: "user", value: "" },
                    { name: "password", value: "" },
                ],
            },
        },
        hasSettings: false,
    };

    let user = "";
    let pass = "";
    if (dataSourceId !== "") {
        const dataSourceSettings = store.getState()["dataSources"];
        const dataSourceSetting = dataSourceSettings.find(
            (f: any) => f.id === dataSourceId
        );
        if (dataSourceSetting && Object.keys(dataSourceSetting)?.length > 0) {
            const actDatasource = dataSourceSettings.find(
                (f: any) => f.id === dataSourceId
            );
            const url =
                dsSettings.url !== "" ? dsSettings.url : actDatasource.url;
            dsSettings = {
                ...actDatasource,
                url,
                hasSettings: true,
            };
        }

        if (dsSettings?.headers?.length > 0) {
            let headerObj = {};
            for (let header of dsSettings.headers) {
                const Obj = { [String(header["header"])]: header["value"] };
                headerObj = { ...headerObj, ...Obj };
            }
            dsSettings["requestHeaders"] = headerObj || {};
        }

        if (!!dsSettings?.auth?.basicAuth?.value) {
            const reqHeaders = dsSettings?.auth?.fields?.basicAuth;

            let auth = { username: "", password: "" };

            for (let header of reqHeaders) {
                if (header?.name === "user") {
                    // str += `${header?.value}:`;
                    auth.username = header.value;
                    user = header.value;
                }

                if (header?.name === "password") {
                    // str += header?.value;
                    auth.password = header.value;
                    pass = header.value;
                }
            }

            dsSettings["requestHeaders"] = {
                ...dsSettings["requestHeaders"],
            };
        }
    }
    const loadingState = (dispatch: any, state: boolean) => {
        const pData = store.getState()[panel];

        panelDispatch(panel, dispatch, changeLoadingState(pData, id, state));
    };

    const { debugMode } = store.getState();
    const options = getQueryOptions(type, dsSettings.requestHeaders);
    const tSpan = getTimeSpan(queryInput);
    const params = getEndpointParams(
        type,
        queryInput,
        limit,
        tSpan,
        direction,
        dsSettings.url || "",
        queryType,
        url,
        customStep,
        id,
        panel
    );

    const endpoint = getEndpoint(type, queryType, params);
    const setLoading = (state: boolean, dispatch: Function) => {
        const dataViews: DataViews = store.getState()?.[`${panel}DataView`];
        const dataView = dataViews?.find((view) => view.id === id);
        if (dataView) {
            dataView.loading = state;
        }
        dataViewDispatch(panel, dataViews, dispatch);
    };
    return async function (dispatch: Function) {
        setLoading(true, dispatch);
        loadingState(dispatch, true);
        let cancelToken: any;

        if (url === "") {
            if (queryType === "trace-search") {
                resetTraceData(type, dispatch, panel, id, direction, queryType);
            }
            loadingState(dispatch, false);
            return;
        }

        if (queryInput === "" && queryType !== "trace-search") {
            if (type === "traces") {
                resetTraceData(type, dispatch, panel, id, direction, queryType);
            }
            loadingState(dispatch, false);
            return;
        }

        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel("Cancelling the previous request");
        }

        cancelToken = axios.CancelToken.source();
        options.cancelToken = cancelToken.token;

        try {
            if (options?.method === "POST") {
                await axios
                    ?.post(endpoint, queryInput, options)
                    ?.then((response) => {
                        processResponse(
                            type,
                            response,
                            dispatch,
                            panel,
                            id,
                            direction,
                            queryType
                        );
                    })
                    .catch((error) => {
                        resetNoData(dispatch);
                        dispatch(setIsEmptyView(true));
                        setLoading(false, dispatch);
                        if (debugMode) {
                            console.log("Error loading flux data", error);
                        }
                    })
                    .finally(() => {
                        setLoading(false, dispatch);
                        loadingState(dispatch, false);
                    });
            } else if (options?.method === "GET") {
                await axios
                    ?.get(endpoint, {
                        auth: { username: user, password: pass },
                        ...options,
                    })
                    ?.then((response) => {
                        processResponse(
                            type,
                            response || { data: { data: [] } },
                            dispatch,
                            panel,
                            id,
                            direction,
                            queryType,
                            isLogsVolume
                        );

                        if (debugMode) {
                            boscoSend(
                                { level: "info", id, type, direction },
                                id
                            );
                        }
                        loadingState(dispatch, false);
                    })
                    .catch((error) => {
                        resetNoData(dispatch);
                        dispatch(setIsEmptyView(true));
                        setLoading(false, dispatch);
                        loadingState(dispatch, false);
                        if (debugMode) {
                            boscoSend(
                                { level: "error", id, type, direction },
                                id
                            );

                            console.log(
                                "getting an error from response: ",
                                error
                            );
                        }
                    })
                    .finally(() => {
                        loadingState(dispatch, false);
                        setLoading(false, dispatch);
                    });
            }
        } catch (e) {
            loadingState(dispatch, false);
            console.log(e);
        }
    };
}
