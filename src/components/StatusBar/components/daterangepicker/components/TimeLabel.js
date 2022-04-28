import styled from "@emotion/styled";
import { format, isValid } from "date-fns";
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import { themes } from "../../../../../theme/themes";

const TimeLabelCont = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: "center";
    padding: "3px";
    .time-span {
        text-align: center;
    }
`;

export default function TimeLabel({ dateRange }) {
    const theme = useSelector((store) => store.theme);
    return (
        <ThemeProvider theme={themes[theme]}>
            <TimeLabelCont>
                <span className="time-span">
                    {isValid(dateRange.dateStart)
                        ? format(dateRange.dateStart, "yyyy/MM/dd HH:mm:ss")
                        : dateRange.dateStart}
                </span>

                <span className="time-span">to</span>
                <span className="time-span">
                    {isValid(dateRange.dateEnd)
                        ? format(dateRange.dateEnd, "yyyy/MM/dd HH:mm:ss")
                        : typeof dateRange.dateEnd !== "undefined"
                        ? dateRange.dateEnd
                        : ""}
                </span>
            </TimeLabelCont>
        </ThemeProvider>
    );
}
