import {
	Grid,
	createStyles,
	withStyles,
	IconButton,
	Select,
	MenuItem,
    Typography,
    createTheme,
    ThemeProvider,
} from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";

import * as moment from 'moment';

const styles = createStyles({

	iconContainer: {
		padding: 5,
        color:'primary'
	},
	icon: {
		padding: 10,
        color:'primary',
		"&:hover": {
            color:'primary',
			background: "none"
		}
	},
    selector: {
        color:'primary',
        borderBottom: '1px solid primary'
    }
});
const theme = createTheme({
    palette: {
        type: 'dark'
    }
})

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec"
];

const generateYears = (relativeTo, count) => {
	const half = Math.floor(count / 2);
	return Array(count)
		.fill(0)
		.map((y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Heading = ({
	date,
	classes,
	setDate,
	nextDisabled,
	prevDisabled,
	onClickNext,
	onClickPrevious
}) => {
	const handleMonthChange = (event) => {
		setDate(setMonth(date, parseInt(event.target.value)));
	};

	const handleYearChange = (event) => {
		setDate(setYear(date, parseInt(event.target.value)));
	};

	return (
        <ThemeProvider theme={theme}>
		<Grid container justifyContent="space-between" >
			<Grid item >
				<IconButton
					
					disabled={prevDisabled}
					onClick={onClickPrevious}>
					<ChevronLeft color={prevDisabled ? "disabled" : "inherit"} />
				</IconButton>
			</Grid>
			<Grid item>
				<Select
              
					value={getMonth(date)}
					onChange={handleMonthChange}
					MenuProps={{ disablePortal: true }}>
					{MONTHS.map((month, idx) => (
						<MenuItem key={month} value={idx}>
							{month}
						</MenuItem>
					))}
				</Select>
			</Grid>

			<Grid item>
				<Select
                   
					value={getYear(date)}
					onChange={handleYearChange}
					MenuProps={{ disablePortal: true }}>
					{generateYears(date, 30).map(year => (
						<MenuItem key={year} value={year}>
							{year}
						</MenuItem>
					))}
				</Select>
			</Grid>
			<Grid item className={classes.iconContainer}>
				<IconButton className={classes.icon} disabled={nextDisabled} onClick={onClickNext}>
					<ChevronRight color={nextDisabled ? "disabled" : "inherit"} />
				</IconButton>
			</Grid>
		</Grid>
        </ThemeProvider>
	);
};

export default withStyles(styles)(Heading);