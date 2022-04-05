import styled from "@emotion/styled";
import darkTheme from "../../../theme/dark";
const theme = darkTheme;
export const MenuButton = styled.button`
    padding: 0px 8px;
    font-size: 1em;
    line-height: 1.5;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    display: none;
    color: ${(props) =>
        props.isActive ? theme.inputTextFocus : theme.textColor};
    cursor: pointer;

    @media screen and (max-width: 850px) {
        display: flex;
    }
    @media screen and (max-width: 560px) {
        flex: 1;
        justify-content: flex-end;
    }
`;

export const StatusBarCont = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

export const StatusCont = styled.div`
    display: flex;
    align-items: center;
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: ${theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 0.85em;
            text-transform: uppercase;
            background: ${theme.inputLabelBg};
            border-radius: 4px;
            white-space: nowrap;
        }
    }
    input {
        color: ${theme.textColor};
        background: ${theme.inputBg};
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

    input {
        color: ${theme.textColor};
        background: ${theme.inputBg};
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
    
    }

    button {
        display: flex;
        align-items: center;
        border: none;
        padding: 4px 8px;
        border-radius: 3px;
        background: ${theme.buttonDefault};
        color: ${theme.textColor};
        font-size: 1em;
        cursor: pointer;
        line-height: 1.5;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: 0.2s all;
        &:hover {
            background: ${theme.buttonHover};
        }
    }

    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: ${theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 0.85em;
            text-transform: uppercase;
            background: ${theme.inputLabelBg};
            border-radius: 4px;
            white-space: nowrap;
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

export const UrlCopyButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    padding: 4px 8px;
    background: ${theme.buttonDefault};
    border-radius: 3px;
    color: ${({ isActive }) => (isActive ? "orange" : theme.textColor)};
    cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: 0.2s all;
    font-size: 1em;
    line-height: 1.5;
    span {
        margin-left: 4px;
        color: ${theme.textColor};
    }
    &:hover {
        background:${theme.buttonHover};
    }
`;

export const DatePickerButton = styled.button`
    cursor:pointer;
    border: none;
    background: ${theme.inputBg};
    color: ${theme.textColor};
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 1em;
    line-height: 1.5;
    display: flex;
    align-items: center;
    margin-left: 10px;
    height:32px;
    span{ margin-left:5px;}
    &:hover{
        color:orange;
    }
`;
