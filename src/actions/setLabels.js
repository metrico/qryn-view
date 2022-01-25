export default (labels) => (dispatch) => {
    dispatch({
        type: 'SET_LABELS',
        labels: labels
    });
}