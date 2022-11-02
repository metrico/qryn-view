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
    dataSourceId = ''

) {



    let dsSettings = {url:'', requestHeaders: {}, method: {value:''}, headers:[],auth:{method:{value:'GET'}},hasSettings:false}

    if(dataSourceId !== '') {

        const dataSourceSettings = store.getState()['dataSources']
        const dataSourceSetting = dataSourceSettings.find((f:any) => f.id === dataSourceId)
        if(dataSourceSetting && Object.keys(dataSourceSetting)?.length > 0) {
            
            dsSettings = {...dataSourceSettings.find((f:any) => f.id === dataSourceId), hasSettings:true }
        }
    // get ApiURL
      if(dsSettings?.headers?.length > 0 ) {
        let headerObj = {}
        for (let header of dsSettings.headers) {
            const Obj = {[String(header['header'])]:header['value']}
            headerObj = {...headerObj, ...Obj}
            

        }
       dsSettings['requestHeaders'] = headerObj || {}
      }

        
    }

   

   

    const { debugMode } = store.getState();
    const options = getQueryOptions(type, dsSettings.requestHeaders);
    const tSpan = getTimeSpan(queryInput);
    const params = getEndpointParams(type, queryInput, limit, tSpan, direction, (dsSettings.url || ''));
    const endpoint = getEndpoint(type, queryType)(params);

    return async function (dispatch: Function) {
        await resetParams(dispatch, panel);

        let cancelToken: any;

        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel("Cancelling the previous request");
        }

        cancelToken = axios.CancelToken.source();
        options.cancelToken = cancelToken.token;

        try {
            if (type === "flux") {
                await axios
                    ?.post(endpoint, queryInput, options)
                    ?.then((response) => {
                        processResponse(type, response, dispatch, panel, id, direction)
              
                    })
                    .catch((error) => {
                        resetNoData(dispatch);
                        console.log(error);
                        dispatch(setIsEmptyView(true));
                        dispatch(setLoading(false));
                        if (debugMode) {
                            console.log("Error loading flux data", error);
                        }
                    })
                    .finally(() => {
       
                        dispatch(setLoading(false));
                    });
            } else {
                await axios
                    ?.get(endpoint, options)
                    ?.then((response) => {
                        processResponse(
                            type,
                            response,
                            dispatch,
                            panel,
                            id,
                            direction
                        );
                    })
                    .catch((error) => {
                        resetNoData(dispatch);
                        dispatch(setIsEmptyView(true));
                        dispatch(setLoading(false));
                        if (debugMode)
                            console.log(
                                "getting an error from response: ",
                                error
                            );
                    })
                    .finally(() => {
                        dispatch(setLoading(false));
                    });
            }

            await axios
                ?.get(endpoint, options)
                ?.then((response) => {
                    processResponse(
                        type,
                        response,
                        dispatch,
                        panel,
                        id,
                        direction
                    );
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
        } catch (e) {
            console.log(e);
        }
    };
}
