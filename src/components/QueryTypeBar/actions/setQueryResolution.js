export const setQueryResolution = (queryResolution) => (dispatch) => {
    dispatch({
        type: "SET_QUERY_RESOLUTION",
        queryResolution,
    });
};
