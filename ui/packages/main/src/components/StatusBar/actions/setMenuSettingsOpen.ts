export const setSettingsMenuOpen = ( settingsMenuOpen : any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_SETTINGS_MENU_OPEN',
        settingsMenuOpen
    })
}