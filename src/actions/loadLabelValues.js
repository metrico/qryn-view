import axios from "axios";
import { errorHandler } from "./errorHandler";
import { setApiError } from "./setApiError";
import { setLabels } from "./setLabels";
import setLabelValues from "./setLabelValues";
import setLoading from "./setLoading";


export default function loadLabelValues(label, labelList, apiUrl) {
    if (!label || (label?.length <= 0 && label.lsList.length <= 0)) {
        return () => {};
    };

    const url = apiUrl;

    const origin = window.location.origin

    const headers = {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": ["Access-Control-Request-Headers", "Content-Type"],
        "Content-Type": "application/json",
    }

    const options = {
        method: "GET",
        headers: headers,
        mode: "cors",

    };

    return async (dispatch) => {
        dispatch(setLoading(true))

        await axios.get(`${url}/loki/api/v1/label/${label.name}/values`, options)
            ?.then(response => {
                if (response?.data?.data) {
                    const values = response?.data?.data?.map?.((value) => ({
                        name: value,
                        selected: false,
                        inverted: false
                    }));

                    const lsList = [...labelList];
                    lsList.forEach((l) => {
                        if (l?.name === label?.name) {
                            l.values = [...values];
                        }
                    });
                    console.log("labels changed from here")
                    dispatch(setLabels(lsList))
                } else if(!response) {
                    dispatch(setApiError('URL NOT FOUND'))
                    dispatch(setLabelValues([]))
                }

                dispatch(setLoading(false));
                dispatch(setApiError(''))
                dispatch(setLabelValues(response?.data?.data));

            }).catch(error => {
                dispatch(setLoading(false))
                const { message } = errorHandler(url, error,'lavelValues')
                dispatch(setApiError(message || 'API NOT FOUND'))
                dispatch(setLabelValues([]))
                console.error(error)
            })
    }


}
