export const setQueryType = (queryType) => (dispatch) => {
    dispatch({
        type: "SET_QUERY_TYPE",
        queryType,
    });
};
