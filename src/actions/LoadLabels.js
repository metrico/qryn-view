import axios from "axios";
import { setLabels } from "./setLabels";
import setLoading from "./setLoading";
import { setApiError } from "./setApiError";

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
                    if (response?.data?.data === [])
                    if (response?.data?.data?.length > 0) {
                        const labels = response?.data?.data
                            .sort()
                            .map((label) => ({
                                name: label,
                                selected: false,
                                values: [],
                            }));
                        dispatch(setLabels(labels || []));
                        dispatch(setApiError(""));
                    }
                } else {
                    dispatch(setLoading(false));
                    dispatch(
                        setApiError("")
                    );
                    dispatch(setLabels([]));
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(setLoading(false));
                dispatch(setApiError(`Status: ${status}, ${message}`));
                dispatch(setLabels([]));
            });
    };
}
