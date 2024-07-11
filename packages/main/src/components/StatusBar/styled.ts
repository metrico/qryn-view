import styled from "@emotion/styled";
import { BtnSmall } from "@ui/theme/styles/Button";
import { InputSmall } from "@ui/theme/styles/Input";
export const MenuButton: any = styled(BtnSmall)`
    background: none;
    border: none;
    display: flex;
    height: 26px;
    color: ${(props: any) =>
        props.isActive ? props.theme.primary : props.theme.contrast};
    cursor: pointer;
`;

export const StatusBarCont: any = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 7px 4px 5px;
    background: ${({ theme }: any) => theme.shadow};
`;

export const StatusCont = styled.div`
    display: flex;
    align-items: center;
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: ${(props: any) => props.theme.alphaNeutral};
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            background: ${(props: any) => props.theme.inputLabelBg};
            border-radius: 4px;
            white-space: nowrap;
        }
    }
    input {
        color: ${(props: any) => props.theme.contrast};
        background: ${(props: any) => props.theme.deep};
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
            color: ${(props: any) => props.theme.alphaNeutral};
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            background: ${(props: any) => props.theme.background};
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
    background: ${(props: any) => props.theme.neutral};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    color: ${(props: any) => props.theme.contrast};
    text-overflow: ellipsis;
    transition: 0.2s all;
    display: flex;
    align-items: center;
    height: 26px;
    &:hover {
        background: ${(props: any) => props.theme.lightNeutral};
    }
    span {
        margin: 0;
        padding: 0;
        @media screen and (max-width: 565px) {
            display: none;
        }
    }
`;
export const ApiSelectorInput = styled(InputSmall)`
    color: ${(props: any) => props.theme.contrast};
    background: ${(props: any) => props.theme.deep};
    border: 1px solid ${({ theme }: any) => theme.accentNeutral};
    height: 18px;
    margin-right: 4px;
    &:focus {
        color: orange;
    }
`;

// we should use central , lef and right properties in here

export const DatePickerButton: any = styled.button`
    display: flex;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
    border: none;
    border-radius: ${(props: any) => {
        switch (props.side) {
            case "central":
                return "0px";
            case "left":
                return "10px 0px 0px 10px";
            case "right":
                return "0px 10px 10px 0px";
            case "individual":
                return "10px";
        }
    }};
    padding: 0px 6px;
    white-space: nowrap;
    background: ${(props: any) => props.theme.neutral};
    border: 1px solid ${(props: any) => props.theme.deep};
    color: ${(props: any) => props.theme.contrast};
    height: 26px;
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
    background: ${(props: any) => props.theme.neutral};
    color: ${({ isActive, theme }: any) =>
        isActive ? "orange" : theme.contrast};
    cursor: ${({ isActive }: any) => (isActive ? "pointer" : "not-allowed")};
    text-overflow: ellipsis;
    transition: 0.2s all;
    height: 26px;
    span {
        margin-left: 4px;
        color: ${(props: any) => props.theme.contrast};
        @media screen and (max-width: 565px) {
            display: none;
        }
    }
    &:hover {
        background: ${(props: any) => props.theme.lightNeutral};
    }
`;
