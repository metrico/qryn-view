export const setIsTableView = (isTableView) => (dispatch) => {
    dispatch({
        type: 'SET_IS_TABLE_VIEW',
        isTableView
    })
}
