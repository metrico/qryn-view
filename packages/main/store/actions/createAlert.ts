import store from "@ui/store/store";

export const createAlert = (action: any) => (dispatch: any) => {
    const notifications = store.getState().notifications
    notifications.push({
        message: action.message,
        type: action.type,
        visible: true
    })
    dispatch({
        type: "ADD_NOTIFICATION",
        payload: [...notifications]
    });
}