
import {
	Paper,
	Grid,
	Typography,
	Divider,
	IconButton,
	createTheme,
	ThemeProvider
} from "@mui/material";
import { withStyles,createStyles } from '@mui/styles'
import { format, differenceInCalendarMonths } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Month from "./Month";
import Ranges from "./Ranges";
import CloseIcon from '@mui/icons-material/Close';
import { MARKERS } from "../consts";


const styles = (theme) =>
    createStyles({
        header: {
            padding: "10px 35px"
        },
        headerItem: {
            flex: 1,
            textAlign: "center"
        },
        divider: {
            borderLeft: `1px solid action`,
            marginBottom: 20
        },
        container: {
         
            position: 'absolute',
            zIndex: 1000,
            top: 95,
            right: 10

        },

    });
	const theme = createTheme({
		palette: {
			mode: 'dark'
		}
	})
const PickerNav = props => {
	const {
		classes,
		ranges,
		dateRange,
		minDate,
		maxDate,
		firstMonth,
		setFirstMonth,
		secondMonth,
		setSecondMonth,
		setDateRange,
		helpers,
		handlers
	} = props;
	const { dateStart, dateEnd } = dateRange;
	const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
	const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
	return (
		<ThemeProvider theme={theme}>

		<Paper
			className={classes.container}
			elevation={5} >
			<Grid container direction="row" wrap="nowrap">
				<Grid>
					<Grid container>
						<Grid item>
							<IconButton
							
								onClick={props.onClose}
								aria-label="close">
								<CloseIcon />
							</IconButton>
						</Grid>

					</Grid>


					<Grid container className={classes.header} alignItems="center">
						<Grid item className={classes.headerItem}>
							<Typography
						
								variant="subtitle1">
								{dateStart ? format(dateStart, "MMMM dd, yyyy") : "Start Date"}
							</Typography>
						</Grid>
						<Grid item className={classes.headerItem}>
							<ArrowRightAlt />
						</Grid>
						<Grid item className={classes.headerItem}>
							<Typography

								variant="subtitle1">
								{dateEnd ? format(dateEnd, "MMMM dd, yyyy") : "End Date"}
							</Typography>
						</Grid>
					</Grid>
					<Divider />
					<Grid container direction="row" justifyContent="center" wrap="nowrap">
						<Month
							{...commonProps}
							value={firstMonth}
							setValue={setFirstMonth}
							navState={[true, canNavigateCloser]}
							marker={MARKERS.FIRST_MONTH}
						/>
						<div className={classes.divider} />
						<Month
							{...commonProps}
							value={secondMonth}
							setValue={setSecondMonth}
							navState={[canNavigateCloser, true]}
							marker={MARKERS.SECOND_MONTH}
						/>
					</Grid>
				</Grid>
				<div className={classes.divider} />
				<Grid>
					<Ranges
						selectedRange={dateRange}
						ranges={ranges}
						setRange={setDateRange}
					/>
				</Grid>
			</Grid>
		</Paper>
		
		</ThemeProvider>
	);
};

export default withStyles(styles)(PickerNav);