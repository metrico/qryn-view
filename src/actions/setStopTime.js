export const setStopTime = (stop) => (dispatch) => {
    console.log(stop)
    dispatch({
        type: 'SET_STOP_TIME',
        stop
    });
}