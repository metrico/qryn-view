export const setUrlQueryParams = (urlQueryParams) => (dispatch) => {
    dispatch({
        type: 'SET_URL_QUERY_PARAMS',
        urlQueryParams

    })
}
