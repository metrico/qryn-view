export const setTimeRangeLabel = (label) => (dispatch) => {
    dispatch({
        type: 'SET_TIME_RANGE_LABEL',
        label
    });
}
