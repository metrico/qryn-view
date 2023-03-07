import { OPERATORS, useInitialOperation } from "../consts";
import {
    Label,
    ApiDataSource,
    InitialOperationFn,
    RequestHeaders,
    HeaderAuth,
    LogsResponse,
} from "../types";
import axios, { AxiosRequestConfig } from "axios";

// convert labels object into string
export function labelsToString(labels: Label[]): string {
    let finalString = [];

    for (let label of labels) {
        if (label.label) {
            let l = `${label.label}${OPERATORS[label.operator]}"`;

            if (label?.values?.length > 0) {
                l += `${label?.values.join("|")}"`;
            } else {
                l += `${label?.values[0] || ""}"`;
            }
            finalString.push(l);
        }
    }
    return finalString.join(",");
}

// convert metrics object into string
export function metricsToString(metric: string, labels: Label[]): string {
    let metricString = "";
    let labelsBody = "";

    if (labels?.length > 0) {
        labelsBody = labelsToString(labels);
    }

    if (metric !== "" && labelsBody) {
        metricString = `${metric}{${labelsBody}}`;
    } else {
        metricString = `${metric}{}`;
    }

    return metricString;
}
// get here the 'metrics type'
export function logsToString(labels: Label[]): string {
    console.log(labels)
    let labelsBody = "";
    if(Array.isArray(labels)&&labels?.length > 0) {
      labelsBody+= labels[0].metric
        labelsBody += `{${labelsToString(labels)}}`;
    }

    return labelsBody;
}

export function getDsHeaders(dataSource: any) {
    let headerObj = {};
    if (dataSource?.headers?.length > 0) {
        for (let header of dataSource.headers) {
            const Obj = { [String(header["header"])]: header["value"] };
            headerObj = { ...headerObj, ...Obj };
        }
    }
    return headerObj;
}

export function getHeaders(dataSource: any) {
    
    let extraHeaders = getDsHeaders(dataSource)

    const options = {
        
        method: "GET",
        headers: {...extraHeaders, "Content-Type": "application/json" },
    };

    // get the extra headers in here

    const basicAuth = dataSource?.auth?.basicAuth.value;

    let reqHeaders: RequestHeaders = {};

    let auth: HeaderAuth = {};

    if (basicAuth) {
        const authfields = dataSource?.auth?.fields?.basicAuth;

        for (let field of authfields) {
            if (field.name === "user") {
                auth.username = field.value;
            }
            if (field.name === "password") {
                auth.password = field.value;
            }
        }

        reqHeaders.auth = auth;
    }

    

    reqHeaders.options = options;

    return reqHeaders;
}

export function mappedValues(keyVal: any) {
    return [...keyVal.values.map((m: any) => mapOption(m))];
}

export function mapOption(val: any) {
    return { label: val, value: val };
}

export function selectOption(keyVal: any, type: any) {
    return { key: keyVal[type], label: keyVal[type] };
}

export function selectOperator(keyVal: any, operators: any, type: any) {
    return {
        value: keyVal[type],
        label: OPERATORS[keyVal[type]],
    };
}

export function updateSelectedOption(cb: Function, type: any, keyVal: any) {
    if (type === "metric") {
        cb((prev: any) => prev);
    } else if (type === "operator") {
        cb(selectOperator(keyVal, OPERATORS, type));
    } else if (type === "value") {
        cb(mappedValues(keyVal));
    } else {
        cb(selectOption(keyVal, type));
    }
}

export function selectTheme(theme: any, mainTheme: any) {
    return {
        ...theme,
        borderRadius: 2,
        fontSize: 12,
        colors: {
            ...theme.colors,
            primary: mainTheme.textColor,
            neutral90: mainTheme.buttonBorder,
            neutral80: mainTheme.textColor,
            neutral0: mainTheme.inputBg,
            primary25: mainTheme.widgetContainer,
            neutral5: mainTheme.widgetContainer,
            neutral10: mainTheme.widgetContainer,
        },
    };
}

export const multiType = (op: any) => {
    return op?.operator === "regexequals" || op?.operator === "regexexclude";
};

export function getTimeParsed(time: Date) {
    return time.getTime() + "000000";
}

export const getUrlFromType = (apiUrl: string, start: string, end: string) => {
    return `${apiUrl}/loki/api/v1/label?start=${start}&end=${end}`;
};

export const getValuesUrl = (
    api: string,
    label: string,
    start: any,
    end: any
) => `${api}/loki/api/v1/label/${label}/values?start=${start}&end=${end}`;




export const getAuthAndOptions = (currentDataSource: any) => {


    const extraheaders = getDsHeaders(currentDataSource)
    const options = {
        headers: { ...extraheaders, "Content-Type": "application/json" },
    };

    const basicAuth = currentDataSource?.auth?.basicAuth.value;

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
    }

    return { basicAuth: auth, options };
};

export const apiRequest = async (
    url: string,
    options: any,
    basicAuth: any,
    setLoading: Function,
    setResponse: Function
) => {
    setLoading(true);
    try {
        const config: AxiosRequestConfig = {
            ...options,
            auth: basicAuth,
        };
        const req: LogsResponse | any[] = await axios.get(url, config);
        if (req) {
            setResponse(req || []);
        }
    } catch (e) {
        console.error("Error fetching labels");
        console.error(e);
    }
    setLoading(false);
};

export async function getApiRequest(
    dataSource: ApiDataSource,
    url: string,
    setLoading: Function,
    setResponse: Function
) {
    if (dataSource.type !== "flux" && dataSource.url && dataSource.url !== "") {
        const { basicAuth, options } = getAuthAndOptions(dataSource);

        await apiRequest(url, options, basicAuth, setLoading, setResponse);
    }
}

export const setInitialOperation: InitialOperationFn = (
    name,
    opType,
    labelSeries,
    operations
) => ({
    ...useInitialOperation,
    header: name,
    range: "$__interval",
    name: name?.toLowerCase()?.split(" ")?.join("_"),
    id: operations?.length + 1,
    expressions: [],
    conversion_function: "",
    labelValue: "",
    filterText: "",
    labelFilter: { label: "", operator: "=", value: "" },
    binaryOperation: { value: "", bool: false },
    lineFilter: "",
    quantile: 0.95,
    kValue: 5,
    labels: [],
    labelOpts: labelSeries || [], // here we should have the labels from the .. initial operation
    opType,
});

export const setOperatorByType = (type: string, initial: any, prev: any) => {
    const hasPrevRange = (prev: any) => {
        return prev.some((op: any) => op.opType === "Range Functions");
    };

    const rateOp = {
        ...initial,
        header: "Rate",
        name: "rate",
        id: initial.id + 1,
        opType: "Range Functions",
    };

    // if have previous range, replace previous with initial

    if (type === "Range Functions" && hasPrevRange(prev)) {
        let found = prev.find((f: any) => f.opType === "Range Functions");
        let newInit = prev?.map((m: any) => {
            if (m.id === found.id) {
                m = { ...initial, id: found.id };
                return m;
            }
            return m;
        });

        return [...newInit];
    }

    if (type === "Aggregations" && !hasPrevRange(prev)) {
        // add a rate operation following the aggregation
        return [...prev, rateOp, initial];
    }

    return [...prev, initial];
};
