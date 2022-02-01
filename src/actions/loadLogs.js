import setLogs from "./setLogs";
import setLoading from "./setLoading";
import { environment } from "../environment/env.dev";
import axios from "axios";

export default function loadLogs(label, time, limit) {
    const [startTs, stopTs] = time;
    const origin = window.location.origin
    const parsedTime = "&start=" + startTs.getTime() + "000000" + "&end=" + stopTs.getTime() + "000000";
    const url = environment.apiUrl;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin": origin,

        }
    };

    const query = `${encodeURIComponent(label)}`;
    const getUrl = `${url}/loki/api/v1/query_range?query=${query}&limit=${limit}${parsedTime}&step=100`
    return function (dispatch) {
        dispatch(setLoading(true))
        axios.get(getUrl, options)
            ?.then(response => {
                if (response?.data?.data) {
                    let messages = [];

                    var data = response?.data?.data.result; // array

                    data.forEach((element) => {
                        element?.values?.forEach((log) => {
                            const [ts, text] = log;

                            messages.push({
                                timestamp: parseInt(ts / 1000000),
                                text,
                                tags: element.stream,
                                showTs: true,
                                showLabels: false,
                            });
                        });
                    });
                    var resp = { messages };

                    dispatch(setLogs(resp));
                    dispatch(setLoading(false));
                }
            }).catch(error => {
                dispatch(setLoading(false))
                console.log(error)
            })
    }
}
