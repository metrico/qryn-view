const setLabelValues = (labelValues) => (dispatch) => {
    dispatch({
        type: 'SET_LABEL_VALUES',
       labelValues
    });
}
export default setLabelValues;
