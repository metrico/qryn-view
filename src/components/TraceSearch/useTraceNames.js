import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getHeaders } from "./helpers";

export function useTraceNames({ id }) {
    const dataSources = useSelector((store) => store.dataSources);

    const [traceNames, settraceNames] = useState(
        { data: { tagValues: [] } } || {}
    );

    const dataSource = useMemo(() => {
        return dataSources.find((f) => f.id === id);
    }, [dataSources, id]);
   
    // get the auth headers in here \

    useEffect(() => {
        if (dataSource.type === "traces") {
            const traceHeaders = getHeaders(dataSource);

         const url = `${dataSource.url}/api/search/tag/name/values`
            const apiRequest = async () => {
               // setLoading(true);

                try {
                    const req = await axios.get(url, traceHeaders);
                    settraceNames(req || []);
                } catch (e) {
                    console.log("Error at loading Span Names",e);
         
                }
           
            };

            apiRequest();
        }
    }, []);

    return useMemo(() => {
        
        if (traceNames?.["data"]?.["tagValues"]) {

            return [{name:'Search Span Name',value:''}].concat(traceNames["data"]["tagValues"].map((m) => ({
                name: m,
                value: m,
            })));
        }
        return [{ name: "", value: "" }];
    }, [traceNames]);
}
