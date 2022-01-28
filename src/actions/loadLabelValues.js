import { environment } from "../environment/env.dev";
import setLabelValues from "./setLabelValues";
import setLoading from "./setLoading";

export default function (label, labelList) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(setLoading(true));
            let options = {
                method: "GET",
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    origin: "http://localhost:3000",
                    "Access-Control-Allow-Headers":
                        "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                    "Content-Type": "application/json",
                },
            };
            const url = `${environment.apiUrl}/loki/api/v1/label/${label.name}/values`;
            fetch(url, options)
                .then((response) => {
                    if (
                        (response?.status >= 200 && response?.status < 300) ||
                        response?.status == "success"
                    ) {
                        return response;
                    } else {
                        var error = new Error(response?.statusText);
                        error.response = response;
                        throw error;
                    }
                })
                .then((labelValues) => {
                    return labelValues.json();
                })
                .then((json) => {
                    if (json.data) {
                        const values = json?.data?.map?.((value) => ({
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
                    }

                    dispatch(setLabelValues(json.data));
                    dispatch(setLoading(false));
                    resolve();
                })
                .catch((error) => {
                    dispatch(setLoading(false));
                    reject(error);
                });
        });
    };
}
