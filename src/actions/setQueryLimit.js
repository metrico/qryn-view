export const setQueryLimit = (limit) => (dispatch) => {
    dispatch({
        type: 'SET_QUERY_LIMIT',
        limit
    });
}
