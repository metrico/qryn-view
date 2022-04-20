import styled from "@emotion/styled";

import HistoryIcon from "@mui/icons-material/History";
import { BtnSmall } from "../../../../theme/styles/Button";

// get theme from main state


export const HistoryIconStyled = styled(HistoryIcon)`
    color: ${(props) => props.color};
`;
export const HistoryButtonStyled = styled(BtnSmall)`
    background: none;
    color: ${props => props.theme.textColor};
    margin-left: 5px;
    background: ${props => props.theme.buttonDefault};
    span {
        margin-left: 5px;
    }
    @media screen and (max-width: 864px) {
        display: ${(props) => (props.isMobile ? "flex" : "none")};
    }
`;

export const ShowLabelsBtn = styled(BtnSmall)`
    background: ${(props) =>
        props.browserActive ? props.theme.buttonDefault : props.theme.buttonHover};
    text-overflow: ellipsis;
    transition: 0.25s all;
    justify-content: flex-start;
    color: ${props => props.theme.buttonText};
    &:hover {
        background: ${props => props.theme.buttonHover};
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
    background: ${props => props.theme.widgetContainer};
    flex-wrap: wrap;
    border-radius: 3px;
`;
export const ShowLogsBtn = styled(BtnSmall)`
    background: ${props => props.theme.primaryDark};
    color: ${props => props.theme.buttonText};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    &:hover {
        background: ${props => props.theme.primaryLight};
    }
    &:disabled {
        background: ${props => props.theme.buttonDefault};
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
