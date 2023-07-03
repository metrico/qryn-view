const setDataViews = (dataViews: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_DATA_VIEWS',
        dataViews
    });
}

export default setDataViews
