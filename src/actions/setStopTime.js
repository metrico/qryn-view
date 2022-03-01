export const setStopTime = (stop) => (dispatch) => {
    dispatch({
        type: 'SET_STOP_TIME',
        stop
    });
}
