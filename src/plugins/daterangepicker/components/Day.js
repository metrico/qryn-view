//import * as React from "react";
import {
	IconButton,
	Typography,
	createStyles,
	withStyles
} from "@material-ui/core";
import { combine } from "../utils";


const styles = (theme) =>
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
			height: 36,
			width: 36,
			padding: 0
		},
		buttonText: {
			lineHeight: 1.6,
            color:'primary'
		},
        inactive: {
            color:'gray'
        },
		outlined: {
			border: `1px solid #11abab`
		},
		filled: {
			"&:hover": {
				backgroundColor: '#11abab',
                color:'primary'
			},
			backgroundColor: '#11abab',
            color:'primary'
		},

		highlighted: {
			backgroundColor: '#14b8b852'
		},
		contrast: {
			color: 'primary'
		}
	});

const Day = props => {
	const { classes } = props;
	return (
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
					color={!props.disabled ? "textPrimary" : "textSecondary"}
					className={combine(
						classes.buttonText,
						!props.disabled && props.filled && classes.contrast,
                        props.disabled && classes.inactive
					)}
					variant="body2">
					{props.value}
				</Typography>
			</IconButton>
		</div>
	);
};

export default withStyles(styles)(Day);