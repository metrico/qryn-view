export const setQueryTime = (time: any) => (dispatch: Function)=>{
    dispatch({
        type: 'SET_QUERY_TIME',
        time
    })
}
