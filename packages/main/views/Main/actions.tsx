export const setUserType = (userType:any) => (dispatch: any) => {
    dispatch({
        type: 'SET_USER_TYPE',
        userType,
    })
}
