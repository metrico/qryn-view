export const setSettingsMenuOpen = ( settingsMenuOpen : any) => (dispatch) => {
    dispatch({
        type: 'SET_SETTINGS_MENU_OPEN',
        settingsMenuOpen
    })
}