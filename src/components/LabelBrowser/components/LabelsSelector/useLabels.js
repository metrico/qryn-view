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

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentDataSource.type !== "flux") {
            const options = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };

            const basicAuth = currentDataSource?.auth?.basicAuth.value;

            let labelHeaders = {};

            let auth = {};

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

            labelHeaders.options = options;

            const apiRequest = async () => {
                setLoading(true);
                try {
                    const req = await axios.get(url, labelHeaders);
                    setResponse(req || []);
                } catch (e) {
                    console.log("ERROR AT USELABELS");
                    console.log(e);
                }
                setLoading(false);
            };
            apiRequest();
        }
    }, [url, currentDataSource]);

    return {
        response,
        //  controller: options.controller,
        loading,
    };
}
