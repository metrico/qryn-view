export const setUserType = (userType:any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_USER_TYPE',
        userType,
    })
}
