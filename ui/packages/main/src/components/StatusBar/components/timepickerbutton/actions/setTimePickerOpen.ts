const setTimePickerOpen = (timePickerOpen: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_TIME_PICKER_OPEN',
        timePickerOpen
    })
}
export default setTimePickerOpen;