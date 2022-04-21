import React, { useState, useEffect } from "react";

import {
    addMonths,
    isSameDay,
    isWithinInterval,
    isAfter,
    isBefore,
    isDate,
    isSameMonth,
    addYears,
    max,
    min,
    format,
    isValid,
} from "date-fns";

import Nav from "./components/Nav";
import {
    findRangeByLabel,
    getDefaultRanges,
    getValidatedMonths,
    parseOptionalDate,
} from "./utils";
import { DATE_TIME_RANGE, MARKERS } from "./consts";
import { theme } from "./components/styles";
import { ThemeProvider } from "@emotion/react";
import {
    setRangeOpen,
    setStartTime,
    setTimeRangeLabel,
    setStopTime,
} from "../../../../actions";

import { useSelector, useDispatch } from "react-redux";
import useOutsideRef from "./hooks/useOutsideRef";

import store from "../../../../store/store";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Tooltip } from "@mui/material";
import loadLogs from "../../../../actions/loadLogs";
import { setLabelsBrowserOpen } from "../../../../actions/setLabelsBrowserOpen";



import TimeLabel from "./components/TimeLabel";
import { DatePickerButton } from "../../styled";


export function DateRangePickerMain(props) {
    const today = Date.now();
    const { isOpen, minDate, maxDate } = props;

    const startTs = useSelector((store) => store.start);
    const stopTs = useSelector((store) => store.stop);
    const initialDateRange = () => {
        try {
            const ls = JSON.parse(localStorage.getItem(DATE_TIME_RANGE));
            if (ls?.label !== "" && typeof ls.label !== "undefined") {
                const range = findRangeByLabel(ls?.label);
                ls.dateStart = range.dateStart;
                ls.dateEnd = range.dateEnd;
            } else {
                ls.dateStart = new Date(ls.dateStart);
                ls.dateEnd = new Date(ls.dateEnd);
            }
            return ls;
        } catch (e) {
            if (isDate(startTs) && isDate(stopTs)) {
                return { dateStart: startTs, dateEnd: stopTs };
            }
        }
    };

    const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
    const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
    const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
        initialDateRange() || {},
        minDateValid,
        maxDateValid
    );
    const [dateRange, setDateRange] = useState({ ...initialDateRange() });
    const [hoverDay, setHoverDay] = useState();
    const [firstMonth, setFirstMonth] = useState(intialFirstMonth || today);
    const [secondMonth, setSecondMonth] = useState(
        initialSecondMonth || addMonths(firstMonth, 1)
    );
    const [timeLabel, setTimeLabel] = useState("");
    const dispatch = useDispatch();

    const rangeOpen = useSelector((store) => store.rangeOpen);
    const range = useSelector((store) => ({
        dateStart: store.start,
        dateEnd: store.stop,
        label: store.label,
    }));

    useEffect(() => {
        setTimeLabel(range.label);
    }, [range]);

    const { dateStart, dateEnd } = dateRange;

    const { ref } = useOutsideRef(true);


    const setFirstMonthValidated = (date) => {
        if (isBefore(date, secondMonth)) {
            setFirstMonth(date);
        }
    };

    const setSecondMonthValidated = (date) => {
        if (isAfter(date, firstMonth)) {
            setSecondMonth(date);
        }
    };

    const setDateRangeValidated = (range) => {
        let { label, dateStart: newStart, dateEnd: newEnd } = range;
        if (newStart && newEnd) {
            range.label = label;
            range.dateStart = newStart = max([newStart, minDateValid]);
            range.dateEnd = newEnd = min([newEnd, maxDateValid]);
            setDateRange(range);
            saveDateRange(range);
            onChange(range);
            setFirstMonth(newStart);
            setSecondMonth(
                isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
            );
        }
    };
    const saveDateRange = (range) => {
        localStorage.setItem(DATE_TIME_RANGE, JSON.stringify(range));
    };
    const onDayClick = (day) => {
        if (dateStart && !dateEnd && !isBefore(day, dateStart)) {
            const newRange = { dateStart, dateEnd: day };
            onChange(newRange);
            saveDateRange(newRange);
            setDateRange(newRange);
            dispatch(setTimeRangeLabel(""));
            onClose();
        } else {
            setDateRange({ dateStart: day, dateEnd: undefined });
        }
        setHoverDay(day);
    };

    const onMonthNavigate = (marker, action) => {
        if (marker === MARKERS.FIRST_MONTH) {
            const firstNew = addMonths(firstMonth, action);
            if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
        } else {
            const secondNew = addMonths(secondMonth, action);
            if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
        }
    };

    const onDayHover = (date) => {
        if (dateStart && !dateEnd) {
            if (!hoverDay || !isSameDay(date, hoverDay)) {
                setHoverDay(date);
            }
        }
    };
    const onClose = (e = null) => {
        const { query } = store.getState();
        e?.preventDefault();
        if (query.length > 0) {
            dispatch(setLabelsBrowserOpen(false));
            dispatch(loadLogs());
        } else {
            console.log("Please make a log query", query);
        }
        dispatch(setRangeOpen(false));
        isOpen(e);
    };

    const inHoverRange = (day) => {
        return (
            dateStart &&
            !dateEnd &&
            hoverDay &&
            isAfter(hoverDay, dateStart) &&
            isWithinInterval(day, {
                start: dateStart,
                end: hoverDay,
            })
        );
    };


    const helpers = {
        inHoverRange,
    };

    const handlers = {
        onDayClick,
        onDayHover,
        onMonthNavigate,
    };

    function onChange({ dateStart, dateEnd, label }) {
        const isStart = isDate(dateStart);
        const isEnd = isDate(dateEnd);
        const isLabel = typeof label !== "undefined";
        if (isStart) dispatch(setStartTime(dateStart));
        if (isEnd) dispatch(setStopTime(dateEnd));
        if (isLabel) dispatch(setTimeRangeLabel(label));
    }

    const openButtonHandler = (e) => {
        e.preventDefault();
        if (rangeOpen === true) {
            onClose(e);
          
        } else {
            dispatch(setRangeOpen(true));
         
        }
    };

    return (
        <div>
            <Tooltip
                title={timeLabel ? <TimeLabel dateRange={dateRange} /> : ""}
            >
                <DatePickerButton
                    
                    onClick={openButtonHandler}
                    className={"date-time-selector"}
                >
                    <AccessTimeOutlinedIcon />

                    <span>
                        {timeLabel
                            ? timeLabel
                            : (isValid(dateRange.dateStart)
                                  ? format(
                                        dateRange.dateStart,
                                        "yyyy/MM/dd HH:mm:ss"
                                    )
                                  : dateRange.dateStart) +
                              "-" +
                              (isValid(dateRange.dateEnd)
                                  ? format(
                                        dateRange.dateEnd,
                                        "yyyy/MM/dd HH:mm:ss"
                                    )
                                  : typeof dateRange.dateEnd !== "undefined"
                                  ? dateRange.dateEnd
                                  : "")}
                    </span>
                </DatePickerButton>
            </Tooltip>
            {rangeOpen ? (
                <div tabIndex={"0"} ref={ref}>
                    <ThemeProvider theme={theme}>
                        <Nav
                            dateRange={dateRange}
                            minDate={minDateValid}
                            maxDate={maxDateValid}
                            ranges={getDefaultRanges(new Date())}
                            firstMonth={firstMonth}
                            secondMonth={secondMonth}
                            setFirstMonth={setFirstMonthValidated}
                            setSecondMonth={setSecondMonthValidated}
                            setDateRange={setDateRangeValidated}
                            helpers={helpers}
                            handlers={handlers}
                            onClose={onClose}
                        />
                    </ThemeProvider>
                </div>
            ) : null}
        </div>
    );
}
export const DateRangePicker = DateRangePickerMain;

//shouldnt be at same div!! 


