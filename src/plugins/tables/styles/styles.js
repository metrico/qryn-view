import { css } from "@emotion/css";

import { getScrollbarWidth } from "../../utils";
import { createTheme } from "@emotion/styled";
import { createContext, useContext } from "react";
import { store } from "../../../store/store";
import { themes } from "../../../theme/themes";
import memoizeOne from "memoize-one";


let ThemeContextMock = null;

export function stylesFactory(stylesCreator) {
    return memoizeOne(stylesCreator);
}
const theme = store.getState().theme;
export const memoizedStyleCreators = new WeakMap();

let ThemeContext = createContext(createTheme(themes[theme]));

ThemeContext.displayName = "ThemeContext";

export function useTheme2() {
    return useContext(ThemeContextMock || ThemeContext);
}

export function useStyles2(getStyles) {
    const theme = useTheme2();
    let memoizedStyleCreator = memoizedStyleCreators.get(getStyles);
    if (!memoizedStyleCreator) {
        memoizedStyleCreator = stylesFactory(getStyles);
        memoizedStyleCreators.set(getStyles, memoizedStyleCreator);
    }
    return memoizedStyleCreator(theme);
}
