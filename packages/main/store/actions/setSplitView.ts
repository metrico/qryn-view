export const setSplitView = ( isSplit : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_SPLIT_VIEW',
        isSplit
    })
}