import { environment } from "../environment/env.dev";
import setLabels from "./setLabels";

// gets the labels from api
export default function () {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Origin", "http://localhost:3000");
            headers.append("Access-Control-Request-Method", "POST");
            //  headers.append('Access-Control-Allow-Origin','http://localhost:3000')
            const options = {
                method: "GET",
                headers:headers,
                mode: "cors",
            };

            fetch(`/loki/api/v1/labels`, options)
                .then((response) => {
    
                    if (
                        (response.status >= 200 && response.status < 300) ||
                        response.status === "success"
                    ) {
                        return response;
                    } else {
                        var error = new Error(response.statusText);
                        error.response = response;
                        throw error;
                    }
                })
                .then((response) => {
                    console.log(response.json)
                    return response.json();
                })
                .then((json) => {
                    console.log(json);
                    if (json.data.length > 0) {
                        const labels = json?.data.map((label) => ({
                            name: label,
                            selected: false,
                            loading: false,
                            values: [],
                            hidden: false,
                            facets: 0,
                        }));
                        labels && dispatch(setLabels(labels || []));
                    }

                    resolve();
                })
                .catch((e) => {
                    console.log(e);
                    reject();
                });
        });
    };
}
