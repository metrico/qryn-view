import store from "@ui/store/store";

export const removeAlert = ( index: any) => (dispatch: Function) => {
    let notifications = store.getState().notifications
    notifications[index].visible = false;
    dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: [...notifications]
    });
}