import {
	Grid,
	IconButton,
	Select,
	MenuItem,
	
} from "@mui/material";

import { withStyles,ThemeProvider, } from '@mui/styles';
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";
import { MONTHS } from "../consts";
import { HeadingStyles, theme } from "./styles";
import { generateYears } from "../utils";


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
				<Grid item className={classes.iconContainer}>
					<IconButton

						disabled={prevDisabled}
						onClick={onClickPrevious}>
						<ChevronLeft 
						color={prevDisabled ? "disabled" : "active"} />
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
					<IconButton 
					disabled={nextDisabled} onClick={onClickNext}>
						<ChevronRight color={nextDisabled ? "disabled" : "active"} />
					</IconButton>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};

export default withStyles(HeadingStyles)(Heading);