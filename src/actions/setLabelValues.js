export default (labelValues) => (dispatch) => {
    dispatch({
        type: 'SET_LABEL_VALUES',
       labelValues
    });
}