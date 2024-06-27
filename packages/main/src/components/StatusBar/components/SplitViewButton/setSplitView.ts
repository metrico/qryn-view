export const setSplitView = ( isSplit : any) => (dispatch) => {
    dispatch({
        type: 'SET_SPLIT_VIEW',
        isSplit
    })
}