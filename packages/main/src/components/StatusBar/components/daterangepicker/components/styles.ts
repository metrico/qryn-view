import { createTheme } from "@mui/material/styles";
import { createStyles } from '@mui/styles';
import store  from "@ui/store/store"

import { darkTheme } from '@ui/theme/dark'
import { lightTheme } from '@ui/theme/light'

const actTheme:'light'|'dark' = store.getState().theme

const themes = {
    light: lightTheme,
    dark: darkTheme
}

const themeSelected = themes[actTheme]

export const DayStyles = () =>

    createStyles({
        leftBorderRadius: {
            borderRadius: "50% 0 0 50%"
        },
        rightBorderRadius: {
            borderRadius: "0 50% 50% 0"
        },
        buttonContainer: {
            display: "flex"
        },
        button: {
            height: 30,
            width: 30,
            padding: 0
        },
        maxContrast: {
            lineHeight: 1.6,
            color: themeSelected.contrast
        },
        inactive: {
            color: 'gray'
        },
        outlined: {
            border: `1px solid #11abab`
        },
        filled: {
            "&:hover": {
                backgroundColor: '#11abab',
                color: 'primary'
            },
            backgroundColor: '#11abab',
            color: 'primary'
        },

        highlighted: {
            backgroundColor: '#14b8b852'
        },
        contrast: {
            color: 'primary'
        }
    });

export const HeadingStyles = () => createStyles({

    iconContainer: {
        padding: 5,
        color: themeSelected.contrast
    },
    icon: {
        padding: 10,
        color: themeSelected.contrast,
        "&:hover": {
            color: themeSelected.contrast,
            background: "none"
        }
    },
    selector: {
        color: themeSelected.contrast,
        borderBottom: `1px solid ${themeSelected.contrast}`
    }
});



export const theme = () => {

    const theme = store.getState().theme;

    return createTheme({
    palette: {
        mode: theme,
        primary: {
            main:themeSelected.contrast
        }
    }
})
    }