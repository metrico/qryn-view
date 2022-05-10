export const setQueryLimit = (limit) => (dispatch) => {
    console.log("limit set to",limit)
    dispatch({
        type: 'SET_QUERY_LIMIT',
        limit
    });
}
