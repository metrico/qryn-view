export const setApiError = (apiErrors) => (dispatch) => {
    dispatch({
        type: 'SET_API_ERRORS',
        apiErrors
    })
} 
