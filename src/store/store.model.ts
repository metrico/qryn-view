export interface Store {
    debugMode:          boolean;
    labels:             any[];
    labelValues:        any[];
    queryHistory:       QueryHistory[];
    linksHistory:       LinksHistory[];
    timeRange:          any[];
    queryType:          string;
    logs:               any[];
    matrixData:         any[];
    vectorData:         TableData;
    loading:            boolean;
    queryResolution:    number;
    start:              string;
    time:               string;
    stop:               string;
    from:               null;
    to:                 null;
    label:              string;
    messages:           any[];
    limitLoad:          boolean;
    limit:              number;
    step:               string;
    rangeOpen:          boolean;
    labelsBrowserOpen:  boolean;
    settingsMenuOpen:   boolean;
    timePickerOpen:     boolean;
    settingsDialogOpen: boolean;
    historyOpen:        boolean;
    apiErrors:          string;
    urlQueryParams:     URLQueryParams;
    urlLocation:        string;
    apiUrl:             string;
    isSubmit:           string;
    isEmbed:            string;
    left:               Panel[];
    right:              Panel[];
    leftDataView:       any[];
    rightDataView:      any[];
    chartType:          string;
    resposeType:        string;
    notifications:      any[];
    tableData:          TableData;
    isTableView:        boolean;
    theme:              string;
    isEmptyView:        boolean;
    isSplit:            boolean;
}

export interface Panel {
    id:          string;
    idRef:       string;
    lastIdx:     number;
    panel:       string;
    queryType:   string;
    limit:       number;
    step:        number;
    tableView:   boolean;
    browserOpen: boolean;
    expr:        string;
    labels:      any[];
    values:      any[];
    response:    TableData;
}

export interface TableData {
}

export interface LinksHistory {
    id:          string;
    timestamp:   number;
    starred:     boolean;
    description: string;
    params:      { [key: string]: string };
    fromDate:    string;
    toDate:      string;
    data:        string;
}

export interface QueryHistory {
    id:        string;
    timestamp: number;
    starred:   boolean;
    data:      string;
}

export interface URLQueryParams {
    query:     string;
    queryType: string;
    start:     string;
    time:      string;
    to:        string;
    stop:      string;
    from:      string;
    left:      Panel[];
    right:     Panel[];
    label:     string;
    limit:     number;
    step:      string;
    apiUrl:    string;
    isSubmit:  string;
    isEmbed:   string;
    theme:     string;
    isSplit:   string;
    autoTheme: string;
}