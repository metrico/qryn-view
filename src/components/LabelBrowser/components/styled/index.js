import styled from "@emotion/styled";

import HistoryIcon from "@mui/icons-material/History";
import { BtnSmall } from "../../../../theme/styles/Button";

export const HistoryIconStyled = styled(HistoryIcon)`
    height:18px;
    color: ${({color}) => color};
    width:18px;
`;
export const HistoryButtonStyled = styled(BtnSmall)`
    background: none;
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
    background: ${({browserActive,theme}) =>
        browserActive ? theme.buttonDefault : theme.buttonHover};
    text-overflow: ellipsis;
    transition: 0.25s all;
    justify-content: flex-start;
    color: ${({theme}) => theme.textColor};
    &:hover {
        background: ${({theme}) => theme.buttonHover};
    }
    @media screen and (max-width: 864px) {
        display: ${({isMobile}) => (isMobile ? "flex" : "none")};

        margin: 0;
    }
`;

export const QueryBarContainer = styled.div`
    display: flex;
    padding: 3px 6px;
    margin: 5px 0px;
    margin-left: 0px;
    background: ${({theme}) => theme.widgetContainer};
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
