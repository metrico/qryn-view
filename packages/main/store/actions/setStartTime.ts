export const setStartTime = (start: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_START_TIME',
        start
    });
}
