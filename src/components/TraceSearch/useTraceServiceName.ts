import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getHeaders } from "./helpers";

export function useTraceServiceName({ id }: any) {
    const dataSources = useSelector(({ dataSources }: any) => dataSources);
    const [serviceNames, setserviceNames] = useState(
        { data: { tagValues: [] } } || {}
    );
    const dataSource = useMemo(() => {
        return dataSources.find((f: any) => f.id === id);
    }, [dataSources, id]);

    useEffect(() => {
        if (
            dataSource.type === "traces" &&
            dataSource?.url &&
            dataSource?.url !== ""
        ) {
            const traceHeaders = getHeaders(dataSource);

            const url = `${dataSource.url}/api/search/tag/service.name/values`;
            const apiRequest = async () => {
                try {
                    const req = await axios.get(url, traceHeaders);
                    setserviceNames(req || []);
                } catch (e) {
                    console.log("Error at loading Service Names", e);
                }
            };

            apiRequest();
        }
    }, []);

    return useMemo(() => {
        if (serviceNames?.data?.tagValues) {
            return [{ name: "Select Service Name", value: "", label:"Select Service Name" }].concat(
                serviceNames.data.tagValues.map((m) => ({
                    name: m,
                    value: m,
                    label: m
                }))
            );
        }
        return [{ name: "", value: "" }];
    }, [serviceNames]);
}
