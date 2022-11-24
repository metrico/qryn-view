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

export default function getData(
    type: string,
    queryInput: string,
    queryType: QueryType,
    limit: number,
    panel: string,
    id: string,
    direction: QueryDirection = "forward",
    dataSourceId = "",
    url = ""
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
    );

    const endpoint = getEndpoint(type, queryType, params);

    return async function (dispatch: Function) {

        await resetParams(dispatch, panel);

        let cancelToken: any;

        if(url === '') return 

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
                            response,
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
                    })
                    .catch((error) => {
                        resetNoData(dispatch);
                        dispatch(setIsEmptyView(true));
                        dispatch(setLoading(false));
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
                        dispatch(setLoading(false));
                    });
            }
        } catch (e) {
            console.log(e);
        }
    };
}
