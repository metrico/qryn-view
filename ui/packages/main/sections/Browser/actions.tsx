export const setQueryResolution = (queryResolution: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_QUERY_RESOLUTION",
        queryResolution,
    });
};

export const setLeftPanel = ( left : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_LEFT_PANEL',
        left
    })
}

export const setRightPanel = ( right : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_RIGHT_PANEL',
        right
    })
}

