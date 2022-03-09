 const setHistoryOpen = (historyOpen) => (dispatch)=>{
    dispatch({
        type: 'SET_HISTORY_OPEN',
        historyOpen
    })
}
export default setHistoryOpen
