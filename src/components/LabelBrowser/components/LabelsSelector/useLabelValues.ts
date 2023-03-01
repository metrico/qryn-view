import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { getDsHeaders } from "../../../QueryBuilder/Operations/helpers";

function getTimeParsed(time: any) {
    return time.getTime() + "000000";
}

const getUrlType = (
    api: string,
    type: "metrics" | "logs",
    label: string,
    start: any,
    end: any
) =>
    ({
        metrics: `${api}/api/v1/label/${label}/values`,
        logs: `${api}/loki/api/v1/label/${label}/values?start=${start}&end=${end}`,
    }[type]);

export default function useLabelValues(
    id: any,
    label: any,
    start: any,
    end: any
) {
    const dataSources = useSelector((store: any) => store.dataSources);

    const currentDataSource = useMemo(() => {
        return dataSources.find((f: any) => f.id === id);
    }, [dataSources, id]);

    const basicAuth = currentDataSource?.auth?.basicAuth.value;

    let auth: any = {};

    let labelHeaders: any = {};

    if (basicAuth) {
        const authfields = currentDataSource?.auth?.fields?.basicAuth;

        for (let field of authfields) {
            if (field.name === "user") {
                auth.username = field.value;
            }
            if (field.name === "password") {
                auth.password = field.value;
            }
        }

        labelHeaders.auth = auth;
    }

    const nanoStart = getTimeParsed(start);
    const nanoEnd = getTimeParsed(end);

    const controller = new AbortController();

    const [url, setUrl]: any = useState();

    useEffect(() => {
        setUrl(
            getUrlType(
                currentDataSource.url,
                currentDataSource.type,
                label,
                nanoStart,
                nanoEnd
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [label, setUrl, currentDataSource]);
    const extraheaders = getDsHeaders(currentDataSource);
    const [headers] = useState({
        ...extraheaders,
        "Content-Type": "application/json",
    });

    const options = useMemo(
        () => ({
            signal: controller.signal,
            method: "GET",
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    labelHeaders.options = options;
    labelHeaders.headers = headers;
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentDataSource.type !== "flux" && label !== "") {
            const apiRequest = async () => {
                setLoading(true);
                if (url && url !== "") {
                    try {
                        const req: any = await axios.get(url, labelHeaders);
                        setResponse(req || []);
                    } catch (e) {
                        console.log(e);
                    }
                }

                setLoading(false);
            };

            apiRequest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDataSource, url, label]);

    return {
        response,
        controller: options.signal,
        loading,
    };
}
