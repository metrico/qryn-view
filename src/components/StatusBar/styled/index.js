import styled from "@emotion/styled";
import { BtnSmall } from "../../../theme/styles/Button";
import { InputSmall } from "../../../theme/styles/Input";
export const MenuButton = styled(BtnSmall)`
    background: none;
    border: none;
    display: flex;
    height: 26px;
    color: ${(props) =>
        props.isActive ? props.theme.inputTextFocus : props.theme.textColor};
    cursor: pointer;
`;

export const StatusBarCont = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 7px 4px 5px;
    background: ${({theme})=>theme.widgetContainer}
`;

export const StatusCont = styled.div`
    display: flex;
    align-items: center;
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: ${props => props.theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            background: ${props => props.theme.inputLabelBg};
            border-radius: 4px;
            white-space: nowrap;
        }
    }
    input {
        color: ${props => props.theme.textColor};
        background: ${props => props.theme.inputBg};
        border: none;
        outline: none;
        padding: 4px 8px;
        font-size: 1em;
        border-radius: 3px;
        line-height: 1.5;
        margin: 0px 5px;
        &:focus {
            color: orange;
        }
        &.limit {
            width: 50px;
        }

        &.date-time-range {
            width: 120px;
        }
    }
`;
export const ApiSelectorStyled = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    display: flex;
    align-items: center;
    transition: 0.2s all;
    height: 26px;
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: ${props => props.theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            background: ${props => props.theme.mainBgColor};
            border-radius: 4px;
            white-space: nowrap;
        }
        .input {
            bacgkround: ${props => props.theme.inputLabelBg}
        }
    }
    & div {
        display: flex;
        align-items: center;
    }
    @media screen and (max-width: 850px) {
        display: none;
    }
`;

export const ApiSelectorButton = styled(BtnSmall)`
    background: ${props => props.theme.buttonDefault};
    border:1px solid ${(props)=>props.theme.buttonBorder};
    color: ${props => props.theme.textColor};
    text-overflow: ellipsis;
    transition: 0.2s all;
    height:26px;
    &:hover {
        background: ${props => props.theme.buttonHover};
    }
`;
export const ApiSelectorInput = styled(InputSmall)`
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.inputBg};
    border: 1px solid ${({theme}) => theme.buttonBorder};
    height:18px;
    margin-right:4px;
    &:focus {
        color: orange;
    }
`;
export const UrlCopyButton = styled(BtnSmall)`
    background: ${props => props.theme.buttonDefault};
    border:1px solid ${(props)=>props.theme.buttonBorder};
    color: ${({ isActive, theme }) => (isActive ? "orange" : theme.textColor)};
    cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
    text-overflow: ellipsis;
    transition: 0.2s all;
    height:26px;
    span {
        margin-left: 4px;
        color: ${props => props.theme.textColor};
    }
    &:hover {
        background: ${props => props.theme.buttonHover};
    }
`;



export const DatePickerButton = styled(BtnSmall)`
    background: ${props => props.theme.buttonDefault};
    border:1px solid ${(props)=>props.theme.buttonBorder};
    color: ${props => props.theme.textColor};
    height: 26px;
    margin-left: 10px;
    span {
        margin-left: 5px;
    }
    &:hover {
        color: orange;
    }
`;
