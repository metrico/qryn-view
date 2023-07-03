export const setRangeOpen = ( rangeOpen : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_RANGE_OPEN',
        rangeOpen
    })
}
