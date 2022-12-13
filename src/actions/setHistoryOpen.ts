 const setHistoryOpen = (historyOpen: any) => (dispatch: Function)=>{
    dispatch({
        type: 'SET_HISTORY_OPEN',
        historyOpen
    })
}
export default setHistoryOpen
