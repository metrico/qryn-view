export const setUrlLocation = (urlLocation) => (dispatch) => {
    dispatch({
        type: 'SET_URL_LOCATION',
        urlLocation
    })
}
