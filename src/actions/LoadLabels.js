import axios from "axios";
import { setLabels } from "./setLabels";
import setLoading from "./setLoading";
import { setApiError } from "./setApiError";
import { errorHandler } from "./errorHandler";
import { setLabelsBrowserOpen } from "./setLabelsBrowserOpen";

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
                        console.log("no labels found");
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
                        setApiError("API Not Found, Please adjust API URL")
                    );
                    dispatch(setLabelsBrowserOpen(true));
                    dispatch(setLabels([]));
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(setLoading(false));
                const { message, status } = errorHandler(url, error);
                dispatch(setApiError(`Status: ${status}, ${message}`));
                dispatch(setLabels([]));
            });
    };
}
