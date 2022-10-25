import { QueryOptions } from "../types";

export function getQueryOptions(type:string):QueryOptions {

    if(type === 'flux') {
        return {
            method:"POST",
           
            headers: {
                'Accept':'application/csv',
                'Content-type':'application/vnd.flux',
                "Access-Control-Allow-Origin": window.location.origin,
              

            }
        }
    }

    return {
        method: "GET",
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin": window.location.origin,
        },
    };
}
