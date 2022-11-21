import axios from "axios";
import { errorHandler } from "./errorHandler";
import { setApiError } from "./setApiError";

export default function loadLabelValues(label, labelList='', url) {
    if (!label || (label?.length <= 0 && label.lsList.length <= 0)) {
        return () => {};
    }

   // const url = store.getState().apiUrl;
    const headers = {
        "Content-Type": "application/json",
    };

    const options = {
        method: "GET",
        headers: headers,
        mode: "cors",
    };


    return async (dispatch) => {
        await axios
            .get(`${url}/loki/api/v1/label/${label.name}/values`, options)
            ?.then((response) => {
                if (response?.data?.data) {
                    const values = response?.data?.data?.map?.((value) => ({
                        label: label.name,
                        name: value,
                        selected: false,
                        inverted: false,
                    }));

                    return values;
                } else if (!response) {
                    dispatch(setApiError("URL NOT FOUND"));

                    return [];
                }
                dispatch(setApiError(""));
                return response?.data?.data;
            })
            .catch((error) => {
                const { message } = errorHandler(url, error, "lavelValues");
                dispatch(setApiError(message || "API NOT FOUND"));

                console.log(error);
                return [];
            });
    };
}
