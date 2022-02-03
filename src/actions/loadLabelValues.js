import axios from "axios";
import { environment } from "../environment/env.dev";
import setLabelValues from "./setLabelValues";
import setLoading from "./setLoading";

export default function loadLaebelValues(label, labelList) {

    if (label?.length <= 0 && label.lsList.length <= 0) {
        console.log('Labels Error')
        return;
    };

    const url = environment.apiUrl;

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
                }

                dispatch(setLabelValues(response?.data?.data));
                dispatch(setLoading(false));
            }).catch(error => {
                dispatch(setLoading(false))
                console.log(error)
            })
    }


}