export const setLeftPanel = ( left ) => (dispatch) => {
    dispatch({
        type: 'SET_LEFT_PANEL',
        left
    })
}
