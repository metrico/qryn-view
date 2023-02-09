import styled from "@emotion/styled";
import { BtnSmall } from "../../theme/styles/Button";

export const PageContainer: any = styled.div`
    overflow-x: hidden;
    margin: 0px;
    padding: 0px;
    left: 0;
    top: 0;
    border-radius: 3px;
    background: ${({ theme }: any) => theme.viewBg};
    color: ${({ theme }: any) => theme.textColor};
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    align-items: center;

    .cont {
        max-width: 1440px;
        padding: 10px;
        margin: 10px;
        width: 100%;
        background: ${({ theme }: any) => theme.widgetContainer};
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-x: hidden;
    }
    .ds-header {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 24px;
        display: flex;

        margin: 10px;
        justify-content: space-between;
        align-items: center;
        padding-left: 0px;
        .logo {
            margin-right: 10px;
        }
    }
    .ds-cont {
        margin-bottom: 10px;
        border: 1px solid ${({ theme }: any) => theme.buttonBorder};
        border-radius: 3px;
        color: ${({ theme }: any) => theme.textColor};
    }

    .ds-item {
        padding: 10px;
        background: ${({ theme }: any) => theme.viewBg};
        //    margin-bottom: 10px;
        border-radius: 3px 3px 0px 0px;
        padding-bottom: 14px;
        display: flex;
        color: ${({ theme }: any) => theme.textColor};
        .logo {
            padding: 10px;
            padding-right: 20px;
            padding-left: 0px;
        }
        .ds-text {
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .ds-type {
            font-size: 18px;
            padding: 10px;
            padding-left: 0px;
            color: ${({ theme }: any) => theme.textColor};
        }
        small {
            font-size: 12px;
        }
        .setting-icon {
            justify-self: flex-end;
            cursor: pointer;
        }
        .ds-settings {
            background: ${({ theme }: any) => theme.viewBg};
        }
    }
`;

export const Label: any = styled.div`
    color: ${({ theme }: any) => theme.textColor};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 10px;
    //flex: 0;
    white-space: nowrap;
    ${(props: any) => (props.width !== null ? `width:${props.width}px;` : "")}
    border-radius: 3px 0px 0px 3px;
    display: flex;
    align-items: center;
    height: 28px;
`;

export const Input: any = styled.input`
    display: flex;
    flex: 1;
    background: ${({ theme }: any) => theme.inputBg};
    color: ${({ theme }: any) => theme.textColor};
    border: 1px solid
        ${(props: any) => (props.error ? "#b62c14" : props.theme.buttonBorder)};
    border-radius: 3px;
    justify-self: flex-end;
    height: 26px;
    padding-left: 8px;
`;

export const TextArea: any = styled.textarea`
    display: flex;
    flex: 1;
    background: ${({ theme }: any) => theme.inputBg};
    color: ${({ theme }: any) => theme.textColor};
    border: 1px solid ${({ theme }: any) => theme.buttonBorder};
    border-radius: 3px;
    justify-self: flex-end;
    padding-left: 8px;
`;

export const InputGroup: any = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
    ${(props: any) =>
        props?.width && props?.width === "normal" ? "" : "flex:1;"}
    //flex: 1;
    select {
        background: ${({ theme }: any) => theme.inputBg};
        color: ${({ theme }: any) => theme.textColor};
        border: 1px solid ${({ theme }: any) => theme.buttonBorder};
        border-radius: 3px;
        font-size: 12px;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 1px 2px 1px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        option {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`;

export const InputCol: any = styled.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
    &.internal {
        max-width: 400px;
    }
`;

export const InputHeaderCol: any = styled.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    align-items: center;
`;
export const InputCont: any = styled.div`
    padding: 10px;
`;
export const LinkFieldsGroup: any = styled.div`
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ theme }: any) => theme.mainBgColor};
`;

export const SettingsTitle: any = styled.div`
    padding: 10px;
    border-bottom: 1px solid ${({ theme }: any) => theme.widgetContainer};
    border-radius: 3px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    .edit-buttons {
        display: flex;
        align-items: center;
        &:disabled {
            display: none;
        }
    }
`;

export const DataSourceSettingsCont: any = styled.div`
    background: ${({ theme }: any) => theme.inputBg};
    padding: 10px;
    border-radius: 0px 0px 3px 3px;
    border-top: 1px solid ${({ theme }: any) => theme.buttonBorder};
`;

export const DsButtonStyled: any = styled(BtnSmall)`
    background: ${(props: any) =>
        props.primary ? props.theme.primaryDark : props.theme.buttonDefault};
    border: 1px solid ${({ theme }: any) => theme.buttonBorder};
    color: ${(props: any) =>
        props.primary ? props.theme.buttonText : props.theme.textColor};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    height: 28px;
    display: flex;
    &:hover {
        background: ${({ theme }: any) => theme.primaryLight};
        color: ${(props: any) =>
            props.primary ? props.theme.textColor : props.theme.buttonText};
    }
    &:disabled {
        background: ${({ theme }: any) => theme.buttonDefault};
        border: 1px solid ${({ theme }: any) => theme.buttonBorder};
        cursor: not-allowed;
        color: ${({ theme }: any) => theme.textColor};
    }
    @media screen and (max-width: 864px) {
        display: flex;

        margin: 0;
    }
`;
