export const setRangeOpen = ( rangeOpen ) => (dispatch) => {
    dispatch({
        type: 'SET_RANGE_OPEN',
        rangeOpen
    })
}