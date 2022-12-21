const setLoading = (loading: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_LOADING",
        loading,
    });
};

export default setLoading;
