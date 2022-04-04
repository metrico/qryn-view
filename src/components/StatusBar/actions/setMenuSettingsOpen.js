export const setSettingsMenuOpen = ( settingsMenuOpen ) => (dispatch) => {
    dispatch({
        type: 'SET_SETTINGS_MENU_OPEN',
        settingsMenuOpen
    })
}