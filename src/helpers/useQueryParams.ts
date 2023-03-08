import { useLocation } from "react-router-dom";

const { useMemo, useEffect } = require("react");

export function useQueryParams() {
    const { hash } = useLocation();


    const paramsFromUrl = useMemo(() => {
        if (hash) {
            const searchParams = new URLSearchParams(hash.replace(/#/, ""));
            let memoParams: any = {};

            for (let [key, value] of searchParams.entries()) {
                memoParams[key] = value;
            }

            return memoParams;
        } else return {};
    }, [hash]);



    const leftParams = useMemo(() => {

        if (paramsFromUrl?.left) {
         
            try {
                return JSON.parse(decodeURIComponent(paramsFromUrl.left));
            } catch (e) {
                console.log(e);
                return [];
            }
        } else {
            return [];
        }
    }, [paramsFromUrl]);

    const rightParams = useMemo(() => {

        if (paramsFromUrl?.right) {
            try {
                return JSON.parse(decodeURIComponent(paramsFromUrl.right));
            } catch (e) {
                console.log(e);
                return [];
            }
        } else {
            return [];
        }
    }, [paramsFromUrl]);


    useEffect(()=>{
    
    },[leftParams,rightParams,hash])




    return { leftParams, rightParams };
}
