import { createTheme } from "@mui/material/styles";
import { createStyles } from '@mui/styles';

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
            color: 'primary'
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

export const HeadingStyles = (theme) => createStyles({

    iconContainer: {
        padding: 5,
        color: 'primary'
    },
    icon: {
        padding: 10,
        color: 'primary',
        "&:hover": {
            color: 'primary',
            background: "none"
        }
    },
    selector: {
        color: 'primary',
        borderBottom: '1px solid primary'
    }
});


export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main:'#fff'
        }
    }
})