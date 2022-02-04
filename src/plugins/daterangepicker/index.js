import React, { useState, useEffect, useRef } from "react";

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
import { defaultRanges, getValidatedMonths, parseOptionalDate } from "./utils";
import { MARKERS } from "./consts";
import { theme } from "./components/styles";
import { ThemeProvider } from "@emotion/react";
import { setRangeOpen } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import useOutsideRef from "./hooks/useOutsideRef";

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
export function DateRangePickerMain(props) {
    const today = Date.now();
    const {
        open,
        onChange,
        initialDateRange,
        minDate,
        maxDate,
        definedRanges = defaultRanges,
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
    const dispatch = useDispatch();
    const startTs = useSelector((store) => store.start);
    const stopTs = useSelector((store) => store.stop);
    const [buttonStart, setButtonStart] = useState(startTs)
    const [buttonStop, setButtonStop] = useState(stopTs)

        useEffect(()=> {
          
            setButtonStart(startTs)
        },[startTs])


        useEffect(()=>{
            setButtonStop(stopTs)
        },[stopTs])

    const rangeOpen = useSelector((store) => store.rangeOpen);

    const [dateOpen, setDateOpen] = useState(true);

    useEffect(() => {
        const { dateStart, dateEnd } = props.initialDateRange;
        if (isDate(dateStart) && isDate(dateEnd)) {
            setDateRange(props.initialDateRange);
        }
    }, [props.initialDateRange]);

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
        let { dateStart: newStart, dateEnd: newEnd } = range;
        if (newStart && newEnd) {
            range.dateStart = newStart = max([newStart, minDateValid]);
            range.dateEnd = newEnd = min([newEnd, maxDateValid]);
            setDateRange(range);
            onChange(range);
            setFirstMonth(newStart);
            setSecondMonth(
                isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
            );
        }
    };

    const onDayClick = (day) => {
        if (dateStart && !dateEnd && !isBefore(day, dateStart)) {
            const newRange = { dateStart, dateEnd: day };
            onChange(newRange);
            setDateRange(newRange);
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
    const onClose = (e) => {
     
        e.preventDefault();
        dispatch(setRangeOpen(false));
        props.isOpen(e);
    };

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
        marginLeft:'20px'

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
        } else {
           setIsComponentVisible(true)
        }
    }

    return (
        <div>
            <button style={dateButtonStyles}
                onClick={openButtonHandler}
            ><AccessTimeOutlinedIcon 
            style={{
                fontSize:'1.15em',
                marginRight:'3px'
            }} />
                {isValid(buttonStart)
                    ? format(buttonStart, "yyyy/MM/dd HH:mm:ss")
                    : buttonStart}{" "}
                -{" "}
                {isValid(buttonStop)
                    ? format(buttonStop, "yyyy/MM/dd HH:mm:ss")
                    : buttonStop}
            </button> 

            { isComponentVisible ? (
                <div tabIndex="0" ref={ref}>
                    <ThemeProvider theme={theme}>
                        <Nav
                            dateRange={dateRange}
                            minDate={minDateValid}
                            maxDate={maxDateValid}
                            ranges={definedRanges}
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
