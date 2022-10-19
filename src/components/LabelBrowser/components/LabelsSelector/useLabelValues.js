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

export default function useLabelValues(type, label, start, end) {
    const nanoStart = getTimeParsed(start);
    const nanoEnd = getTimeParsed(end);

    const controller = new AbortController();

    const apiUrl = useSelector((store) => store.apiUrl);

    const [url, setUrl] = useState(
        getUrlType(apiUrl, type, label, nanoStart, nanoEnd)
    );

    useEffect(() => {
        setUrl(getUrlType(apiUrl, type, label, nanoStart, nanoEnd));
    }, [label, setUrl]);

    const origin = useState(window.location.origin);

    const headers = useState({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": [
            "Access-Control-Request-Headers",
            "Content-Type",
        ],
        "Content-Type": "application/json",
    });

    const options = useMemo(
        () => ({
            signal: controller.signal,
            method: "GET",
            headers: headers,
            mode: "cors",
        }),
        []
    );

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const apiRequest = async () => {
            setLoading(true);
            try {
                const req = await axios({ url }, options);
                setResponse(req || []);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };

        apiRequest();
    }, [options, url]);

    return {
        response,
        controller: options.signal,
        loading,
    };
}
