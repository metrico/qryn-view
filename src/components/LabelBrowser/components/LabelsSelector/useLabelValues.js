import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

function getTimeParsed(time) {
    return time.getTime() + "000000";
}

const getUrlType = (api, type, label, start, end) =>
    ({
        metrics: `${api}/api/v1/label/${label}/values`,
        logs: `${api}/loki/api/v1/label/${label}/values?start=${start}&end=${end}`,
    }[type]);

export default function useLabelValues(id, label, start, end) {
    const dataSources = useSelector((store) => store.dataSources);

    const currentDataSource = useMemo(() => {
        return dataSources.find((f) => f.id === id);
    }, [dataSources, id]);

    const nanoStart = getTimeParsed(start);
    const nanoEnd = getTimeParsed(end);

    const controller = new AbortController();

    

    const [url, setUrl] = useState();

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
    }, [label, setUrl, currentDataSource]);


    const headers = useState({
        "Content-Type": "application/json",
    });

    const options = useMemo(
        () => ({
            signal: controller.signal,
            method: "GET",
            headers: headers,
        }),
        []
    );

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (currentDataSource.type !== "flux") {
            const apiRequest = async () => {
                setLoading(true);
                if (url !== "") {
                    try {
                        const req = await axios({ url }, options);
                        setResponse(req || []);
                    } catch (e) {
                        console.log(e);
                    }
                }

                setLoading(false);
            };

            apiRequest();
        }
    }, [options, url, currentDataSource]);

    return {
        response,
        controller: options.signal,
        loading,
    };
}
