import styled from "@emotion/styled";
import DateRangeIcon from "@mui/icons-material/DateRange";
import darkTheme from "../../../../../theme/dark";
import { BtnSmall } from "../../../../../theme/styles/Button";
const theme = darkTheme;

const SelectorsContainer = styled.div`
    display: ${(props) => (props.isDisplay ? "flex" : "none")};
    flex-direction: column;
    margin: 20px;
    margin-top: 30px;
    .time-selectors {
        display: ${(props) => (props.isDisplay ? "flex" : "none")};
        flex-direction: column;
        margin-bottom: 15px;
        .label {
            font-size: 12px;
            color: ${theme.inputLabelColor};
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
                border:1px solid ${theme.buttonHover};
                color: ${theme.textColor};
                margin: 0;
                padding:0px 8px;
                margin-right: 5px;
                &:focus{
                    border:1px solid ${theme.buttonDefault};
                }
            }
        }
    }
`;

const AbsoluteSubmitButton = styled(BtnSmall)`
    color: ${theme.buttonText};
    background: ${theme.primaryDark};
    padding: 6px;
    justify-content: center;
    margin-top:10px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
        background: ${theme.primaryLight};
    }
`;

const CalendarBtn = styled(BtnSmall)`
   
    color: ${theme.buttonText};
    background: ${theme.buttonDefault};
    padding:8px;
    &:hover {
        background: ${theme.buttonHover};
        color: ${theme.textColor};
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
}) {
    function handleStartOpen() {
        if (isFullCalendar) {
            setCalendarOpen((open) => (open ? false : true));
        } else {
            setCalendarOpen((open) =>
                open && startCalendarOpen ? false : true
            );
            setStopCalendar(() => false);
            setStartCalendar((open) => (open ? false : true));
        }
    }

    function handleStopOpen() {
        if (isFullCalendar) {
            setCalendarOpen((open) => (open ? false : true));
        } else {
            setCalendarOpen((open) =>
                open && stopCalendarOpen ? false : true
            );
            setStartCalendar(() => false);
            setStopCalendar((open) => (open ? false : true));
        }
    }

    return (
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
                onClick={(e) => {
                    onTimeRangeSet(e);
                }}
            >
                {"Apply Time Range"}
            </AbsoluteSubmitButton>
        </SelectorsContainer>
    );
}
