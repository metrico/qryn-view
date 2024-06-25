const setTimePickerOpen = (timePickerOpen: any) => (dispatch) => {
    dispatch({
        type: 'SET_TIME_PICKER_OPEN',
        timePickerOpen
    })
}
export default setTimePickerOpen;