import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { getApiRequest, getUrlFromType } from "../helpers";
import {
    useTimeStart,
    useTimeEnd,
    useCurrentDataSource,
    useLogsResponse,
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
    dataSourceUrl = ""
): UseLogLabelsResponse {
    const { start, stop } = useSelector((store: any) => store);
    const dataSources = useSelector((store: any) => store.dataSources);

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
    }, [currentDataSource, url]);

    const logsResponse = useLogsResponse(response);

    return { loading, logsResponse };
}
