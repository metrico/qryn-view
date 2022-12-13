const setLogs = (logs: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_LOGS",
        logs,
    });
};

export default setLogs;
