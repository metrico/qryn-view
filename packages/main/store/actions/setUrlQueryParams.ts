export const setUrlQueryParams = (urlQueryParams: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_URL_QUERY_PARAMS',
        urlQueryParams

    })
}
