import { Grid, IconButton } from "@mui/material";

import {  ThemeProvider } from "@mui/material/styles";
import { withStyles } from "tss-react/mui";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";
import { MONTHS } from "../consts";
import { HeadingStyles } from "./styles";
import { generateYears } from "../utils";
import styled from "@emotion/styled";
import useTheme from "@ui/theme/useTheme"

const DateSelect = styled.select`
    cursor: pointer;
    position: relative;
    font-size: 14px;
    color: ${(props: any) => props.theme.contrast};
    background: ${(props: any) => props.theme.deep};
    border: none;
    border-radius: 3px;
    padding: 4px 8px;
    line-height: 20px;
    flex: 1;
    &::-webkit-scrollbar {
        width: 5px;
        background: ${(props: any) => props.theme.deep};
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${(props: any) => props.theme.alphaPlusNeutral};
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

const Heading:any = ({
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
                                    ? theme.lightContrast
                                    : theme.contrast,
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
                                    ? theme.lightContrast
                                    : theme.contrast,
                            }}
                        />
                    </IconButton>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

 

export default withStyles(Heading,HeadingStyles);
