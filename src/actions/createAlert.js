import store from '../store/store';

export const createAlert = ( action) => (dispatch) => {
    console.log(action)
    const notifications = store.getState().notifications
    notifications.push({
        message: action.message,
        type: action.type
    })
    dispatch({
        type: "ADD_NOTIFICATION",
        payload: [...notifications]
    });
}