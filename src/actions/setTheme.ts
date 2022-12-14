export const setTheme = (theme: any) => (dispatch: Function) => {
    dispatch({
        type: 'SET_THEME',
        theme
    });
}
