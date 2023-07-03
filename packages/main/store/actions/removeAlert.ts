import store from "@ui/store/store";

export const removeAlert = ( index: any) => (dispatch: any) => {
    let notifications = store.getState().notifications
    notifications[index].visible = false;
    dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: [...notifications]
    });
}