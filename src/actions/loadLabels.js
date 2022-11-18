import axios from "axios";
import { setLabels } from "./setLabels";
import { setApiError } from "./setApiError";
import { createAlert } from "./createAlert";
function getTimeParsed(time) {
    return time.getTime() + "000000";
}
export default function loadLabels(apiUrl, start, stop) {
    const origin = window.location.origin;
    const url = apiUrl;
    const headers = {
        "Content-Type": "application/json",
    };

    const options = {
        method: "GET",
        headers: headers,
        mode: "cors",
    };

    const nanoStart = getTimeParsed(start);
    const nanoEnd = getTimeParsed(stop);

    return function (dispatch) {
        axios
            .get(
                `${url.trim()}/loki/api/v1/label?start=${nanoStart}&end=${nanoEnd}`,
                options
            )
            ?.then((response) => {
                if (response) {
                    if (response?.data?.data?.length > 0) {
                        let labels = response?.data?.data?.sort();
                        if (labels) {
                            dispatch(setLabels(labels || []));
                            dispatch(setApiError(""));
                        }
                    } else {
                        dispatch(
                            createAlert({
                                type: "info",
                                message: "No labels available for this API",
                            })
                        );
                    }
                } else {
                    dispatch(setApiError(""));
                    dispatch(setLabels([]));
                }
            })
            .catch((error) => {
                dispatch(
                    createAlert({
                        type: "error",
                        message: "API NOT FOUND",
                    })
                );
                dispatch(setLabels([]));
            });
    };
}
