import styled from "@emotion/styled";
import { BtnSmall } from "../../theme/styles/Button";
import { InputSmall } from "../../theme/styles/Input";
export const MenuButton: any = styled(BtnSmall)`
    background: none;
    border: none;
    display: flex;
    height: 26px;
    color: ${(props: any) =>
        props.isActive ? props.theme.inputTextFocus : props.theme.textColor};
    cursor: pointer;
`;

export const StatusBarCont: any = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 7px 4px 5px;
    background: ${({ theme }: any) => theme.widgetContainer};
`;

export const StatusCont = styled.div`
    display: flex;
    align-items: center;
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: ${(props: any) => props.theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            background: ${(props: any) => props.theme.inputLabelBg};
            border-radius: 4px;
            white-space: nowrap;
        }
    }
    input {
        color: ${(props: any) => props.theme.textColor};
        background: ${(props: any) => props.theme.inputBg};
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

export const ApiSelectorStyled: any = styled.div`
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
            color: ${(props: any) => props.theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            background: ${(props: any) => props.theme.mainBgColor};
            border-radius: 4px;
            white-space: nowrap;
        }
        .input {
            background: ${(props: any) => props.theme.inputLabelBg};
        }
    }
    & div {
        display: flex;
        align-items: center;
    }
`;

export const ApiSelectorButton = styled(BtnSmall)`
    background: ${(props: any) => props.theme.buttonDefault};
    border: 1px solid ${(props: any) => props.theme.buttonBorder};
    color: ${(props: any) => props.theme.textColor};
    text-overflow: ellipsis;
    transition: 0.2s all;
    display:flex;
    align-items:center;
    height: 26px;
    &:hover {
        background: ${(props: any) => props.theme.buttonHover};
    }
    span {
        margin:0;
        padding:0;
        @media screen and (max-width: 565px) {
        display: none;
        }
    }
`;
export const ApiSelectorInput = styled(InputSmall)`
    color: ${(props: any) => props.theme.textColor};
    background: ${(props: any) => props.theme.inputBg};
    border: 1px solid ${({ theme }: any) => theme.buttonBorder};
    height: 18px;
    margin-right: 4px;
    &:focus {
        color: orange;
    }
`;


export const DatePickerButton: any = styled(BtnSmall)`
    background: ${(props: any) => props.theme.buttonDefault};
    border: 1px solid ${(props: any) => props.theme.buttonBorder};
    color: ${(props: any) => props.theme.textColor};
    border-radius: 3px;
    height: 26px;
    margin:0px 1px;
    padding: ${(props: any) => props.size === 'small' ? '3px 5px' : ''};
    span {
        margin-left: 5px;
    }
    svg {
        margin: 0;
        padding: 0;
    }
    &:hover {
        color: orange;
    }
`;
export const UrlCopyButton: any = styled(DatePickerButton)`
    background: ${(props: any) => props.theme.buttonDefault};
    color: ${({ isActive, theme }: any) => (isActive ? "orange" : theme.textColor)};
    cursor: ${({ isActive }: any) => (isActive ? "pointer" : "not-allowed")};
    text-overflow: ellipsis;
    transition: 0.2s all;
    height: 26px;
    span {
        margin-left: 4px;
        color: ${(props: any) => props.theme.textColor};
        @media screen and (max-width: 565px) {
        display: none;
    }
    }
    &:hover {
        background: ${(props: any) => props.theme.buttonHover};
    }
    
`;