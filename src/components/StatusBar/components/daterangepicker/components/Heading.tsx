import { Grid, IconButton } from "@mui/material";

import { withStyles, ThemeProvider } from "@mui/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";
import { MONTHS } from "../consts";
import { HeadingStyles } from "./styles";
import { generateYears } from "../utils";
import styled from "@emotion/styled";
import { useTheme } from "../../../../DataViews/components/QueryBuilder/hooks";

const DateSelect = styled.select`
    cursor: pointer;
    position: relative;
    font-size: 14px;
    color: ${(props: any) => props.theme.textColor};
    background: ${(props: any) => props.theme.inputBg};
    border: none;
    border-radius: 3px;
    padding: 4px 8px;
    line-height: 20px;
    flex: 1;
    &::-webkit-scrollbar {
        width: 5px;
        background: ${(props: any) => props.theme.inputBg};
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${(props: any) => props.theme.scrollbarThumb};
    }
`;

export interface HeadingProps {
    date: any;
    classes: any;
    setDate: any;
    nextDisabled: any;
    prevDisabled: any;
    onClickNext: (e: any) => void;
    onClickPrevious: (e: any) => void;
}

const Heading = ({
    date,
    classes,
    setDate,
    nextDisabled,
    prevDisabled,
    onClickNext,
    onClickPrevious,
}: HeadingProps) => {
    const theme = useTheme();
    const handleMonthChange = (event: any) => {
        setDate(setMonth(date, parseInt(event.target.value)));
    };

    const handleYearChange = (event: any) => {
        setDate(setYear(date, parseInt(event.target.value)));
    };

    return (
        <ThemeProvider theme={theme}>
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
                            style={{
                                color: prevDisabled
                                    ? theme.textOff
                                    : theme.textColor,
                            }}
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
                            style={{
                                color: nextDisabled
                                    ? theme.textOff
                                    : theme.textColor,
                            }}
                        />
                    </IconButton>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default withStyles(HeadingStyles)(Heading);
