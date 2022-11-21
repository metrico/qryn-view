import { QueryOptions } from "../types";

export function getQueryOptions(type:string, headers:any):QueryOptions {

    // const queryMethod = method !== '' ? method : undefined
    const queryHeaders = Object.keys(headers)?.length > 0 ? headers : undefined

    if(type === 'flux') {
        return {
            method: "POST",
           
            headers: queryHeaders || {
                'Accept':'application/csv',
                'Content-type':'application/vnd.flux',
            }
        }
    }
    return {
        method:  "GET",
        headers: queryHeaders || {
            "Content-Type": "application/javascript",
        },
    };
}
