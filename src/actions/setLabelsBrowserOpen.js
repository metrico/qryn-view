export const setLabelsBrowserOpen = ( labelsBrowserOpen) => (dispatch) => {
    dispatch({
        type: 'SET_BROWSER_OPEN',
        labelsBrowserOpen
    })
}