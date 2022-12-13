export const setUrlLocation = (urlLocation: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_URL_LOCATION',
        urlLocation
    })
}
