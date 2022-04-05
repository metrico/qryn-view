import styled from "@emotion/styled";

import HistoryIcon from "@mui/icons-material/History";
import darkTheme from "../../../../theme/dark";

// get theme from main state

const theme = darkTheme;

export const HistoryIconStyled = styled(HistoryIcon)`
    color: ${(props) => props.color};
`;
export const HistoryButtonStyled = styled.button`
    background: none;
    color: ${theme.textColor};
    margin-left: 5px;
    background: ${theme.buttonHover};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    line-height: 1.5;
    font-size: 1em;
    padding: 0px 8px;
    border-radius: 3px;
    span {
        margin-left: 5px;
    }
    @media screen and (max-width: 864px) {
        display: ${(props) => (props.isMobile ? "flex" : "none")};
    }
`;

export const ShowLabelsBtn = styled.button`
    background: ${(props) => (props.browserActive ? theme.buttonDefault : theme.buttonHover)};
    font-size: 1em;
    display: flex;
    cursor: pointer;
    align-items: center;
    text-overflow: ellipsis;
    border: none;
    border-radius: 3px;
    padding: 4px 8px;
    transition: 0.25s all;
    white-space: nowrap;
    justify-content: flex-start;
    color: ${theme.textColor};
    &:hover {
        background: ${theme.buttonHover};
    }
    @media screen and (max-width: 864px) {
        display: ${(props) => (props.isMobile ? "flex" : "none")};

        margin: 0;
    }
`;

export const QueryBarContainer = styled.div`
    display: flex;
    padding: 3px 6px;
    margin: 5px 0px;
    margin-left: 0px;
    background: ${theme.widgetContainer};
    flex-wrap: wrap;
    border-radius: 3px;
`;
export const ShowLogsBtn = styled.button`
    background: ${theme.primaryDark};
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    border-radius: 3px;

    margin-left: 5px;
    transition: 0.25s all;
    padding: 4px 8px;
    font-size: 1em;
    line-height: 1.5;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    &:hover {
        background: ${theme.primaryLight};
    }
    &:disabled {
        background: ${theme.buttonDefault};
        cursor: not-allowed;
    }
    @media screen and (max-width: 864px) {
        display: ${(props) => (props.isMobile ? "flex" : "none")};

        margin: 0;
    }
`;

export const MobileTopQueryMenu = styled.div`
    display: none;
    @media screen and (max-width: 864px) {
        display: flex;
        justify-content: space-between;
        margin: 10px;
    }
`;
