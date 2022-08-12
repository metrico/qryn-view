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
import {  QueryType } from "./types";

/**
 * 
 * @param queryInput  the expression text 
 * @param queryType  the query type: range / instant
 * @param limit  the query limit
 * @param panel  the panel side: left / right
 * @param id  the query ID
 * @returns void 
 */
export default function loadLogs(
    queryInput: string,
    queryType: QueryType,
    limit: number,
    panel: string,
    id: string
) {

    const { debugMode } = store.getState();
    const options = getQueryOptions();
    const params = getEndpointParams(queryInput, limit);
    const endpoint = getEndpoint(queryType)(params);

    return async function (dispatch: Function) {
        await resetParams(dispatch,panel);

        let cancelToken: any;

        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel("Cancelling the previous request");
        }

        cancelToken = axios.CancelToken.source();
        options.cancelToken = cancelToken.token;
        try{
            await axios
            ?.get(endpoint, options)
            ?.then((response) => {
                // the panel should be set inside processResponse
                processResponse(response, dispatch, panel, id);
            })
            .catch((error) => {
                resetNoData(dispatch);
                dispatch(setIsEmptyView(true));
                dispatch(setLoading(false));
                if (debugMode)
                    console.log("getting an error from response: ", error);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
        } catch(e) {
            console.log(e)
        }
    
    };
}
