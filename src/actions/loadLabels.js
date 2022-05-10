import axios from "axios";
import { setLabels } from "./setLabels";
import setLoading from "./setLoading";
import { setApiError } from "./setApiError";
import { createAlert } from "./createAlert";


export default function loadLabels(apiUrl) {
    const origin = window.location.origin;
    const url = apiUrl;
    const headers = {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": [
            "Access-Control-Request-Headers",
            "Content-Type",
        ],
        "Content-Type": "application/json",
    };

    const options = {
        method: "GET",
        headers: headers,
        mode: "cors",
    };

    return function (dispatch) {
        axios
            .get(`${url.trim()}/loki/api/v1/labels`, options)
            ?.then((response) => {
                if (response) {
                    if (response?.data?.data?.length > 0) {
                        let labels = response?.data?.data
                            ?.sort()
                            ?.map((label) => ({
                                name: label,
                                selected: false,
                                values: [],
                            }));
                        if (labels) {
                            console.log("loding labels from loadLabels")
                            dispatch(setLabels(labels || []));
                            dispatch(setApiError(""));
                            dispatch(setLoading(false));
                        }
                    } else {
                        dispatch(createAlert({type:'info',message:'No labels available for this API'}))
                    }
                } else {
                    dispatch(setLoading(false));
                    
                    dispatch(setApiError(""));
                    dispatch(setLabels([]));
                
                }
            })
            .catch((error) => {
                dispatch(createAlert({
                    type:"error",
                    message:'API NOT FOUND'
                }))
                dispatch(setLoading(false));
                dispatch(setLabels([]));
            });
    };
}
