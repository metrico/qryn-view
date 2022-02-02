export default (logs) => (dispatch) => {
    console.log(logs)
    dispatch({
        type: 'SET_LOGS',
        logs: logs
    });
}