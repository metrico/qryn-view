import { User } from "./UserRoles";

export const setCurrentUser = (currentUser: User) => (dispatch: Function) => {
    return dispatch({
        type: "SET_CURRENT_USER",
        currentUser,
    });
};
