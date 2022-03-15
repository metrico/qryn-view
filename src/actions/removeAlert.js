import store from '../store/store';

export const removeAlert = ( index) => (dispatch) => {
    const notifications = store.getState().notifications
    notifications.splice(index, 1)
    dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: [...notifications]
    });
}