import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTimeEnd, useTimeStart, LogsResponse, useLogsResponse } from ".";
import { getApiRequest, getValuesUrl } from "../helpers";

export default function useLogLabelValues(id: string, label: string) {
  
    const start = useSelector ((store:any)=> store.start)
    const stop = useSelector ((store:any)=> store.stop)
    const dataSources = useSelector((store: any) => store.dataSources);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<LogsResponse | any>([]);
    const currentDataSource = useMemo(() => {
        return dataSources.find((f: any) => f.id === id);
    }, [dataSources, id]);

    const timeStart = useTimeStart(start);
    const timeEnd = useTimeEnd(stop);

    const url = useMemo(() => {
        return getValuesUrl(currentDataSource.url, label, timeStart, timeEnd);
        
    }, [currentDataSource.url, timeStart, timeEnd, label]);

    const logsResponse = useLogsResponse(response)
    useEffect(() => {
        if(label && label !== '') {
            getApiRequest(currentDataSource, url, setLoading, setResponse);
        }
     
        return()=> { 
            setResponse([])
            setLoading(false)
        
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, currentDataSource]);

 
    return {
        logsResponse,
        loading,
    };
}
