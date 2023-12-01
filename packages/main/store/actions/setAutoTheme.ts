import { Dispatch } from "react";
interface AutoThemeDispatch {
    type: 'SET_AUTO_THEME',
    autoTheme: boolean
}
export const setAutoTheme = (autoTheme: boolean) => (dispatch: Dispatch<AutoThemeDispatch>) => {
    dispatch({
        type: 'SET_AUTO_THEME',
        autoTheme
    });
}
