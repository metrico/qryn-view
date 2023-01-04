import { useState, useEffect, useMemo } from "react";

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
    intervalToDuration,
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
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip } from "@mui/material";
import TimeLabel from "./components/TimeLabel";
import { DatePickerButton } from "../../styled";
import { themes } from "../../../../theme/themes";
import { styled } from "@mui/material/styles";
import { useTheme } from "../../../DataViews/components/QueryBuilder/hooks";
import { css, cx } from "@emotion/css";

export const timeDateRangeFromLocal = (item: string) => {
    try {
        let localData = localStorage.getItem(item);
        if (typeof localData === "string") {
            let parsed = JSON.parse(localData);

            if (parsed.dateStart && parsed.dateEnd)
                return JSON.parse(localData);
        }
    } catch (e) {
        console.log(e);
        return { dateStart: "", dateEnd: "" };
    }
};

export const CustomMenu = (props: any) => {
    return (
        <Menu
            id={props.id}
            elevation={0}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            PaperProps={{
                sx: {
                    background: props.qryntheme.buttonDefault,
                    color: props.qryntheme.textColor,
                },
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            {...props}
        />
    );
};

const timeAdjustmentOptions = [
    "1m",
    "5m",
    "10m",
    "30m",
    "1h",
    "3h",
    "6h",
    "12h",
    "24h",
];
export function DateRangePickerMain(props: any) {
    const today = Date.now();
    const { isOpen, minDate, maxDate } = props;

    const startTs = useSelector((store: any) => store.start);
    const stopTs = useSelector((store: any) => store.stop);

    const theme = useTheme();
    const initialDateRange = () => {
        try {
            const ls = timeDateRangeFromLocal(DATE_TIME_RANGE);
            if (ls?.label !== "" && typeof ls.label !== "undefined") {
                const range: any = findRangeByLabel(ls?.label);
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
    const [dateRange, setDateRange] = useState<{
        dateStart: any;
        dateEnd: any;
    }>({ ...initialDateRange() });
    const [hoverDay, setHoverDay] = useState();
    const [firstMonth, setFirstMonth] = useState(intialFirstMonth || today);
    const [secondMonth, setSecondMonth] = useState(
        initialSecondMonth || addMonths(firstMonth, 1)
    );
    const [timeLabel, setTimeLabel] = useState("");
    const dispatch = useDispatch();

    const rangeOpen = useSelector((store: any) => store.rangeOpen);
    const range = useSelector((store: any) => ({
        dateStart: store.start,
        dateEnd: store.stop,
        label: store.label,
    }));

    useEffect(() => {
        setTimeLabel(range.label);
    }, [range]);

    const { dateStart, dateEnd } = dateRange;

    const { ref } = useOutsideRef();

    const setFirstMonthValidated = (date: any) => {
        if (isBefore(date, secondMonth)) {
            setFirstMonth(date);
        }
    };

    const setSecondMonthValidated = (date: any) => {
        if (isAfter(date, firstMonth)) {
            setSecondMonth(date);
        }
    };

    const setDateRangeValidated = (range: any) => {
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
    const saveDateRange = (range: any) => {
        localStorage.setItem(DATE_TIME_RANGE, JSON.stringify(range));
    };
    const onDayClick = (day: any) => {
        if (dateStart && !dateEnd && !isBefore(day, dateStart)) {
            const newRange: any = { dateStart, dateEnd: day };
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

    const onMonthNavigate = (marker: any, action: any) => {
        if (marker === MARKERS.FIRST_MONTH) {
            const firstNew = addMonths(firstMonth, action);
            if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
        } else {
            const secondNew = addMonths(secondMonth, action);
            if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
        }
    };

    const onDayHover = (date: any) => {
        if (dateStart && !dateEnd) {
            if (!hoverDay || !isSameDay(date, hoverDay)) {
                setHoverDay(date);
            }
        }
    };
    const onClose = (e: any = null) => {
        e?.preventDefault();
        dispatch(setRangeOpen(false));
        isOpen(e);
    };

    const inHoverRange = (day: any) => {
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

    function onChange(range: any) {
        const { dateStart, dateEnd, label } = range;
        const isStart = isDate(dateStart);
        const isEnd = isDate(dateEnd);
        const isLabel = typeof label !== "undefined";
        if (isStart) dispatch(setStartTime(dateStart));
        if (isEnd) dispatch(setStopTime(dateEnd));
        if (isLabel) dispatch(setTimeRangeLabel(label));
    }

    const openButtonHandler = (e: any) => {
        e.preventDefault();
        if (rangeOpen === true) {
            onClose(e);
        } else {
            dispatch(setRangeOpen(true));
        }
    };
    const adjustTimeRange = (direction: any, adjustment: any = "range") => {
        const directionFunc = direction === "backward" ? sub : add;
        let duration: any = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        if (adjustment === "range") {
            duration = intervalToDuration({ start: dateStart, end: dateEnd });
        } else {
            if (adjustment.includes("d")) {
                duration.days = parseInt(adjustment);
            } else if (adjustment.includes("h")) {
                duration.hours = parseInt(adjustment);
            } else if (adjustment.includes("m")) {
                duration.minutes = parseInt(adjustment);
            } else if (adjustment.includes("s")) {
                duration.seconds = parseInt(adjustment);
            }
        }
        const adjustedStart = directionFunc(dateStart, duration);
        const adjustedStop = directionFunc(dateEnd, duration);
        const dateRange = {
            dateStart: adjustedStart,
            dateEnd: adjustedStop,
            label: "",
        };
        setDateRange(dateRange);
        saveDateRange(dateRange);
        onChange(dateRange);
    };

    // Handle menus
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [anchorElRight, setAnchorElRight] = useState(null);
    const openRight = Boolean(anchorElRight);

    const handleClick = (event: any) => {
        setAnchorEl((prev) => event.currentTarget);
    };
    const handleClickRight = (event: any) => {
        setAnchorElRight((prev) => event.currentTarget);
    };
    const handleClose = (e: any, direction: any, option: any) => {
        setAnchorEl(null);
        setAnchorElRight(null);
        if (direction && option) {
            adjustTimeRange(direction, option);
        }
    };
    return (
        <div style={{ display: "flex" }}>
            <DatePickerButton
                onClick={() => {
                    adjustTimeRange("backward");
                }}
                attachedside={"r"}
                emptySide={"l"}
                className={"date-time-selector"}
            >
                <KeyboardArrowLeft />
            </DatePickerButton>
            <DatePickerButton
                onClick={handleClick}
                attachedside={"both"}
                size={"small"}
                className={"date-time-selector"}
                aria-controls={open ? "backward-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <KeyboardArrowDownOutlinedIcon />
            </DatePickerButton>
            <CustomMenu
                id={"backward-menu"}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                qryntheme={theme}
            >
                {timeAdjustmentOptions.map((option) => (
                    <MenuItem
                        key={`${option} l`}
                        sx={{ "&.MuiMenuItem-root": { fontSize: 12 } }}
                        onClick={(e) => handleClose(e, "backward", option)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </CustomMenu>
            <Tooltip
                title={timeLabel ? <TimeLabel dateRange={dateRange} /> : ""}
            >
                <DatePickerButton
                    onClick={openButtonHandler}
                    className={"date-time-selector"}
                    attachedside={"both"}
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
                attachedside={"both"}
                size={"small"}
                className={"date-time-selector"}
                aria-controls={openRight ? "forward-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openRight ? "true" : undefined}
            >
                <KeyboardArrowDownOutlinedIcon />
            </DatePickerButton>

            <CustomMenu
                id="forward-menu"
                anchorEl={anchorElRight}
                open={openRight}
                onClose={handleClose}
                qryntheme={theme}
            >
                {timeAdjustmentOptions.map((option) => (
                    <MenuItem
                        key={`${option} r`}
                        sx={{ "&.MuiMenuItem-root": { fontSize: 12 } }}
                        onClick={(e) => handleClose(e, "forward", option)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </CustomMenu>
            <DatePickerButton
                onClick={() => {
                    adjustTimeRange("forward");
                }}
                attachedside={"l"}
                className={"date-time-selector"}
            >
                <KeyboardArrowRight />
            </DatePickerButton>
            {rangeOpen ? (
                <div tabIndex={0} ref={ref}>
                    <ThemeProvider theme={theme}>
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
