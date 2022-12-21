import styled from "@emotion/styled";
import { BtnSmall } from "../../theme/styles/Button";
import { InputSmall } from "../../theme/styles/Input";
export const MenuButton = styled(BtnSmall)`
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
            color: ${({theme}: any) => theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            background: ${({theme}: any) => theme.inputLabelBg};
            border-radius: 4px;
            white-space: nowrap;
        }
    }
    input {
        color: ${({theme}: any) => theme.textColor};
        background: ${({theme}: any) => theme.inputBg};
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
            color: ${({theme}: any) => theme.inputLabelColor};
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            background: ${({theme}: any) => theme.mainBgColor};
            border-radius: 4px;
            white-space: nowrap;
        }
        .input {
            bacgkround: ${({theme}: any) => theme.inputLabelBg};
        }
    }
    & div {
        display: flex;
        align-items: center;
    }
`;

export const ApiSelectorButton = styled(BtnSmall)`
    background: ${({theme}: any) => theme.buttonDefault};
    border: 1px solid ${({theme}: any) => theme.buttonBorder};
    color: ${({theme}: any) => theme.textColor};
    text-overflow: ellipsis;
    transition: 0.2s all;
    display:flex;
    align-items:center;
    height: 26px;
    &:hover {
        background: ${({theme}: any) => theme.buttonHover};
    }
    span {
        margin:0;
        padding:0;
    }
`;
export const ApiSelectorInput = styled(InputSmall)`
    color: ${({theme}: any) => theme.textColor};
    background: ${({theme}: any) => theme.inputBg};
    border: 1px solid ${({ theme }: any) => theme.buttonBorder};
    height: 18px;
    margin-right: 4px;
    &:focus {
        color: orange;
    }
`;
export const UrlCopyButton: any = styled(BtnSmall)`
    background: ${({theme}: any) => theme.buttonDefault};
    border: 1px solid ${({theme}: any) => theme.buttonBorder};
    color: ${({ isActive, theme }: any) => (isActive ? "orange" : theme.textColor)};
    cursor: ${({ isActive }: any) => (isActive ? "pointer" : "not-allowed")};
    text-overflow: ellipsis;
    transition: 0.2s all;
    height: 26px;
    span {
        margin-left: 4px;
        color: ${({theme}: any) => theme.textColor};
    }
    &:hover {
        background: ${({theme}: any) => theme.buttonHover};
    }
`;

export const DatePickerButton = styled(BtnSmall)`
    background: ${({theme}: any) => theme.buttonDefault};
    border: 1px solid ${({theme}: any) => theme.buttonBorder};
    color: ${({theme}: any) => theme.textColor};
    border-top-left-radius: ${(props: any) => props.attachedSide === 'l' || props.attachedSide === 'both' ? '0' : ''};
    border-top-right-radius: ${(props: any) => props.attachedSide === 'r' || props.attachedSide === 'both' ? '0' : ''};
    border-bottom-left-radius: ${(props: any) => props.attachedSide === 'l' || props.attachedSide === 'both' ? '0' : ''};
    border-bottom-right-radius: ${(props: any) => props.attachedSide === 'r' || props.attachedSide === 'both' ? '0' : ''};
    border-right: ${(props: any) => props.attachedSide === 'r' || props.attachedSide === 'both' ? 'unset' : ''};
    height: 26px;
    margin-left: ${(props: any) => props.emptySide === 'l' || props.emptySide === 'both' ? '10px' : ''};
    margin-right: ${(props: any) => props.emptySide === 'r' || props.emptySide === 'both' ? '10px' : ''};
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
