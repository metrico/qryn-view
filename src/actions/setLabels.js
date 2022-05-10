export const setLabels = (labels) => (dispatch) => {
    console.log('labels set to',labels)
    dispatch({
        type: 'SET_LABELS',
        labels: labels
    });
};
