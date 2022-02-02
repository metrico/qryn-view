export const setStartTime = (start) => (dispatch) => {
    console.log(start)
    dispatch({
        type: 'SET_START_TIME',
        start
    });
}