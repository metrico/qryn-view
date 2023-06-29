export const setQueryType = (queryType: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_QUERY_TYPE",
        queryType,
    });
};
