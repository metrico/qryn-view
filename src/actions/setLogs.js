const setLogs = (logs) => (dispatch) => {
    dispatch({
        type: "SET_LOGS",
        logs,
    });
};

export default setLogs;
