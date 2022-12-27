import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../../../theme/themes";
import { OPERATORS } from "../consts";
import { getTimeParsed, multiType } from "../helpers";
import { AxiosResponse } from "axios";
export interface LogsResponseData {
    data: any;
    status: any;
}
export interface LogsResponse extends AxiosResponse {
    data: LogsResponseData;
}

export const useTheme = () => {
    const theme = useSelector(
        (store: { theme: "light" | "dark" }) => store.theme
    );
    return useMemo(() => {
        return themes[theme];
    }, [theme]);
};

export const useLabelOpts = (valuesOpts: any) => {
    return useMemo(() => {
        if (valuesOpts && Object.keys(valuesOpts)?.length > 0) {
            return Object.keys(valuesOpts)
                ?.filter((f) => f !== "__name__")
                ?.map((m) => ({ label: m, value: m }));
        }
        return [];
    }, [valuesOpts]);
};

export const useValueSelectOpts = (valuesOpts: any, labelValue: any) => {
    return useMemo(() => {
        if (
            valuesOpts[labelValue.value] &&
            Array.isArray(valuesOpts[labelValue.value])
        ) {
            return valuesOpts[labelValue.value]?.map((val: any) => ({
                label: val,
                value: val,
            }));
        } else {
            return [{ label: "", value: "" }];
        }
    }, [labelValue.value, valuesOpts]);
};

export const useDefaultValue = (defaultValue: any, type: any, keyVal: any) => {
    return useMemo(() => {
        if (type === "operator") {
            return { value: defaultValue, label: OPERATORS[defaultValue] };
        }
        if (type === "value") {
            return keyVal.values;
        }

        return { key: defaultValue, label: defaultValue };
    }, [defaultValue]);
};

export const useIsMulti = (type: any, keyVal: any) => {
    return useMemo(() => {
        if (type === "metrics") {
            return false;
        }

        if (multiType(keyVal) && type === "value") {
            return true;
        }
        return false;
    }, [type, keyVal]);
};

export const useCurrentDataSource = (
    id: string,
    dataSources: any,
    dataSourceURL: string
) => {
    return useMemo(() => {
        const current = dataSources?.find((f: any) => f.id === id);
        if (dataSourceURL !== "") {
            current.url = dataSourceURL;
        }

        return current;
    }, [id, dataSources]);
};

export const useTimeStart = (start: Date) => {
    return useMemo(() => {
        return getTimeParsed(start);
    }, [start]);
};

export const useTimeEnd = (stop: Date) => {
    return useMemo(() => {
        return getTimeParsed(stop);
    }, [stop]);
};

export const useLogsResponse = (response: LogsResponse) => {
    return useMemo(() => {
        if (response?.data?.data && Array.isArray(response?.data?.data)) {
            return response.data.data?.map((val: string) => ({
                label: val,
                value: val,
            }));
        }
        return [{ label: "", value: "" }];
    }, [response]);
};
