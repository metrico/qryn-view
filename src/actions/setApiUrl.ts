export const setApiUrl = ( apiUrl : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_API_URL',
        apiUrl:apiUrl.trim()
    })
}
