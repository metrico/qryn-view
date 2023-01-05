//import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { createStyles } from "@mui/styles";
import { IconButton, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { combine } from "../utils";
import { theme } from "./styles";

const DayStyles = () => {
    return createStyles({
        leftBorderRadius: {
            borderRadius: "50% 0 0 50%",
        },
        rightBorderRadius: {
            borderRadius: "0 50% 50% 0",
        },
        buttonContainer: {
            display: "flex",
        },
        button: {
            height: 30,
            width: 30,
            padding: 0,
        },

        inactive: {
            color: "gray",
        },
        outlined: {
            border: `1px solid #11abab`,
        },
        buttonText: {
            lineHeight: 1.6,
            color: "primary",
        },
        filled: {
            "&:hover": {
                backgroundColor: "#11abab",
                color: "text.primary",
            },
            backgroundColor: "#11abab",
            color: "text.primary",
        },

        highlighted: {
            backgroundColor: "#14b8b852",
        },
        contrast: {
            color: "text.primary",
        },
    });
};

const Day = (props: any) => {
    // use theme as props for Day
    const { classes } = props;
    return (
        <ThemeProvider theme={theme}>
            <div
                className={combine(
                    classes.buttonContainer,
                    props.startOfRange && classes.leftBorderRadius,
                    props.endOfRange && classes.rightBorderRadius,
                    !props.disabled && props.highlighted && classes.highlighted,
                    props.disabled && classes.disabled
                )}
            >
                <IconButton
                    className={combine(
                        classes.button,
                        !props.disabled && props.outlined && classes.outlined,
                        !props.disabled && props.filled && classes.filled
                    )}
                    disabled={props.disabled}
                    onClick={props.onClick}
                    onMouseOver={props.onHover}
                >
                    <Typography
                        color={
                            !props.disabled ? "text.primary" : "text.secondary"
                        }
                        className={combine(
                            classes.buttonText,
                            !props.disabled && props.filled && classes.contrast,
                            props.disabled && classes.inactive
                        )}
                        variant={"body2"}
                    >
                        {props.value}
                    </Typography>
                </IconButton>
            </div>
        </ThemeProvider>
    );
};

export default withStyles(DayStyles)(Day);
