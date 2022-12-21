export const setRightDataView = (rightDataView: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_RIGHT_DATAVIEW',
        rightDataView
    })
}