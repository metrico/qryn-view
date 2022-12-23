import { useState, useEffect } from "react";

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
    add, 
    sub,
    intervalToDuration
} from "date-fns";

import { PickerNav } from "./components/Nav";
import {
    findRangeByLabel,
    getDefaultRanges,
    getValidatedMonths,
    parseOptionalDate,
} from "./utils";
import { DATE_TIME_RANGE, MARKERS } from "./consts";
import { ThemeProvider } from "@emotion/react";
import {
    setRangeOpen,
    setStartTime,
    setTimeRangeLabel,
    setStopTime,
} from "../../../../actions";
import { useSelector, useDispatch } from "react-redux";
import useOutsideRef from "./hooks/useOutsideRef";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Tooltip, IconButton } from "@mui/material";
import TimeLabel from "./components/TimeLabel";
import { DatePickerButton } from "../../styled";
import { themes } from "../../../../theme/themes";
import { styled } from "@mui/material/styles";

export const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme, qryntheme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        color: qryntheme.textColor,
        border: `1px solid ${qryntheme.buttonBorder}`,
        backgroundColor: qryntheme.buttonDefault,
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            fontSize: 12,
            "& .MuiSvgIcon-root": {
                fontSize: 12,
                color: qryntheme.textColor,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: qryntheme.buttonDefault,
            },
        },
    },
}));
const timeAdjustmentOptions = ['1m', '5m', '10m', '30m', '1h', '3h', '6h', '12h', '24h']
export function DateRangePickerMain(props) {
    const today = Date.now();
    const { isOpen, minDate, maxDate } = props;

    const startTs = useSelector((store) => store.start);
    const stopTs = useSelector((store) => store.stop);
    const storeTheme = useSelector((store) => store.theme);
    const qrynTheme = themes[storeTheme];
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
        e?.preventDefault();
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
    const adjustTimeRange = (direction, adjustment = 'range') => {
        const directionFunc = direction === 'backward' ? sub : add;
        let duration = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        if (adjustment === 'range') {
            duration = intervalToDuration({start:dateStart, end: dateEnd})
        } else {
            
            if (adjustment.includes('d')) {
                duration.days = parseInt(adjustment);
            } else if(adjustment.includes('h')) {
                duration.hours = parseInt(adjustment);
            } else if(adjustment.includes('m')) {
                duration.minutes = parseInt(adjustment);
            } else if(adjustment.includes('s')) {
                duration.seconds = parseInt(adjustment);
            }
        }
        const adjustedStart = directionFunc(dateStart, duration);
        const adjustedStop = directionFunc(dateEnd, duration);
        const dateRange = {
            dateStart: adjustedStart,
            dateEnd: adjustedStop,
            label: ''
        }
        setDateRange(dateRange);
        saveDateRange(dateRange);
        onChange(dateRange);
    }
    const theme = useSelector(store => store.theme);

    // Handle menus
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [anchorElRight, setAnchorElRight] = useState(null);
    const openRight = Boolean(anchorElRight);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickRight = (event) => {
        setAnchorElRight(event.currentTarget)
    }
    const handleClose = (e, direction,  option) => {
        setAnchorEl(null);
        setAnchorElRight(null);
        if (direction && option) {
            adjustTimeRange(direction, option)
        }
    };
    return (
        <div style={{ display: "flex" }}>
            <DatePickerButton
                onClick={() => {
                    adjustTimeRange("backward");
                }}
                attachedSide={'r'}
                emptySide={'l'}
                className={"date-time-selector"}
            >
                <KeyboardArrowLeft />
            </DatePickerButton>
            <DatePickerButton
                onClick={handleClick}
                attachedSide={'both'}
                size={'small'}
                className={"date-time-selector"}
                aria-controls={open ? 'backward-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <KeyboardArrowDownOutlinedIcon />
            </DatePickerButton>
            <StyledMenu
                id='backward-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                qryntheme={qrynTheme}
            >
                {timeAdjustmentOptions.map(option => (
                    <MenuItem key={`${option} l`}
                    onClick={(e) => handleClose(e, 'backward', option)}>
                        {option}
                    </MenuItem>
                ))}
            </StyledMenu>
            <Tooltip
                title={timeLabel ? <TimeLabel dateRange={dateRange} /> : ""}
            >
                <DatePickerButton
                    onClick={openButtonHandler}
                    className={"date-time-selector"}
                    attachedSide={"both"}
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
            <DatePickerButton
                onClick={handleClickRight}
                attachedSide={'both'}
                size={'small'}
                className={"date-time-selector"}
                aria-controls={openRight ? 'forward-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openRight ? 'true' : undefined}
            >
                <KeyboardArrowDownOutlinedIcon />
            </DatePickerButton>
            
            <StyledMenu
                id='forward-menu'
                anchorEl={anchorElRight}
                open={openRight}
                onClose={handleClose}
                qryntheme={qrynTheme}
            >
                {timeAdjustmentOptions.map(option => (
                    <MenuItem key={`${option} r`}
                    onClick={(e) => handleClose(e, 'forward', option)}>
                        {option}
                    </MenuItem>
                ))}
            </StyledMenu>
            <DatePickerButton
                onClick={() => {
                    adjustTimeRange("forward");
                }}
                attachedSide={'l'}
                className={"date-time-selector"}
            >
                <KeyboardArrowRight />
            </DatePickerButton>
            {rangeOpen ? (
                <div tabIndex={"0"} ref={ref}>
                    <ThemeProvider theme={themes[theme]}>
                        <PickerNav
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


