import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/css";
import DOMPurify from 'isomorphic-dompurify';
import {
    format,
    differenceInCalendarMonths,
    isValid,
    isDate,
    isSameSecond,
    isBefore,
} from "date-fns";
import Month from "./Month";
import Ranges from "./Ranges";
import { DATE_TIME_RANGE, MARKERS } from "../consts";
import { useDispatch } from "react-redux";
import {
    setStartTime,
    setStopTime,
    setTimeRangeLabel,
} from "../../../../../actions";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { findRangeByLabel } from "../utils";
import AbsoluteSelector from "./AbsoluteSelector";
import { useMediaQuery } from "react-responsive";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "../../../../DataViews/components/QueryBuilder/hooks";
const PickerTypeButton = styled.button`
    padding: 10px;
    border-radius: 3px;
    color: ${({ theme }:{theme:any}) => theme.textPrimaryAccent};
    font-size: 1em;
    border: none;
    background: none;
    display: flex;

    cursor: pointer;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    &:hover {
        background: #11111155;
    }
    span {
        margin-right: 4px;
        font-size: 12px;
    }
`;

const StyledNav = styled.div`
    .header {
        padding: 10px;
        justify-content: space-between;
    }
    .headerItem {
        text-align: center;
    }
    .dateComplete {
        font-size: 0.85em;
    }
    .divider {
        border-left: 1px solid action;
        margin-bottom: 20;
    }
    .container {
        position: absolute;
        z-index: 1000;
        top: 45px;
        right: 0;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        background: ${({ theme }:{theme:any}) => theme.mainBgColor};
    }
    .applyButton {
        color: white;
        background: hsl(0, 0%, 31%);
        border: 1px solid hsl(0, 0%, 31%);
        padding: 6px 8px;
        border-radius: 3px;
        margin-left: 10px;
        cursor: pointer;
    }
`;

// open month only at
export const PickerNav = (props:any) => {
    const {
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
    const theme = useTheme()
    const [calendarOpen, setCalendarOpen] = useState(false);
    const canNavigateCloser =
        differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
    const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
    const dispatch = useDispatch();
    const [editedStartDate, setEditedStartDate] = useState(dateRange.dateStart);
    const [editedEndDate, setEditedEndDate] = useState(dateRange.dateEnd);
    const [relativeOpen, setRelativeOpen] = useState(true);
    const [rangeLabel] = useState(dateRange.label);
    const isBigScreen = useMediaQuery({ query: "(min-width: 914px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
    const [startCalendar, setStartCalendar] = useState(false);
    const [stopCalendar, setStopCalendar] = useState(false);


    useEffect(() => {
        if (rangeLabel) {
            const newRange:any = findRangeByLabel(rangeLabel);
            setEditedStartDate(newRange.dateStart);
            setEditedEndDate(newRange.dateEnd);
        }
    }, [setEditedEndDate, setEditedStartDate, rangeLabel]);
    const handleStopInputChange = (event:any, isBlur:any) => {
        event.preventDefault();
        const value = new Date(event.target.value);
        if (isBlur && isValid(value)) {
            setEditedEndDate(value);
        } else {
            setEditedEndDate(event.target.value);
        }
    };
    const handleStartInputChange = (event:any, isBlur:any) => {
        event.preventDefault();
        const value = new Date(event.target.value);
        if (isBlur && isValid(value)) {
            setEditedStartDate(value);
        } else {
            setEditedStartDate(event.target.value);
        }
    };

    const onTimeRangeSet = (e:any) => {
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
            console.log("Invalid time range");
        }
    };

    const saveDateRange = (range:any) => {
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
    const openRelative = () => {
        setRelativeOpen((open) => (open ? false : true));
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledNav>
                <Paper className={"container"} elevation={5}>
                    <Grid display={"flex"} style={{ flex: "1" }}>
                        {calendarOpen && isBigScreen && (
                            <Grid container direction={"row"} wrap={"nowrap"}>
                                <Month
                                    {...commonProps}
                                    value={DOMPurify.sanitize(firstMonth)}
                                    setValue={setFirstMonth}
                                    navState={[true, canNavigateCloser]}
                                    marker={MARKERS.FIRST_MONTH}
                                />
                                <div className={"divider"} />
                                <Month
                                    {...commonProps}
                                    value={DOMPurify.sanitize(secondMonth)}
                                    setValue={setSecondMonth}
                                    navState={[canNavigateCloser, true]}
                                    marker={MARKERS.SECOND_MONTH}
                                />
                            </Grid>
                        )}
                        {calendarOpen &&
                            !isBigScreen &&
                            !isPortrait &&
                            !relativeOpen && (
                                <Grid
                                    container
                                    direction={"row"}
                                    wrap={"nowrap"}
                                >
                                    {startCalendar && (
                                        <Month
                                            {...commonProps}
                                            value={DOMPurify.sanitize(firstMonth)}
                                            setValue={setFirstMonth}
                                            navState={[true, canNavigateCloser]}
                                            marker={MARKERS.FIRST_MONTH}
                                        />
                                    )}

                                    {stopCalendar && (
                                        <Month
                                            {...commonProps}
                                            value={DOMPurify.sanitize(secondMonth)}
                                            setValue={setSecondMonth}
                                            navState={[canNavigateCloser, true]}
                                            marker={MARKERS.SECOND_MONTH}
                                        />
                                    )}
                                </Grid>
                            )}

                        <Grid display={"flex"} flex={1}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: "1",
                                }}
                            >
                                {isTabletOrMobile && (
                                    <>
                                        <div
                                            style={{
                                                maxHeight: isPortrait
                                                    ? "60vh"
                                                    : "50vh",
                                                overflowY: "auto",

                                                display: relativeOpen
                                                    ? "flex"
                                                    : "none",
                                                flex: 1,
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Ranges
                                                selectedRange={dateRange}
                                                isHorizontal={!isPortrait}
                                                ranges={ranges}
                                                setRange={setDateRange}
                                                onClose={props.onClose}
                                            />
                                        </div>

                                        <AbsoluteSelector
                                            styles={!relativeOpen}
                                            getEditedStartDate={
                                                getEditedStartDate
                                            }
                                            isHorizontal={!isPortrait}
                                            isMobile={true}
                                            isFullCalendar={false}
                                            getEditedEndDate={getEditedEndDate}
                                            handleStart={handleStartInputChange}
                                            handleStop={handleStopInputChange}
                                            onTimeRangeSet={onTimeRangeSet}
                                            calendarOpen={calendarOpen}
                                            stopCalendarOpen={stopCalendar}
                                            startCalendarOpen={startCalendar}
                                            setCalendarOpen={setCalendarOpen}
                                            setStopCalendar={setStopCalendar}
                                            setStartCalendar={setStartCalendar}
                                        />
                                        {isTabletOrMobile && (
                                            <PickerTypeButton
                                                onClick={openRelative}
                                                theme={theme}
                                            >
                                                <span>
                                                    {relativeOpen
                                                        ? "Set Absolute Time"
                                                        : "Set Relative Time"}
                                                </span>

                                                <ArrowForwardIosIcon
                                                    className={css`
                                                        font-size: 12px;
                                                    `}
                                                />
                                            </PickerTypeButton>
                                        )}
                                    </>
                                )}
                                {!isTabletOrMobile && (
                                    <AbsoluteSelector
                                        styles={true}
                                        isMobile={false}
                                        isFullCalendar={true}
                                        getEditedStartDate={getEditedStartDate}
                                        getEditedEndDate={getEditedEndDate}
                                        handleStart={handleStartInputChange}
                                        handleStop={handleStopInputChange}
                                        onTimeRangeSet={onTimeRangeSet}
                                        calendarOpen={calendarOpen}
                                        setCalendarOpen={setCalendarOpen}
                                    />
                                )}

                                {calendarOpen &&
                                    isTabletOrMobile &&
                                    !relativeOpen && (
                                        <Grid
                                            container
                                            direction={"row"}
                                            wrap={"nowrap"}
                                        >
                                            {startCalendar && (
                                                <Month
                                                    {...commonProps}
                                                    value={DOMPurify.sanitize(firstMonth)}
                                                    setValue={setFirstMonth}
                                                    navState={[
                                                        true,
                                                        canNavigateCloser,
                                                    ]}
                                                    marker={MARKERS.FIRST_MONTH}
                                                />
                                            )}

                                            {stopCalendar && (
                                                <Month
                                                    {...commonProps}
                                                    value={DOMPurify.sanitize(secondMonth)}
                                                    setValue={setSecondMonth}
                                                    navState={[
                                                        canNavigateCloser,
                                                        true,
                                                    ]}
                                                    marker={
                                                        MARKERS.SECOND_MONTH
                                                    }
                                                />
                                            )}
                                        </Grid>
                                    )}
                            </div>

                            <div className={"divider"} />

                            {isBigScreen && (
                                <Grid style={{ display: "flex", flex: 1 }}>
                                    <Ranges
                                        selectedRange={dateRange}
                                        ranges={ranges}
                                        setRange={setDateRange}
                                        onClose={props.onClose}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </StyledNav>
        </ThemeProvider>
    );
};
