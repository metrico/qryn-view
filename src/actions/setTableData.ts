export const setTableData = (tableData: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_TABLE_DATA",
        tableData,
    });
};
