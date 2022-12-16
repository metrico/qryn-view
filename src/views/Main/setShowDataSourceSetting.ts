export const setShowDataSourceSetting =
    (showDataSourceSetting: any) => (dispatch: Function) => {
        dispatch({
            type: "SHOW_DATA_SOURCE_SETTING",
            showDataSourceSetting,
        });
    };
