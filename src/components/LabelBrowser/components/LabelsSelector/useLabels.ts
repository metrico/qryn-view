import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

function getTimeParsed(time: any) {
    return time.getTime() + "000000";
}

function getTimeSec(time: any) {
    return Math.round(time.getTime() / 1000);
}

const getUrlFromType = (apiUrl: any, type: any, start: any, end: any) => {
    if (type === "metrics") {
        return `${apiUrl}/api/v1/labels`;
    } else {
        return `${apiUrl}/loki/api/v1/label?start=${start}&end=${end}`;
    }
};
const getTimestamp = (time: any, type: any): any => {
    return ({
        metrics: getTimeSec(time),
        logs: getTimeParsed(time),
    } as any)[type];
}

export default function useLabels(id: any, dataSourceURL = "") {
    const { start, stop }: any = useSelector((store) => store);
    const dataSources = useSelector((store: any) => store.dataSources);

    const currentDataSource = useMemo(() => {
        const current = dataSources.find((f: any) => f.id === id);
        if (dataSourceURL !== "") {
            current.url = dataSourceURL;
        }

        return current;
    }, [id, dataSources]);

    const [type, setType] = useState(currentDataSource.type || "");

    useEffect(() => {
        setType(currentDataSource.type);
    }, [currentDataSource, setType]);

    let timeStart: any;
    let timeEnd: any;

    timeStart = getTimestamp(start, type);
    timeEnd = getTimestamp(stop, type);

    const [url, setUrl] = useState(
        getUrlFromType(currentDataSource.url, type, timeStart, timeEnd)
    );

    useEffect(() => {
        setUrl(getUrlFromType(currentDataSource.url, type, timeStart, timeEnd));
    }, [setUrl, type, currentDataSource]);

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (
            currentDataSource.type !== "flux" &&
            currentDataSource.url &&
            currentDataSource.url !== ""
        ) {
            const options = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };

            const basicAuth = currentDataSource?.auth?.basicAuth.value;

            let labelHeaders: any = {};

            let auth: any = {};

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
                    const req: any = await axios.get(url, labelHeaders);
                    setResponse(req || []);
                } catch (e) {
                    console.log("Error fetching labels");
                    console.log(e);
                }
                setLoading(false);
            };
            apiRequest();
        }

        // if(!id) {
        //     return ()=> null
        // }
    }, [url, currentDataSource]);

    return {
        response,
        loading,
    };
}
