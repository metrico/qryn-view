export const setIsSubmit = (isSubmit) => (dispatch)=>{
    dispatch({
        type: 'SET_IS_SUBMIT',
        isSubmit
    })
}