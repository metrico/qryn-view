const setIsEmptyView = (isEmptyView: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_IS_EMPTY_VIEW',
        isEmptyView,
    })
}

export default setIsEmptyView;