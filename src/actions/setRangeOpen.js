export const setRangeOpen = ( open ) => (dispatch) => {
    dispatch({
        type: 'SET_RANGE_OPEN',
        open
    })
}