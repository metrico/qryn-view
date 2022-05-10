const setLabelValues = (labelValues) => (dispatch) => {
    console.log('labelValues set to', labelValues)
    dispatch({
        type: 'SET_LABEL_VALUES',
       labelValues
    });
}
export default setLabelValues;
