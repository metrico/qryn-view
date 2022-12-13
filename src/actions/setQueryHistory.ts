const setQueryHistory = (queryHistory) => (dispatch) => {
    dispatch({
        type: 'SET_QUERY_HISTORY',
        queryHistory
    });

}

export default setQueryHistory
