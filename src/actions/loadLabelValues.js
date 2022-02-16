import axios from "axios";
import { errorHandler } from "./errorHandler";
import { setApiError } from "./setApiError";
import setLabels from "./setLabels";
import setLabelValues from "./setLabelValues";
import setLoading from "./setLoading";


export default function loadLaebelValues(label, labelList, apiUrl) {
    if (label?.length <= 0 && label.lsList.length <= 0) {
        return;
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

    return function (dispatch) {

        dispatch(setLoading(true))

        axios.get(`${url}/loki/api/v1/label/${label.name}/values`, options)
            ?.then(response => {
                if (response?.data?.data) {
                    const values = response?.data?.data?.map?.((value) => ({
                        name: value,
                        selected: false,
                        loading: false,
                        hidden: false,
                    }));

                    const lsList = [...labelList];
                    lsList.forEach((l) => {
                        if (l?.name === label?.name) {
                            l.values = [...values];
                        }
                    });
                    dispatch(setLabels(lsList))
                }

                dispatch(setLoading(false));
                dispatch(setApiError(''))
                dispatch(setLabelValues(response?.data?.data));



            }).catch(error => {
                dispatch(setLoading(false))
                const { message } = errorHandler(url, error)
                dispatch(setApiError(message))

                console.log(error)
            })
    }


}