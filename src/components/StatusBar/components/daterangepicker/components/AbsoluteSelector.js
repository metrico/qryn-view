import styled from "@emotion/styled";
import DateRangeIcon from "@mui/icons-material/DateRange";
const SelectorsContainer = styled.div`
    display: ${(props) => (props.isDisplay ? "flex" : "none")};
    flex-direction: column;
    margin: 4px;
    .time-selectors {
        display: ${(props) => (props.isDisplay ? "flex" : "none")};
        flex-direction: column;
        padding: 5px;

        .label {
            font-size: 0.85em;
            color: #aaa;
            width: 50px;
            margin-left: 5px;
            margin-bottom: 2px;
        }
        .input-group {
            display: flex;
            .date-time-ranged {
                font-size: 1em;
                width: 170px;
                line-height: 1.5;
                text-align: center;
                color: #ddd;
            }
            button {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                padding: 0px 8px;
                margin: 3px;
                border-radius: 3px;
                color: #eee;
                background: #0c8181;
                &:hover {
                    background: #159d9d;
                }
            }
        }
    }
`;

const AbsoluteSubmitButton = styled.button`
    color: #eee;
    background: #0c8181;
    font-size: 0.85em;
    font-weight: bold;
    padding: 8px 0px;
    line-height: 1.5;
    border: none;
    border-radius: 3px;
    transition: 0.2s all;
    margin: 10px;
    margin-top: {props => (props.isHorizontal && props.isMobile ? '20px':'40px')}
    cursor: pointer;
    &:hover {
        background: #159d9d;
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
    calendarOpen,
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
                    <button onClick={handleStartOpen}>
                        <DateRangeIcon fontSize="small" />
                    </button>
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
                    <button onClick={handleStopOpen}>
                        <DateRangeIcon fontSize="small" />
                    </button>
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
