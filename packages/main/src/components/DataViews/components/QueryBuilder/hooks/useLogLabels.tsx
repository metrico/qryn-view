import { useEffect, useMemo, useState } from "react";
import { AxiosResponse } from "axios";
import { getApiRequest, getUrlFromType } from "../helpers";
import {
    useTimeStart,
    useTimeEnd,
    useCurrentDataSource,
} from "./";
import { UseLogLabelsResponse } from "../types";
export interface LogsResponseData {
    data: any;
    status: any;
}
export interface LogsResponse extends AxiosResponse {
    data: LogsResponseData;
}
export default function useLogLabels(
    id: string,
    start:any,
    stop:any,
    dataSources:any,
    dataSourceUrl = "",
): UseLogLabelsResponse {
    
  
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<LogsResponse | any>([]);
    const timeStart = useTimeStart(start);
    const timeEnd = useTimeEnd(stop);

    const currentDataSource = useCurrentDataSource(
        id,
        dataSources,
        dataSourceUrl
    );

    const url = useMemo(
        () => getUrlFromType(currentDataSource.url, timeStart, timeEnd),
        [currentDataSource.url, timeStart, timeEnd]
    );

    useEffect(() => {
   
        getApiRequest(currentDataSource, url, setLoading, setResponse);
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDataSource]);

    //const logsResponse = useLogsResponse(response);

    const logsResponse = useMemo(() => {
        if (response?.data?.data && Array.isArray(response?.data?.data)) {
            return response.data.data?.map((val: string) => ({
                label: val,
                value: val,
            }));
        }
        return [{ label: "", value: "" }];
    }, [response]);

    return { loading, logsResponse };
}
