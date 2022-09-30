import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

function getTimeParsed(time) {
    return time.getTime() + "000000";
}

function getTimeSec(time) {
    return Math.round(time.getTime() / 1000);
}

const getUrlFromType = (apiUrl, type, start, end) => {
    if (type === "metrics") {
        return `${apiUrl}/api/v1/labels`;
    } else {
        return `${apiUrl}/loki/api/v1/label?start=${start}&end=${end}`;
    }
};
const getTimestamp = (time, type) =>
    ({
        metrics: getTimeSec(time),
        logs: getTimeParsed(time),
    }[type]);
export default function useLabels(type) {
    const { start, stop, apiUrl } = useSelector((store) => store);

    let timeStart, timeEnd;

    timeStart = getTimestamp(start, type);
    timeEnd = getTimestamp(stop, type);

    const controller = new AbortController();

    const [url, setUrl] = useState(
        getUrlFromType(apiUrl, type, timeStart, timeEnd)
    );

    useEffect(() => {
        setUrl(getUrlFromType(apiUrl, type, timeStart, timeEnd));
    }, [setUrl, type]);

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
        controller: options.controller,
        loading,
    };
}
