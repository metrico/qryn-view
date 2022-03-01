export const setApiUrl = ( apiUrl ) => (dispatch) => {
    dispatch({
        type: 'SET_API_URL',
        apiUrl:apiUrl.trim()
    })
}
