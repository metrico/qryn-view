import axios from "axios";
import setLabels from "./setLabels";
import setLoading from "./setLoading";
import { setApiError } from "./setApiError";
export default function loadLabels(apiUrl) {

    const origin = window.location.origin;
    const url = apiUrl
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
                if(response?.data?.data === []) console.log('no labels found')
                if (response?.data?.data?.length > 0) {

                    const labels = response?.data?.data.map((label) => ({
                        name: label,
                        selected: false,
                        loading: false,
                        values: [],
                        hidden: false,
                        facets: 0,
                    }));

                    dispatch(setLabels(labels || []));
                    dispatch(setLoading(false))
                    dispatch(setApiError(''))
                }

            }).catch(error => {
                dispatch(setLoading(false))
                if(error.response) {
                    console.error(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.header)
                    dispatch(setApiError('Error fetching labels from API'))
                    dispatch(setLoading(false))
                } else if(error.request) {
                    console.error(error.request)
                    dispatch(setApiError('Error fetching labels from API'))
                    dispatch(setLoading(false))
                } else {
                    console.error('Error fetching API: ', error)
                    dispatch(setApiError('Error fetching labels from API'))
                    dispatch(setLoading(false))
                }
         
                dispatch(setApiError('Error fetching labels from API'))
                dispatch(setLoading(false))
            })
    }
}
