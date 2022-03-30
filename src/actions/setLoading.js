const setLoading = (loading) => (dispatch) => {
    dispatch({
        type: "SET_LOADING",
        loading,
    });
};

export default setLoading;
