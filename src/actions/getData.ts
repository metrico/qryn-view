import axios from "axios";
import setLoading from "./setLoading";
import store from "../store/store";
import setIsEmptyView from "./setIsEmptyView";
import { getEndpoint } from "./helpers/getEP";
import { getQueryOptions } from "./helpers/getQueryOptions";
import { getEndpointParams } from "./helpers/getEndpointParams";
import { resetParams } from "./helpers/resetParams";
import { resetNoData } from "./helpers/resetNoData";
import { processResponse } from "./helpers/processResponse";
import { QueryType, QueryDirection } from "./types";
import { getTimeSpan } from "./helpers/getTimeSpan";
import { boscoSend } from "./helpers/boscoRequest";
import { setLeftPanel } from "./setLeftPanel";
import { setRightPanel } from "./setRightPanel";

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

function changeLoadingState(panel: any[], id: string, state: boolean) {
    return [...panel].map((m) => {
        if (m.id === id) {
            return { ...m, loading: state };
        } 
        return m
    });
}

export default function getData(
    type: string,
    queryInput: string,
    queryType: QueryType,
    limit: number,
    panel: string,
    id: string,
    direction: QueryDirection = "forward",
    dataSourceId = "",
    url = "",
    customStep = 0
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
    const panelData = store.getState()[panel]
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

    const loadingState = (dispatch:any, state:boolean) => {
        panelDispatch(panel,dispatch, changeLoadingState(panelData,id,state))
    } 

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
        customStep
    );

    const endpoint = getEndpoint(type, queryType, params);

    return async function (dispatch: Function) {
        await resetParams(dispatch, panel);
        dispatch(setLoading(true));
        loadingState(dispatch, true)
        let cancelToken: any;

        if (url === "") {
            loadingState(dispatch, false)
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
                        dispatch(setLoading(false));
                        if (debugMode) {
                            console.log("Error loading flux data", error);
                        }
                    })
                    .finally(() => {
                        dispatch(setLoading(false));
                        loadingState(dispatch, false)
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
                            queryType
                        );

                        if (debugMode) {
                            boscoSend(
                                { level: "info", id, type, direction },
                                id
                            );
                        }
                        loadingState(dispatch, false)
                    })
                    .catch((error) => {
                        resetNoData(dispatch);
                        dispatch(setIsEmptyView(true));
                        dispatch(setLoading(false));
                        loadingState(dispatch, false)
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
                        loadingState(dispatch, false)
                        dispatch(setLoading(false));
                    });
            }
        } catch (e) {
            loadingState(dispatch, false)
            console.log(e);
        }
    };
}
