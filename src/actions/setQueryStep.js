export const setQueryStep = (step) => (dispatch)=>{
    dispatch({
        type: 'SET_QUERY_STEP',
        step
    })
}
