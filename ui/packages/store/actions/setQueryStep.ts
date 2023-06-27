export const setQueryStep = (step: any) => (dispatch: Function)=>{
    dispatch({
        type: 'SET_QUERY_STEP',
        step
    })
}
