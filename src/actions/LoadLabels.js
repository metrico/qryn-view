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

                    const labels = response?.data?.data.sort().map((label) => ({
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
            
                if( ((error.stack).includes('Invalid URL'))) {
                 
                    dispatch(setApiError('Invalid URL, Please adjust your API URL'));

                }
                else if(error?.response?.status === 404) {
                    dispatch(setApiError('API not found, please adjust API URL'));
                 

                
                } else {
                 
                    dispatch(setApiError('Error fetching labels from API'))
                
                }
             
            })
    }
}
