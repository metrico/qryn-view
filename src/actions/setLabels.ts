export const setLabels = (labels) => (dispatch) => {
    dispatch({
        type: 'SET_LABELS',
        labels: labels
    });
};
