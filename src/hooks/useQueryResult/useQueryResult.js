import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export function getTimeParsed(time) {
    return time.getTime() + "000000";
}

export const getApiUrl = (params) => {
    const { start, stop, time, step, limit, exp, queryType, apiUrl } = params;
    
    if (queryType === "instant") {
        return `${apiUrl}/query?query=${exp}&limit=${limit}&time=${time}`;
    } else {
        return `${apiUrl}/query_range?query=${exp}&limit=${limit}&start=${start}&stop=${stop}&step=${step}`;
    }
};

export const useQueryResponse = ({ queryType, step, limit, exp }) => {
    const { start, stop, apiUrl } = useSelector((store) => store);

    const time = useMemo(() => new Date(), []);


    // get time params as NanoSec (required)

    const nanoStart = getTimeParsed(start);

    const nanoEnd = getTimeParsed(stop);

    const nanoTime = getTimeParsed(time);

    const encodeExp = (exp) => `${encodeURIComponent(exp)}`;

    const controller = new AbortController();

    const [headers] = useState({
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

    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorResponse, setErrorResponse] = useState({});

    const [url, setUrl] = useState(
        getApiUrl({
            start: nanoStart,
            end: nanoEnd,
            time: nanoTime,
            step,
            limit,
            exp: encodeExp(exp),
            queryType,
            apiUrl,
        })
    );

    useEffect(() => {
        setUrl(
            getApiUrl({
                start: nanoStart,
                end: nanoEnd,
                time: nanoTime,
                step,
                limit,
                exp: encodeExp(exp),
                queryType,
                apiUrl,
            })
        );
    }, [exp, setUrl, queryType]);

  
    useEffect(() => {
        const apiRequest = async () => {
            setLoading(true);
            try {
                const res = await axios({ url }, options);

                setResponse(res || {});
            } catch (e) {
                setErrorResponse(e);
            }
            setLoading(false);
        };

        apiRequest();
    }, [options, url,setResponse]);

    return {
        response,
        loading,
        errorResponse,
        controller: options.signal, // abort() method for request
    };
};
