

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LABELS":
            return { ...state, labels: action.labels };
        case "SET_LOADING":
            return { ...state, loading: action.loading };
        case "SET_LOGS":
            return { ...state, logs: action.logs };
        case "SET_LABEL_VALUES":
            return { ...state, labelValues: action.labelValues };
        case "SET_START_TIME":
            return { ...state, start: action.start };
        case "SET_STOP_TIME":
            return { ...state, stop: action.stop };
        case "SET_FROM_TIME":
            return { ...state, from: action.from };
        case "SET_TO_TIME":
            return { ...state, to: action.to };
        case "SET_TIME_RANGE_LABEL":
            return { ...state, label: action.label };
        case "SET_QUERY_LIMIT":
            return { ...state, limit: action.limit };
        case "SET_RANGE_OPEN":
            return { ...state, rangeOpen: action.rangeOpen };
        case "SET_BROWSER_OPEN":
            return { ...state, labelsBrowserOpen: action.labelsBrowserOpen };
        case "SET_SETTINGS_MENU_OPEN":
            return { ...state, settingsMenuOpen: action.settingsMenuOpen };
        case "SET_TIME_PICKER_OPEN":
            return { ...state, timePickerOpen: action.timePickerOpen };
        case "SET_SETTINGS_DIALOG_OPEN":
            return { ...state, settingsDialogOpen: action.settingsDialogOpen };
        case "SET_QUERY":
            return { ...state, query: action.query };
        case "SET_QUERY_STEP":
            return { ...state, step: action.step };
        case "SET_API_URL":
            return { ...state, apiUrl: action.apiUrl };
        case "SET_API_ERRORS":
            return { ...state, apiErrors: action.apiErrors };
        case "SET_URL_QUERY_PARAMS":
            return { ...state, urlQueryParams: action.urlQueryParams };
        case "SET_QUERY_TYPE":
            return { ...state, queryType: action.queryType };
        case "SET_URL_LOCATION":
            return { ...state, urlLocation: action.urlLocation };
        case "SET_IS_SUBMIT":
            return { ...state, isSubmit: action.isSubmit };
        case "SET_IS_EMBED":
            return { ...state, isEmbed: action.isEmbed };
        case "SET_MATRIX_DATA":
            return { ...state, matrixData: action.matrixData };
        case "SET_CHART_TYPE":
            return { ...state, chartType: action.setChartType };
        case "SET_QUERY_HISTORY":
            return { ...state, queryHistory: action.queryHistory };
        case "SET_LINKS_HISTORY":
            return { ...state, linksHistory: action.linksHistory };
        case "SET_HISTORY_OPEN":
            return { ...state, historyOpen: action.historyOpen };
        case "ADD_NOTIFICATION":
            return { ...state, notifications: action.payload };
        case "REMOVE_NOTIFICATION":
            return { ...state, notifications: action.payload };
        case "SET_DEBUG_MODE":
            return { ...state, debugMode: action.debugMode };
        case "SET_THEME":
            return { ...state, theme: action.theme };
        case "SET_AUTO_THEME":
            return { ...state, autoTheme: action.autoTheme };
        case "SET_TABLE_DATA":
            return { ...state, tableData: action.tableData };
        case "SET_QUERY_TIME":
            return { ...state, time: action.time };
        case "SET_QUERY_RESOLUTION":
            return { ...state, queryResolution: action.queryResolution };
        case "SET_IS_EMPTY_VIEW":
            return { ...state, isEmptyView: action.isEmptyView };
        case "SET_VECTOR_DATA":
            return { ...state, vectorData: action.vectorData };
        case "SET_RESPONSE_TYPE":
            return { ...state, responseType: action.responseType };
        case "SET_IS_TABLE_VIEW":
            return { ...state, isTableView: action.isTableView };
        case "SET_SPLIT_VIEW":
            return { ...state, isSplit: action.isSplit };
        case "SET_PANELS_DATA":
            return { ...state, panels: action.panels };
        case "SET_DATA_VIEWS":
            return { ...state, dataViews: action.dataViews };
        case "SET_RIGHT_DATAVIEW":
            return { ...state, rightDataView: action.rightDataView };
        case "SET_LEFT_DATAVIEW":
            return { ...state, leftDataView: action.leftDataView };
        case "SET_RIGHT_PANEL":
            return { ...state, right: action.right };
            case "SET_LEFT_PANEL":
            return { ...state, left: action.left };
        default:
            return { ...state };
    }
};
export default reducer;
