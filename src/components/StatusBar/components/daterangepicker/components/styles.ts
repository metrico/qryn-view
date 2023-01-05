import { createTheme } from "@mui/material/styles";
import { createStyles } from '@mui/styles';
import  store  from '../../../../../store/store'
import {themes} from '../../../../../theme/themes'
const actTheme:'light'|'dark' = store.getState().theme
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
        buttonText: {
            lineHeight: 1.6,
            color: themeSelected.textColor
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
        color: themeSelected.textColor
    },
    icon: {
        padding: 10,
        color: themeSelected.textColor,
        "&:hover": {
            color: themeSelected.textColor,
            background: "none"
        }
    },
    selector: {
        color: themeSelected.textColor,
        borderBottom: `1px solid ${themeSelected.textColor}`
    }
});



export const theme = () => {

    const theme = store.getState().theme;

    return createTheme({
    palette: {
        mode: theme,
        primary: {
            main:themeSelected.textColor
        }
    }
})
    }