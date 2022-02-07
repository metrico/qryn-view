export default (state, action) => {
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
        case "SET_QUERY_LIMIT":
                return { ...state, limit: action.limit };
        case "SET_RANGE_OPEN":
                return { ...state, rangeOpen: action.rangeOpen};
        case "SET_BROWSER_OPEN":
            return {...state, labelsBrowserOpen: action.labelsBrowserOpen}
        case "SET_QUERY_STEP":
                return { ...state, step: action.step};
        case "SET_API_URL":
            return { ...state, apiUrl: action.apiUrl};
        case "SET_API_ERRORS":
            return {...state, apiErrors: action.apiErrors};
        default:
            return { ...state };
    }
};
