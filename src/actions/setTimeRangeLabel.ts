export const setTimeRangeLabel = (label: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_TIME_RANGE_LABEL',
        label
    });
}
