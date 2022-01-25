export default (state, action) => {
    switch (action.type) {
        case "SET_LABELS":
            return { ...state, labels: action.labels };
        case "SET_LOADING":
            return { ...state, loading: action.loading };
        case "SET_LOGS":
            return { ...state, logs: action.logs };
        case "SET_LABEL_VALUES":
            return {...state, labelValues: action.labelValues};
        default:
            return { ...state };
    }
};