export const setStopTime = (stop: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_STOP_TIME',
        stop
    });
}
