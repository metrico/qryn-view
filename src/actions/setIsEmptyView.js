const setIsEmptyView = (isEmptyView) => (dispatch) => {
    dispatch({
        type: 'SET_IS_EMPTY_VIEW',
        isEmptyView,
    })
}

export default setIsEmptyView;