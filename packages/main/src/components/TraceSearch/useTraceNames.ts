import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getHeaders } from "./helpers";

export function useTraceNames({ id }: any) {
    const dataSources = useSelector(({ dataSources }: any) => dataSources);

    const [traceNames, settraceNames] = useState <any>(
        { data: { tagValues: [] } }
    );

    const dataSource = useMemo(() => {
        return dataSources.find((f: any) => f.id === id);
    }, [dataSources, id]);

    // get the auth headers in here \

    useEffect(() => {
        if (
            dataSource.type === "traces" &&
            dataSource?.url &&
            dataSource?.url !== ""
        ) {
            const traceHeaders = getHeaders(dataSource);

            const url = `${dataSource.url}/api/search/tag/name/values`;
            const apiRequest = async () => {
                // setLoading(true);

                try {
                    const req = await axios.get(url, traceHeaders);
                    settraceNames(req || {});
                } catch (e) {
                    console.log("Error at loading Span Names", e);
                }
            };

            apiRequest();
        }
          
    }, []);

    return useMemo(() => {
        if (traceNames?.["data"]?.["tagValues"]) {
            return [{ name: "Search Span Name", value: "" , label:"Search Span Name"}].concat(
                traceNames["data"]["tagValues"].map((m) => ({
                    name: m,
                    value: m,
                    label:m
                }))
            );
        }
        return [{ name: "", value: "",label:"" }];
    }, [traceNames]);
}
