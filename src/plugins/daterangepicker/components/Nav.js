import React, { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import { withStyles } from '@mui/styles'
import { format, differenceInCalendarMonths, isValid, isDate, isSameSecond } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Month from "./Month";
import Ranges from "./Ranges";
import CloseIcon from '@mui/icons-material/Close';
import { DATE_TIME_RANGE, MARKERS } from "../consts";
import { useDispatch, useSelector } from "react-redux";
import { setStartTime, setStopTime } from "../../../actions";

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
		applyButton: {
			color: 'white',
			background: '#4f4f4f',
			border: '1px solid #4f4f4f',
			padding: '6px 8px',
			borderRadius: '3px',
			marginLeft: '10px',
			cursor: 'pointer'
		}
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
	const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
	const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
	const dispatch = useDispatch()
	const [editedStartDate, setEditedStartDate] = useState(dateRange.dateStart)
	const [editedEndDate, setEditedEndDate] = useState(dateRange.dateEnd)

	const handleStopInputChange = (event) => {
		event.preventDefault()
		const value = new Date(event.target.value);
        if (isValid(value)) {
		    setEditedEndDate(value)
        }
    }
	const handleStartInputChange = (event) => {
		event.preventDefault()
		const value = new Date(event.target.value);
        if (isValid(value)) {        
		    setEditedStartDate(value);
        }
	}


	const onTimeRangeSet = (e) => {
		e.preventDefault()
        const startDate = new Date(editedStartDate)
		const endDate = new Date(editedEndDate)
        console.log(editedStartDate)
		if (isDate(startDate) && !isSameSecond(dateRange.dateStart, startDate)) {
			dispatch(setStartTime(startDate));
            setEditedStartDate(startDate)
		}
		if (isValid(endDate) && !isSameSecond(dateRange.dateEnd, endDate)) {
			dispatch(setStopTime(endDate));
            setEditedEndDate(endDate)
		}
		if (isValid(endDate) && isDate(startDate) && (!isSameSecond(dateRange.dateStart, startDate) || !isSameSecond(dateRange.dateEnd, endDate))) {
            setDateRange({dateStart: startDate, dateEnd: endDate})
            saveDateRange({dateStart: startDate, dateEnd: endDate});
		}
	}
    
    const saveDateRange = (range) => {
        localStorage.setItem(DATE_TIME_RANGE, JSON.stringify(range));
    }
	const getEditedStartDate = () => {
		return isValid(editedStartDate) ? format(editedStartDate, 'yyy-MM-dd HH:mm:ss') : editedStartDate
	}
	const getEditedEndDate = () => {
		return isValid(editedEndDate) ? format(editedEndDate, 'yyy-MM-dd HH:mm:ss') : typeof editedEndDate !== 'undefined' ? editedEndDate : ""
	}
	const dateTimeBarStyle = {
		display: 'flex',
		alignItems: 'center'
	}
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

									onClick={e => {
                                        props.onClose(e)
                                    }}
									aria-label="close">
									<CloseIcon />
								</IconButton>


								<div className='status-selectors'>
									<div className="selector">
										<span className='label'>From</span>
										<input
											className='date-time-range'
											value={getEditedStartDate()}
											onChange={handleStartInputChange}
										/>
									</div>

									<div className='selector'>
										<span className='label'>To</span>
										<input className='date-time-range'
											value={getEditedEndDate()}
											onChange={handleStopInputChange}
										/>
									</div>
									<button
										className={classes.applyButton}
										onClick={e => {
											onTimeRangeSet(e)
											props.onClose(e)
										}}

									>Apply Time Range</button>
								</div>






							</Grid>

						</Grid>


						<Grid container className={classes.header} alignItems="center">
							<Grid item className={classes.headerItem}>
								<Typography

									variant="subtitle1">
									{dateRange?.dateStart && isValid(dateRange?.dateStart) ? format(dateRange?.dateStart, "MMMM dd, yyyy") : "Start Date"}
								</Typography>
							</Grid>
							<Grid item className={classes.headerItem}>
								<ArrowRightAlt />
							</Grid>
							<Grid item className={classes.headerItem}>
								<Typography

									variant="subtitle1">
									{dateRange?.dateEnd && isValid(dateRange?.dateEnd) ? format(dateRange?.dateEnd, "MMMM dd, yyyy") : "End Date"}
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
                            onClose={props.onClose}
						/>
					</Grid>
				</Grid>
			</Paper>

		</ThemeProvider>
	);
};

export default withStyles(styles)(PickerNav);