import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

function getTimeParsed(time) {
    return time.getTime() + "000000";
}

export default function useLabels() {
    const {start,stop,apiUrl} = useSelector(store =>store)
    const nanoStart = getTimeParsed(start);
    const nanoEnd = getTimeParsed(stop);

    const controller = new AbortController();

    const [url,setUrl] = useState(`${apiUrl}/loki/api/v1/label?start=${nanoStart}&end=${nanoEnd}`);
    
    useEffect(() => {
        setUrl(`${apiUrl}/loki/api/v1/label?start=${nanoStart}&end=${nanoEnd}`)
    }, [setUrl])
    
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
