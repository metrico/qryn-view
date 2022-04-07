import {
    Paper,
    Grid,
    Typography,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { withStyles, createStyles } from "@mui/styles";
import {
    getDate,
    isSameMonth,
    isToday,
    format,
    isWithinInterval,
} from "date-fns";
import {
    chunks,
    getDaysInMonth,
    isStartOfRange,
    isEndOfRange,
    inDateRange,
    isRangeSameDay,
} from "../utils";
import Heading from "./Heading";
import Day from "./Day";
import { WEEK_DAYS } from "../consts";

const NAVIGATION_ACTION = { Previous: -1, Next: 1 };

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});
const styles = (theme) =>
    createStyles({
        root: { 
            width: 260,
            background: "#262626",
        },
        weekDaysContainer: {
            marginTop: 5,
            paddingLeft: 30,
            paddingRight: 30,
        },
        daysContainer: {
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 10,
            marginBottom: 20,
        },
    });
const Month = (props) => {
    const {
        classes,
        helpers,
        handlers,
        value: date,
        dateRange,
        marker,
        setValue: setDate,
        minDate,
        maxDate,
    } = props;

    const [back, forward] = props.navState;

    return (
        <ThemeProvider theme={theme}>
            <Paper square elevation={0} className={classes.root}>
                <Grid container>
                    <Heading
                        date={date}
                        setDate={setDate}
                        nextDisabled={!forward}
                        prevDisabled={!back}
                        onClickPrevious={() =>
                            handlers.onMonthNavigate(
                                marker,
                                NAVIGATION_ACTION.Previous
                            )
                        }
                        onClickNext={() =>
                            handlers.onMonthNavigate(
                                marker,
                                NAVIGATION_ACTION.Next
                            )
                        }
                    />

                    <Grid
                        item
                        container
                        direction={"row"}
                        justifyContent={"space-between"}
                        className={classes.weekDaysContainer}
                    >
                        {WEEK_DAYS.map((day) => (
                            <Typography key={day} variant={"caption"}>
                                {day}
                            </Typography>
                        ))}
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        justifyContent={"space-between"}
                        className={classes.daysContainer}
                    >
                        {chunks(getDaysInMonth(date), 7).map((week, idx) => (
                            <Grid
                                key={idx}
                                container
                                direction={"row"}
                                justifyContent={"center"}
                            >
                                {week.map((day) => {
                                    const isStart = isStartOfRange(
                                        dateRange,
                                        day
                                    );
                                    const isEnd = isEndOfRange(dateRange, day);
                                    const isRangeOneDay =
                                        isRangeSameDay(dateRange);
                                    const highlighted =
                                        inDateRange(dateRange, day) ||
                                        helpers.inHoverRange(day);

                                    return (
                                        <Day
                                            key={format(day, "mm-dd-yyyy")}
                                            filled={isStart || isEnd}
                                            outlined={isToday(day)}
                                            highlighted={
                                                highlighted && !isRangeOneDay
                                            }
                                            disabled={
                                                !isSameMonth(date, day) ||
                                                !isWithinInterval(day, {
                                                    start: minDate,
                                                    end: maxDate,
                                                })
                                            }
                                            startOfRange={
                                                isStart && !isRangeOneDay
                                            }
                                            endOfRange={isEnd && !isRangeOneDay}
                                            onClick={() =>
                                                handlers.onDayClick(day)
                                            }
                                            onHover={() =>
                                                handlers.onDayHover(day)
                                            }
                                            value={getDate(day)}
                                        />
                                    );
                                })}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default withStyles(styles)(Month);
