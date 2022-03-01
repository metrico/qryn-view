export const setStartTime = (start) => (dispatch) => {
    dispatch({
        type: 'SET_START_TIME',
        start
    });
}
