import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getHeaders } from "./helpers";

export function useTraceNames({ id }) {
    console.log(id);
    const dataSources = useSelector((store) => store.dataSources);

    const [traceNames, settraceNames] = useState(
        { data: { tagValues: [] } } || {}
    );

    const dataSource = useMemo(() => {
        return dataSources.find((f) => f.id === id);
    }, [dataSources, id]);
    console.log(dataSource);
    // get the auth headers in here \

    useEffect(() => {
        if (dataSource.type === "traces") {
            const traceHeaders = getHeaders(dataSource);

            // const encodedURI = encodeURIComponent(
            //     ' service.name="dummy-server"'
            // );
            // const url =
            //     `${dataSource.url}/api/search?tags=` +
            //     encodedURI +
            //     "&limit=20&start=1668965383&end=1669138183";
         const url = `${dataSource.url}/api/search/tag/name/values`
            const apiRequest = async () => {
               // setLoading(true);

                try {
                    const req = await axios.get(url, traceHeaders);
                    settraceNames(req || []);
                    console.log(req);
                } catch (e) {
                    console.log("Error at loading Span Names",e);
         
                }
           
            };

            apiRequest();
        }
    }, []);

    return useMemo(() => {
        
        if (traceNames?.["data"]?.["tagValues"]) {
            return traceNames["data"]["tagValues"].map((m) => ({
                name: m,
                value: m,
            }));
        }
        return [{ name: "", value: "" }];
    }, [traceNames]);
}

// service.name  => first row
// name => second row
//
// search?tags=%20service.name%3D%22handle%22%20name%3D%22connected%22&limit=20&start=1668965383&end=1669138183

//
