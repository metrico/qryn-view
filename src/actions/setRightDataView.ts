export const setRightDataView = (rightDataView) => (dispatch) => {
    dispatch({
        type: 'SET_RIGHT_DATAVIEW',
        rightDataView
    })
}