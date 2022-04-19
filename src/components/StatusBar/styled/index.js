import styled from "@emotion/styled";
import darkTheme from "../../../theme/dark";
import { BtnSmall } from "../../../theme/styles/Button";
import { InputSmall } from "../../../theme/styles/Input";
const theme = darkTheme;
export const MenuButton = styled(BtnSmall)`
    background: none;
    border: none;
    display: flex;
    height: 26px;
    color: ${(props) =>
        props.isActive ? theme.inputTextFocus : theme.textColor};
    cursor: pointer;
`;

export const StatusBarCont = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 7px;
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
            font-size: 12px;
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
    height: 26px;

    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: ${theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 12px;
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

export const ApiSelectorButton = styled(BtnSmall)`
    background: ${theme.buttonDefault};
    color: ${theme.textColor};
    text-overflow: ellipsis;
    transition: 0.2s all;
    &:hover {
        background: ${theme.buttonHover};
    }
`;
export const ApiSelectorInput = styled(InputSmall)`
    color: ${theme.textColor};
    background: ${theme.inputBg};
    &:focus {
        color: orange;
    }
`;
export const UrlCopyButton = styled(BtnSmall)`
    background: ${theme.buttonDefault};
    color: ${({ isActive }) => (isActive ? "orange" : theme.textColor)};
    cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
    text-overflow: ellipsis;
    transition: 0.2s all;
    span {
        margin-left: 4px;
        color: ${theme.textColor};
    }
    &:hover {
        background: ${theme.buttonHover};
    }
`;

export const DatePickerButton = styled(BtnSmall)`
    background: ${theme.buttonDefault};
    color: ${theme.textColor};
    height: 26px;
    margin-left: 10px;
    span {
        margin-left: 5px;
    }
    &:hover {
        color: orange;
    }
`;
