export const setQueryResolution = (queryResolution: any) => (dispatch) => {
    dispatch({
        type: "SET_QUERY_RESOLUTION",
        queryResolution,
    });
};
