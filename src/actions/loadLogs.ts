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

export default function loadLogs() {

    const { queryType, debugMode } = store.getState();
    const options = getQueryOptions();
    const params = getEndpointParams();
    const endpoint = getEndpoint(queryType)(params);

    return async function (dispatch: Function) {
        
        await resetParams(dispatch);

        let cancelToken: any;

        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel("Cancelling the previous request");
        }

        cancelToken = axios.CancelToken.source();
        options.cancelToken = cancelToken.token;

        await axios
            ?.get(endpoint, options)
            ?.then((response) => {
                processResponse(response, dispatch);
            })
            .catch((error) => {
                resetNoData(dispatch);
                 dispatch(setIsEmptyView(true));
                if (debugMode)
                    console.log("getting an error from response: ", error);
      
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };
}
