export const setQueryLimit = (limit: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_QUERY_LIMIT',
        limit
    });
}
