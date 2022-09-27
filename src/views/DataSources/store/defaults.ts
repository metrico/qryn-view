import { nanoid } from "nanoid";

export const defaultLogsLinkedFields = [
    {
        id: nanoid(),
        dataSource: "Logs",
        ds_id: "logs",
        name: "traceId",
        regex: "^.*?traceI[d|D]=(w+).*$",
        query: "${__value.raw}",
        urlLabel: "",
        url: "",
        internalLink: true,
        linkType: "Traces",
    },
    {
        id: nanoid(),
        dataSource: "Logs",
        ds_id: "logs",
        name: "traceID",
        regex: '^.*?"traceID":"(w+)".*$/',
        query: "${__value.raw}",
        urlLabel: "",
        url: "",
        internalLink: true,
        linkType: "Traces",
    },
];

export const defaultTracesLinkedFields = [
    {
        id: nanoid(),
        dataSource: "Logs",
        ds_id: "logs",
        name: "traceId",
        regex: "^.*?traceI[d|D]=(w+).*$",
        query: "${__value.raw}",
        urlLabel: "",
        url: "",
        internalLink: true,
        linkType: "Traces",
    },
    {
        id: nanoid(),
        dataSource: "Logs",
        ds_id: "logs",
        name: "traceID",
        regex: '^.*?"traceID":"(w+)".*$/',
        query: "${__value.raw}",
        urlLabel: "",
        url: "",
        internalLink: true,
        linkType: "Traces",
    },
];

export const defaultMetricsLinkedFields = [
    {
        id: nanoid(),
        dataSource: "Logs",
        ds_id: "logs",
        name: "traceId",
        regex: "^.*?traceI[d|D]=(w+).*$",
        query: "${__value.raw}",
        urlLabel: "",
        url: "",
        internalLink: true,
        linkType: "Traces",
    },
    {
        id: nanoid(),
        dataSource: "Logs",
        ds_id: "logs",
        name: "traceID",
        regex: '^.*?"traceID":"(w+)".*$/',
        query: "${__value.raw}",
        urlLabel: "",
        url: "",
        internalLink: true,
        linkType: "Traces",
    },
];

export const defaultLinkedFields = [...defaultLogsLinkedFields];

export const defaultLogsDataSource = {
    id: nanoid(),
    type: "logs",
    value: "logs",
    name: "Logs",
    url: "http://qryn:3000",
    icon: "logs_icon",
    visType: "logs",
};

export const defaultTracesDataSource = {
    id: nanoid(),
    type: "traces",
    value: "traces",
    name: "Traces",
    url: "http://traces:3000",
    icon: "traces_icon",
    visType: "trace",
};

export const defaultMetricsDataSource = {
    id: nanoid(),
    type: "metrics",
    value: "metrics",
    name: "Metrics",
    url: "http://metrics:3000",
    icon: "metrics_icon",
    visType: "chart",
};

export const defaultLogsDatasourceFieldTypes = {
    type: "readonly",
    name: "input",
    url: "input",
    visType: "select",
};

export const defaultLogsLinkedFieldTypes = {
    id: "input",
    dataSource: "input",
    ds_id: "input",
    name: "input",
    regex: "input",
    query: "input",
    urlLabel: "input",
    internalLink: "switch",
    linkType: "select",
};

export const defaultLinkedFieldTypes = {
    logs: defaultLogsLinkedFieldTypes,
};

export const defaultDatasourcesFieldTypes = {
    defaultLogsDatasourceFieldTypes,
};

export const defaultDataSources = [
    defaultLogsDataSource,
    defaultTracesDataSource,
    defaultMetricsDataSource,
];
