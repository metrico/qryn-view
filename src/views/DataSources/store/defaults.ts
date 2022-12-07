import { nanoid } from "nanoid";

export const defaultLogsDataSourceHeaders = [
    {
        header: "Content-type",
        value: "application/json",
        id: nanoid(),
    },
];

export const defaultMetricsDataSourceHeaders = [
    {
        header: "Content-type",
        value: "application/json",
        id: nanoid(),
    }
];

export const defaultTracesDataSourceHeaders = [
    {
        header: "Content-type",
        value: "application/json",
        id: nanoid(),
    }
];

export const defaultFluxDataSourceHeaders = [
    { header: "Accept", value: "application/csv", id: nanoid() },
    {
        header: "Content-type",
        value: "application/vnd.flux",
        id: nanoid(),
    }
];

// 'Authorization' : 'Basic ZGVmYXVsdDo='

export const defaultLogsLinkedFields = [
    {
        id: nanoid(),
        dataSource: "Traces",
        dataSourceId: "32D16h5uYBqUUzhD",
        ds_id: "logs",
        name: "traceId",
        regex: "traceI[d|D]=(?<traceId>\\w+)",
        query: "${__value.raw}",
        urlLabel: "",
      //  url: "",
        internalLink: true,
        linkType: "Traces",
    },
    {
        id: nanoid(),
        dataSource: "Traces",
        dataSourceId: "32D16h5uYBqUUzhD",
        ds_id: "logs",
        name: "traceID",
        regex: 'traceI[d|D]=(?<traceId>\\w+)',
        query: "${__value.raw}",
        urlLabel: "",
       // url: "",
        internalLink: true,
        linkType: "Traces",
    },
];

export const defaultTracesLinkedFields = [
    // {
    //     id: "1xiaRf2padIcGDEr",
    //     dataSourceId: "32D16h5uYBqUUzhD",
    //     dataSource: "Logs",
    //     ds_id: "logs",
    //     name: "traceId",
    //     regex: "^.*?traceI[d|D]=(w+).*$",
    //     query: "${__value.raw}",
    //     urlLabel: "",
    //     url: "",
    //     internalLink: true,
    //     linkType: "Traces",
    // },
    // {
    //     id: "rw8bW4wN7HIz7rpQ",
    //     dataSourceId: "32D16h5uYBqUUzhD",
    //     dataSource: "Logs",
    //     ds_id: "logs",
    //     name: "traceID",
    //     regex: '^.*?"traceID":"(w+)".*$/',
    //     query: "${__value.raw}",
    //     urlLabel: "",
    //     url: "",
    //     internalLink: true,
    //     linkType: "Traces",
    // },
];

export const defaultMetricsLinkedFields = [
    // {
    //     id: "nqhCxOBA5TJ8BINh",
    //     dataSource: "Logs",
    //     ds_id: "logs",
    //     name: "traceId",
    //     regex: "^.*?traceI[d|D]=(w+).*$",
    //     query: "${__value.raw}",
    //     urlLabel: "",
    //     url: "",
    //     internalLink: true,
    //     linkType: "Traces",
    // },
    // {
    //     id: "-UDcksuS9iunXqUo",
    //     dataSource: "Logs",
    //     ds_id: "logs",
    //     name: "traceID",
    //     regex: '^.*?"traceID":"(w+)".*$/',
    //     query: "${__value.raw}",
    //     urlLabel: "",
    //     url: "",
    //     internalLink: true,
    //     linkType: "Traces",
    // },
];

export const defaultCertFields = {
    // WithCACert: [
    //     {
    //         name: "CACert",
    //         form_type: "textarea",
    //         label: "CA Cert",
    //         value: "",
    //         placeholder: "Begins with -----BEGIN CERTIFICATE-----",
    //     },
    // ],
    // TLSClientAuth: [
    //     {
    //         name: "ServerName",
    //         cert: "TLSClientAuth",
    //         form_type: "input",
    //         label: "Server Name",
    //         value: "",
    //         placeholder: "domain.example.com",
    //     },

    //     {
    //         name: "ClientCert",
    //         cert: "TLSClientAuth",
    //         form_type: "textarea",
    //         label: "Client Cert",
    //         value: "",
    //         placeholder: "Begins with -----BEGIN CERTIFICATE-----",
    //     },
    //     {
    //         name: "ClientKey",
    //         cert: "TLSClientAuth",
    //         form_type: "textarea",
    //         label: "Client Key",
    //         value: "",
    //         placeholder: "Begins with -----BEGIN RSA PRIVATE KEY-----",
    //     },
    // ],
    basicAuth: [
        {
            name: "user",
            cert: "basicAuth",
            form_type: "input",
            label: "User",
            value: "",
            placeholder: "default",
        },
        {
            name: "password",
            cert: "basicAuth",
            form_type: "password",
            label: "Password",
            placeholder: "",
            value: "",
        },
    ],
};

export const defaultAuth = {
    method: {
        label: "Method",
        form_type: "select",
        options: ["GET", "POST"],
        value: "GET",
    },
    fields: defaultCertFields,
    basicAuth: {
        form_type: "switch",
        label: "Basic Auth",
        value: false,
        withFields: true,
        fields: "basicAuthUserFields",
    },

    // TLSClientAuth: {
    //     form_type: "switch",
    //     label: "TLS Client Auth",
    //     value: false,
    //     withFields: true,
    //     fields: "TLSClientAuthFields",
    // },

    // SkipTLSVerify: {
    //     form_type: "switch",
    //     label: "Skip TLS Verify",
    //     value: false,
    // },

    // ForwardOAuthIdentity: {
    //     form_type: "switch",
    //     label: "Forward OAuth Identity",
    //     value: false,
    // },

    // WithCACert: {
    //     form_type: "switch",
    //     label: "With CA Cert",
    //     value: false,
    //     withFields: true,
    //     fields: "WithCACertFields",
    // },
};

export const defaultLogsDataSource = {
    id: "cHI2SqPzH_kxYRXj",
    type: "logs",
    value: "logs",
    name: "Logs",
    url: "",
    placeholder: "http://qryn:3000",
    icon: "logs_icon",
    visType: "logs",
    headers: defaultLogsDataSourceHeaders,
    linkedFields: defaultLogsLinkedFields,
    auth: defaultAuth,
};

export const defaultTracesDataSource = {
    id: "32D16h5uYBqUUzhD",
    type: "traces",
    value: "traces",
    name: "Traces",
    url: "",
    placeholder: "http://traces:3000",
    icon: "traces_icon",
    visType: "trace",
    headers: defaultTracesDataSourceHeaders,
    linkedFields: defaultTracesLinkedFields,
    auth: defaultAuth,
};

export const defaultMetricsDataSource = {
    id: "XfqOurV-Tng1F0cc",
    type: "metrics",
    value: "metrics",
    name: "Metrics",
    url: "",
    placeholder: "http://metrics:3000",
    icon: "metrics_icon",
    visType: "chart",
    headers: defaultMetricsDataSourceHeaders,
    linkedFields: defaultMetricsLinkedFields,
    auth: defaultAuth,
};

export const defaultFluxDataSource = {
    id: "Swjy1SzgWuDmJpUo",
    type: "flux",
    value: "flux",
    name: "Flux",
    url: "",
    placeholder: "http://flux:3000",
    icon: "flux_icon",
    visType: "chart",
    headers: defaultFluxDataSourceHeaders,
    linkedFields: [],
    auth: defaultAuth,
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
    defaultFluxDataSource,
];
