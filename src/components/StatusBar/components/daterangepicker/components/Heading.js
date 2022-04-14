import { Grid, IconButton } from "@mui/material";

import { withStyles, ThemeProvider } from "@mui/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";
import { MONTHS } from "../consts";
import { HeadingStyles } from "./styles";
import { generateYears } from "../utils";
import styled from "@emotion/styled";
import { themes } from "../../../../../theme/themes";
import { useSelector } from 'react-redux';
const DateSelect = styled.select`
    cursor: pointer;

    position: relative;
    font-size: 14px;
    color: ${props => props.theme.textColor};
    background: #333;
    border: none;
    border-radius: 3px;
    padding: 4px 8px;
    line-height: 20px;
    flex: 1;
    &::-webkit-scrollbar {
        width: 5px;
        background: black;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${props => props.theme.scrollbarThumb};
    }
`;

const Heading = ({
    date,
    classes,
    setDate,
    nextDisabled,
    prevDisabled,
    onClickNext,
    onClickPrevious,
}) => {
    const theme = useSelector((store) => store.theme);
    const handleMonthChange = (event) => {
        setDate(setMonth(date, parseInt(event.target.value)));
    };

    const handleYearChange = (event) => {
        setDate(setYear(date, parseInt(event.target.value)));
    };

    return (
        <ThemeProvider theme={themes[theme]}>
            <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                style={{ marginTop: "20px" }}
            >
                <Grid item className={classes.iconContainer}>
                    <IconButton
                        disabled={prevDisabled}
                        onClick={onClickPrevious}
                    >
                        <ChevronLeft
                            color={prevDisabled ? "disabled" : "active"}
                        />
                    </IconButton>
                </Grid>
                <Grid item>
                    <DateSelect
                        value={getMonth(date)}
                        onChange={handleMonthChange}
                    >
                        {MONTHS.map((month, idx) => (
                            <option key={month} value={idx}>
                                {month}
                            </option>
                        ))}
                    </DateSelect>
                </Grid>

                <Grid item>
                    <DateSelect
                        value={getYear(date)}
                        onChange={handleYearChange}
                    >
                        {generateYears(date, 30).map((year) => (
                            <option
                                className={"custom-option"}
                                key={year}
                                value={year}
                            >
                                {year}
                            </option>
                        ))}
                    </DateSelect>
                </Grid>
                <Grid item className={classes.iconContainer}>
                    <IconButton disabled={nextDisabled} onClick={onClickNext}>
                        <ChevronRight
                            color={nextDisabled ? "disabled" : "active"}
                        />
                    </IconButton>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default withStyles(HeadingStyles)(Heading);
