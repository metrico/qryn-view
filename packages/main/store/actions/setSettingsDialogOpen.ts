const setSettingsDialogOpen = (settingsDialogOpen: any) => (dispatch: Function) => {
dispatch({
    type: 'SET_SETTINGS_DIALOG_OPEN',
    settingsDialogOpen
})
}

export default setSettingsDialogOpen;