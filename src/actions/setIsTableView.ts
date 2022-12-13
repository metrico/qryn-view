export const setIsTableView = (isTableView: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_IS_TABLE_VIEW',
        isTableView
    })
}
