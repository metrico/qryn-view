import store from '../store/store';

export const createAlert = (action: any) => (dispatch: Function) => {
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