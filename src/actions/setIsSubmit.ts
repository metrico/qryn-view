export const setIsSubmit = (isSubmit: any) => (dispatch: Function)=>{
    dispatch({
        type: 'SET_IS_SUBMIT',
        isSubmit
    })
}
