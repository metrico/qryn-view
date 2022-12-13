export const setLeftDataView = (leftDataView) => (dispatch) => {
    dispatch({
        type: 'SET_LEFT_DATAVIEW',
        leftDataView
    })
}