export const setApiError = (apiErrors: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_API_ERRORS',
        apiErrors
    })
} 
