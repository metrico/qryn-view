const setQueryHistory = (queryHistory: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_QUERY_HISTORY',
        queryHistory
    });

}

export default setQueryHistory
