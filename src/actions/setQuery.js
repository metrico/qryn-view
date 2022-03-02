 export const setQuery = (query) => (dispatch) => {
    dispatch({
        type: 'SET_QUERY',
        query
    })
}
