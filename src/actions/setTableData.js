export const setTableData = (tableData) => (dispatch) => {
    dispatch({
        type: "SET_TABLE_DATA",
        tableData,
    });
};
