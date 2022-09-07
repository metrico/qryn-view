export const setSplitView = ( isSplit ) => (dispatch) => {
    dispatch({
        type: 'SET_SPLIT_VIEW',
        isSplit
    })
}