//import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import {
	IconButton,
	Typography,
	
} from "@mui/material";
import {withStyles} from '@mui/styles';
import { combine } from "../utils";
import { DayStyles, theme } from "./styles";



const Day = props => {
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
			)}>
			<IconButton
				className={combine(
					classes.button,
					!props.disabled && props.outlined && classes.outlined,
					!props.disabled && props.filled && classes.filled,
                   
				)}
				disabled={props.disabled}
				onClick={props.onClick}
				onMouseOver={props.onHover}>
				<Typography
					color={!props.disabled ? "primary.main" : "textSecondary"}
					className={combine(
						classes.buttonText,
						!props.disabled && props.filled && classes.contrast,
                        props.disabled && classes.inactive
					)}
					variant={"body2"}>
					{props.value}
				</Typography>
			</IconButton>
		</div>
		</ThemeProvider>
	);
};

export default withStyles(DayStyles)(Day);
