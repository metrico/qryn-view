import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import { withStyles } from "@mui/styles";
import {
    format,
    differenceInCalendarMonths,
    isValid,
    isDate,
    isSameSecond,
    isBefore,
} from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Month from "./Month";
import Ranges from "./Ranges";
import CloseIcon from "@mui/icons-material/Close";
import { DATE_TIME_RANGE, MARKERS } from "../consts";
import { useDispatch } from "react-redux";
import {
    setStartTime,
    setStopTime,
    setTimeRangeLabel,
} from "../../../../../actions";
import { findRangeByLabel } from "../utils";
import AbsoluteSelector from "./AbsoluteSelector";

const styles = (theme) =>
    createStyles({
        header: {
            padding: "10px",
			justifyContent:"space-between"
        },
        headerItem: {
          
            textAlign: "center",
        },
		dateComplete:{
			fontSize:".85em",
		},
        divider: {
            borderLeft: `1px solid action`,
            marginBottom: 20,
        },
        container: {
            position: "absolute",
            zIndex: 1000,
            top: 95,
            right: 10,
			display:'flex'
        },
        applyButton: {
            color: "white",
            background: "#4f4f4f",
            border: "1px solid #4f4f4f",
            padding: "6px 8px",
            borderRadius: "3px",
            marginLeft: "10px",
            cursor: "pointer",
        },
    });

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});
const PickerNav = (props) => {
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
        handlers,
    } = props;

	const [calendarOpen,setCalendarOpen] = useState(false)
    const canNavigateCloser =
        differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
    const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
    const dispatch = useDispatch();
    const [editedStartDate, setEditedStartDate] = useState(dateRange.dateStart);
    const [editedEndDate, setEditedEndDate] = useState(dateRange.dateEnd);
    const [rangeLabel] = useState(dateRange.label);
    useEffect(() => {
        if (rangeLabel) {
            const newRange = findRangeByLabel(rangeLabel);
            setEditedStartDate(newRange.dateStart);
            setEditedEndDate(newRange.dateEnd);
        }
    }, [setEditedEndDate, setEditedStartDate, rangeLabel]);
    const handleStopInputChange = (event, isBlur) => {
        event.preventDefault();
        const value = new Date(event.target.value);
        if (isBlur && isValid(value)) {
            setEditedEndDate(value);
        } else {
            setEditedEndDate(event.target.value);
        }
    };
    const handleStartInputChange = (event, isBlur) => {
        event.preventDefault();
        const value = new Date(event.target.value);
        if (isBlur && isValid(value)) {
            setEditedStartDate(value);
        } else {
            setEditedStartDate(event.target.value);
        }
    };

    const onTimeRangeSet = (e) => {
        e.preventDefault();
        const startDate = new Date(editedStartDate);
        const endDate = new Date(editedEndDate);
        if (
            isDate(startDate) &&
            !isSameSecond(dateRange.dateStart, startDate)
        ) {
            dispatch(setStartTime(startDate));
            setEditedStartDate(startDate);
        }
        if (isValid(endDate) && !isSameSecond(dateRange.dateEnd, endDate)) {
            dispatch(setStopTime(endDate));
            setEditedEndDate(endDate);
        }
        const isValidDate = isValid(endDate) && isDate(startDate);
        const isValidInterval = isBefore(startDate, endDate);
        const isChanged =
            !isSameSecond(dateRange.dateStart, startDate) ||
            !isSameSecond(dateRange.dateEnd, endDate);
        if (isValidDate && isValidInterval && isChanged) {
            dispatch(setTimeRangeLabel(""));
            setDateRange({ dateStart: startDate, dateEnd: endDate });
            saveDateRange({ dateStart: startDate, dateEnd: endDate });
            props.onClose(e);
        } else if (!isValidInterval) {
            // TODO: Add a warning/error on screen when we get to it
            console.error("Invalid time range");
        }
    };

    const saveDateRange = (range) => {
        localStorage.setItem(DATE_TIME_RANGE, JSON.stringify(range));
    };
    const getEditedStartDate = () => {
        return isValid(editedStartDate)
            ? format(editedStartDate, "yyy-MM-dd HH:mm:ss")
            : editedStartDate;
    };
    const getEditedEndDate = () => {
        return isValid(editedEndDate)
            ? format(editedEndDate, "yyy-MM-dd HH:mm:ss")
            : typeof editedEndDate !== "undefined"
            ? editedEndDate
            : "";
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper className={classes.container} elevation={5}>
			{ calendarOpen && (<Grid
                            container
                            direction={"row"}
                        
                            wrap={"nowrap"}
                        >
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
                        </Grid> )}
                <Grid container direction={"row"} wrap={"nowrap"}>
                    <Grid>
                        <Grid container>
                            <Grid item>
                                <IconButton
                                    onClick={(e) => {
                                        props.onClose(e);
                                    }}
                                    aria-label={"close"}
                                >
                                    <CloseIcon />
                                </IconButton>

                                <AbsoluteSelector
                                    getEditedStartDate={getEditedStartDate}
                                    getEditedEndDate={getEditedEndDate}
                                    handleStart={handleStartInputChange}
                                    handleStop={handleStopInputChange}
                                    onTimeRangeSet={onTimeRangeSet}
									calendarOpen={calendarOpen}
									setCalendarOpen={setCalendarOpen}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className={classes.header}
                            alignItems={"center"}
                        >
                            <Grid item className={classes.headerItem}>
                                <div className={classes.dateComplete}>
                                    {dateRange?.dateStart &&
                                    isValid(dateRange?.dateStart)
                                        ? format(
                                              dateRange?.dateStart,
                                              "MMMM dd, yyyy"
                                          )
                                        : "Start Date"}
                                </div>
                            </Grid>
                            <Grid item className={classes.headerItem}>
                                <ArrowRightAlt />
                            </Grid>
                            <Grid item className={classes.headerItem}>
							<div className={classes.dateComplete}>
                                    {dateRange?.dateEnd &&
                                    isValid(dateRange?.dateEnd)
                                        ? format(
                                              dateRange?.dateEnd,
                                              "MMMM dd, yyyy"
                                          )
                                        : "End Date"}
                                </div>
                            </Grid>
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
// open month only at
export default withStyles(styles)(PickerNav);
