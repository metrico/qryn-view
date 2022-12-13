import store from '../store/store';

export const removeAlert = ( index) => (dispatch) => {
    let notifications = store.getState().notifications
    notifications[index].visible = false;
    dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: [...notifications]
    });
}