import axios from "axios";
import { environment } from "../environment/env.dev";
import setLabels from "./setLabels";
import setLoading from "./setLoading";

export default function loadLabels() {

    const origin = window.location.origin;
    const url = environment.apiUrl
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
        
        axios.get(`${url}/loki/api/v1/labels`, options)
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
                    dispatch(setLoading(false))
                }

            }).catch(error => {
                console.log(error)
                dispatch(setLoading(false))
            })
    }
}
