const setTimePickerOpen = (timePickerOpen) => (dispatch) => {
    dispatch({
        type: 'SET_TIME_PICKER_OPEN',
        timePickerOpen
    })
}
export default setTimePickerOpen;