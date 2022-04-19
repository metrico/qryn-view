import styled from "@emotion/styled";

import HistoryIcon from "@mui/icons-material/History";
import darkTheme from "../../../../theme/dark";
import { BtnSmall } from "../../../../theme/styles/Button";

// get theme from main state

const theme = darkTheme;

export const HistoryIconStyled = styled(HistoryIcon)`
    color: ${(props) => props.color};
    height:18px;
    width:18px;
`;
export const HistoryButtonStyled = styled(BtnSmall)`
    background: none;
    color: ${theme.buttonText};
    margin-left: 5px;
    background: ${theme.buttonHover};
    span {
        margin-left: 5px;
    }
    @media screen and (max-width: 864px) {
        display: ${(props) => (props.isMobile ? "flex" : "none")};
    }
`;

export const ShowLabelsBtn = styled(BtnSmall)`
    background: ${(props) =>
        props.browserActive ? theme.buttonDefault : theme.buttonHover};
    text-overflow: ellipsis;
    transition: 0.25s all;
    justify-content: flex-start;
    color: ${theme.buttonText};
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
export const ShowLogsBtn = styled(BtnSmall)`
    background: ${theme.primaryDark};
    color: ${theme.buttonText};
    margin-left: 10px;
    transition: 0.25s all;
    justify-content: center;
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
