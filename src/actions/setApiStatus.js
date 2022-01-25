export default(apiStatus) => (dispatch) => {
    dispatch({
        type:'SET_API_STATUS',
        apiStatus
    })
}