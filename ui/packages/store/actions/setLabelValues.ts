const setLabelValues = (labelValues: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_LABEL_VALUES',
       labelValues
    });
}
export default setLabelValues;
