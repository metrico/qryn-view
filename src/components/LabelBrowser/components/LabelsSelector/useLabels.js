import { VolunteerActivismOutlined } from "@mui/icons-material";
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

export default function useLabels(id, dataSourceURL = "") {

    const { start, stop } = useSelector((store) => store);
    const dataSources = useSelector((store) => store.dataSources);

    const currentDataSource = useMemo(() => {
        const current = dataSources.find((f) => f.id === id);
        if (dataSourceURL !== "") {
            current.url = dataSourceURL;
        }

        return current;
    }, [id, dataSources]);

    const [type, setType] = useState(currentDataSource.type || "");

    useEffect(() => {
        setType(currentDataSource.type);
    }, [currentDataSource, setType]);

    let timeStart, timeEnd;

    timeStart = getTimestamp(start, type);
    timeEnd = getTimestamp(stop, type);

    const controller = new AbortController();

    const [url, setUrl] = useState(
        getUrlFromType(currentDataSource.url, type, timeStart, timeEnd)
    );

    useEffect(() => {
        setUrl(getUrlFromType(currentDataSource.url, type, timeStart, timeEnd));
    }, [setUrl, type, currentDataSource]);

    const headers = useState({
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
        if (currentDataSource.type !== "flux") {
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
        }
    }, [options, url, currentDataSource]);

    return {
        response,
        controller: options.controller,
        loading,
    };
}
