export const setQueryResolution = (queryResolution: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_QUERY_RESOLUTION",
        queryResolution,
    });
};
