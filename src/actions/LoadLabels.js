import axios from "axios";
import { environment } from "../environment/env.dev";
import setLabels from "./setLabels";

export default function loadLabels() {
    console.log(window.location)
    const headers = {

        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Headers": ["Access-Control-Request-Headers", "Content-Type"],
        "Content-Type": "application/json",
    }

    const options = {
        method: "GET",
        headers: headers,
        mode: "cors",
    };
    return function (dispatch) {
        axios.get('http://localhost:3100/loki/api/v1/labels', options)
            ?.then((response) => {
                if (response?.data?.data?.length > 0) {
                    const labels = response?.data?.data.map((label) => ({
                        name: label,
                        selected: false,
                        loading: false,
                        values: [],
                        hidden: false,
                        facets: 0,
                    }));
                    labels && dispatch(setLabels(labels || []));
                }


            }).catch(error => {
                console.log(error)
            })
    }
}
