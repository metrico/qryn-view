import { OPERATORS } from "../consts";
import { Label } from "../types";

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

export interface HeaderAuth {
    username?: any;
    password?: any;
}

export interface RequestHeaders {
    auth?: any;
    options?: any;
}

export function getHeaders(dataSource: any) {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

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
            neutral90: mainTheme.textColor,
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
