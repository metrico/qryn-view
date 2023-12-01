export const setLeftDataView = (leftDataView: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_LEFT_DATAVIEW',
        leftDataView
    })
}