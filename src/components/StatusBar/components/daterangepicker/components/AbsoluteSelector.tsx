import styled from "@emotion/styled";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { themes } from "../../../../../theme/themes";
import { BtnSmall } from "../../../../../theme/styles/Button";
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
const SelectorsContainer: any = styled.div`
    display: ${(props: any) => props.isDisplay ? "flex" : "none"};
    flex-direction: column;
    margin: 20px;
    margin-top: 30px;
    .time-selectors {
        display: ${(props: any) => props.isDisplay ? "flex" : "none"};
        flex-direction: column;
        margin-bottom: 15px;
        .label {
            font-size: 0.85em;
            color: ${(props: any) => props.theme.inputLabelColor};
            width: 50px;
            margin-left: 5px;
            margin-bottom: 5px;
            white-space: nowrap;
        }
        .input-group {
            display: flex;
            margin-bottom: 20px;
            .date-time-ranged {
                font-size:14px;
                width: 170px;
                line-height: 20px;
                border:1px solid ${(props: any) => props.theme.buttonHover};
                color: ${(props: any) => props.theme.textColor};
                margin: 0;
                padding:0px 8px;
                margin-right: 5px;
                &:focus{
                    border:1px solid ${(props: any) => props.theme.buttonDefault};
                }
            }
        }
    }
`;

const AbsoluteSubmitButton: any = styled(BtnSmall)`
    color: ${(props: any) => props.theme.buttonText};
    background: ${(props: any) => props.theme.primaryDark};
    padding: 6px;
    justify-content: center;
    margin-top:10px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
        background: ${(props: any) => props.theme.primaryLight};
    }
`;

const CalendarBtn = styled(BtnSmall)`
   
    color: ${(props: any) => props.theme.textColor};
    background: ${(props: any) => props.theme.buttonDefault};
    border: 1px solid ${(props: any) => props.theme.buttonBorder};
    padding: 8px;
    &:hover {
        background: ${(props: any) => props.theme.buttonHover};
        color: ${(props: any) => props.theme.textColor};
    }
`;

export default function AbsoluteSelector({
    getEditedStartDate,
    getEditedEndDate,
    handleStart,
    handleStop,
    onTimeRangeSet,
    setCalendarOpen,
    isFullCalendar,
    setStopCalendar,
    setStartCalendar,
    startCalendarOpen,
    stopCalendarOpen,
    isHorizontal,
    styles,
    isMobile,
}: any) {
    const theme = useSelector((store: any) => store.theme);
    function handleStartOpen() {
        if (isFullCalendar) {
            setCalendarOpen((open: any) => (open ? false : true));
        } else {
            setCalendarOpen((open: any) =>
                open && startCalendarOpen ? false : true
            );
            setStopCalendar(() => false);
            setStartCalendar((open: any) => (open ? false : true));
        }
    }

    function handleStopOpen() {
        if (isFullCalendar) {
            setCalendarOpen((open: any) => (open ? false : true));
        } else {
            setCalendarOpen((open: any) =>
                open && stopCalendarOpen ? false : true
            );
            setStartCalendar(() => false);
            setStopCalendar((open: any) => (open ? false : true));
        }
    }
    const _themes: any = themes;
    return (
        <ThemeProvider theme={_themes[theme]}>
        <SelectorsContainer isDisplay={styles}>
          
            <div className={"time-selectors"}>
                <span className={"label"}>{"From"}</span>
                <div className="input-group">
                    <input
                        className={"date-time-ranged"}
                        value={getEditedStartDate()}
                        onChange={(e) => handleStart(e, false)}
                        onBlur={(e) => handleStart(e, true)}
                    />
                    <CalendarBtn onClick={handleStartOpen}>
                        <DateRangeIcon  style={{height:'16px',width:'16px'}} />
                    </CalendarBtn>
                </div>
            </div>

            <div className={"time-selectors"}>
                <span className={"label"}>{"To"}</span>
                <div className="input-group">
                    <input
                        className={"date-time-ranged"}
                        value={getEditedEndDate()}
                        onChange={(e) => handleStop(e, false)}
                        onBlur={(e) => handleStop(e, true)}
                    />
                    <CalendarBtn onClick={handleStopOpen}>
                        <DateRangeIcon style={{height:'16px',width:'16px'}} />
                    </CalendarBtn>
                </div>
            </div>
            <AbsoluteSubmitButton
                isHorizontal={isHorizontal}
                isMobile={isMobile}
                onClick={(e: any) => {
                    onTimeRangeSet(e);
                }}
            >
                {"Apply Time Range"}
            </AbsoluteSubmitButton>
        </SelectorsContainer>
        </ThemeProvider>
    );
}
