const setDataViews = (dataViews) => (dispatch) => {
    dispatch({
        type: 'SET_DATA_VIEWS',
        dataViews
    });
}

export default setDataViews
