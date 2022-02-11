

import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useQuery } from "./useQuery";

function UpdateParamsFromState() {


    const dispatch = useDispatch()
    const urlQueryParams = useQuery()

    const defaultQueryParams = [ // needs no parsing
        'limit', 'apiUrl', 'step',
    ]


        if (urlQueryParams.has("query")) {
            // update query
            const queryFromState = useSelector(store => store.query)
        
            urlQueryParams.set("query",encodeURIComponent(queryFromState))
            // update default queries : apiUrl, limit, step
            defaultQueryParams.forEach(param => {
                if (urlQueryParams.has(param)) {
                    const paramFromState = useSelector(store => store[param])
                    urlQueryParams.set(param, paramFromState)
    
                }
            })
            // update start time
            if (urlQueryParams.has("start")) {
                const startFromState = useSelector(store => store.start)
                const queryStart = startFromState.getTime() +"000000";
                urlQueryParams.set("start",queryStart)
    
            } 
            //update end time
            if (urlQueryParams.has("end")) {
                const endFromState = useSelector(store => store.stop)
                const queryEnd =  endFromState.getTime() +"000000"; 
                urlQueryParams.set("end",queryEnd)
    
            }
    
        }


}

export default UpdateParamsFromState;