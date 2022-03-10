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
    isSameMinute,
} from "date-fns";

import Nav from "./components/Nav";
import { defaultRanges, getDefaultRanges, getValidatedMonths, parseOptionalDate } from "./utils";
import { DATE_TIME_RANGE, MARKERS } from "./consts";
import { theme } from "./components/styles";
import { ThemeProvider } from "@emotion/react";
import { setRangeOpen, setStartTime, setTimeRangeLabel, setStopTime } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import useOutsideRef from "./hooks/useOutsideRef";
import store from '../../store/store'
import loadLogs from "../../actions/loadLogs"
import { setLabelsBrowserOpen } from "../../actions/setLabelsBrowserOpen";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Tooltip } from "@mui/material";
export function DateRangePickerMain(props) {
    const today = Date.now();
    const {
        open,
        onChange,
        initialDateRange,
        minDate,
        maxDate,
        definedRanges = getDefaultRanges,
    } = props;
    const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
    const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
    const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
        initialDateRange || {},
        minDateValid,
        maxDateValid
    );
    const [dateRange, setDateRange] = useState({ ...initialDateRange });
    const [hoverDay, setHoverDay] = useState();
    const [firstMonth, setFirstMonth] = useState(intialFirstMonth || today);
    const [secondMonth, setSecondMonth] = useState(
        initialSecondMonth || addMonths(firstMonth, 1)
    );
    const [timeLabel,setTimeLabel] = useState('')
    const dispatch = useDispatch();

    const rangeOpen = useSelector((store) => store.rangeOpen);
    const range = useSelector((store) => ({dateStart: store.start, dateEnd: store.stop, label: store.label}))

useEffect(()=>{
    setTimeLabel(range.label)
},[range])


    const { dateStart, dateEnd } = dateRange;

    const { ref, isComponentVisible, setIsComponentVisible } =
        useOutsideRef(true);

    useEffect(() => {
        setIsComponentVisible(rangeOpen);
       
    }, [rangeOpen]);


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
        let {label, dateStart: newStart, dateEnd: newEnd } = range;
        if (newStart && newEnd) {
            range.label = label
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
    }
    const onDayClick = (day) => {
        if (dateStart && !dateEnd && !isBefore(day, dateStart)) {
            const newRange = { dateStart, dateEnd: day };
            onChange(newRange);
            saveDateRange(newRange);
            setDateRange(newRange);
            dispatch(setTimeRangeLabel(''))
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
        const {query} = store.getState();
        e?.preventDefault();        
        if (onQueryValid(query)) {
            dispatch(setLabelsBrowserOpen(false))
            dispatch(loadLogs())
        } else {
            console.log("Please make a log query", query);
        }
        dispatch(setRangeOpen(false));
        props.isOpen(e);

    };
    const onQueryValid = (query) => {
        return query !== '{' && query !== '}' && query !== '{}' && query !== '' // TODO: make a proper query validation
    }
    // helpers
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
    const mediaMatch = window.matchMedia('(min-width: 1200px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
    const dateButtonStyles = {
        border:'none',
        height:'21px',
        background:'#121212',
        color:'orange',
        padding:'3px 6px',
        borderRadius:'3px',
        fontSize:'.85em',
        display:'flex',
        alignItems:'center',
        marginLeft:'20px',
    }

    const helpers = {
        inHoverRange,
    };

    const handlers = {
        onDayClick,
        onDayHover,
        onMonthNavigate,
    };

    const openButtonHandler = (e) => {
        e.preventDefault()
        if(rangeOpen === true) {
           onClose(e)
           setIsComponentVisible(false)
        } else {
            dispatch(setRangeOpen(true))
            setIsComponentVisible(true)
        }
    }
    return (
        <div>
            <Tooltip title={
                    timeLabel ? <React.Fragment>
                        <span style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '3px',
                        }}  >
                            <span style={{
                                textAlign: 'center'
                            }}>
                                {(isValid(dateRange.dateStart)
                                ? format(dateRange.dateStart, "yyyy/MM/dd HH:mm:ss")
                                : dateRange.dateStart)}
                            </span>
                            <span style={{
                                textAlign: 'center'
                            }}>
                            to
                            </span>
                            <span style={{
                                textAlign: 'center'
                            }}>
                            {(isValid(dateRange.dateEnd)
                                ? format(dateRange.dateEnd, "yyyy/MM/dd HH:mm:ss")
                                : typeof dateRange.dateEnd !== 'undefined' ?
                                dateRange.dateEnd : ''
                                )}
                            </span>

                        </span>
                    </React.Fragment> : undefined
                    }>
                <button style={dateButtonStyles}
                    onClick={openButtonHandler} className={'date-time-selector'}
                >

                    <AccessTimeOutlinedIcon />
                

                <span>
                {timeLabel ?
                timeLabel :
                (isValid(dateRange.dateStart)
                    ? format(dateRange.dateStart, "yyyy/MM/dd HH:mm:ss")
                    : dateRange.dateStart)
                +"-"+ 
                (isValid(dateRange.dateEnd)
                    ? format(dateRange.dateEnd, "yyyy/MM/dd HH:mm:ss")
                    : typeof dateRange.dateEnd !== 'undefined' ?
                    dateRange.dateEnd : ''
                    )
                }
                </span>
            </button> 
            </Tooltip>
            { isComponentVisible ? (
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
