import styled from "@emotion/styled";
import { BtnSmall } from "../../theme/styles/Button";

export const PageContainer = styled.div`
    overflow-x:hidden;
    margin: 0px;
    padding: 0px;
    left: 0;
    top: 0;
    border-radius: 3px;
    background: ${({ theme }) => theme.viewBg};
    color: ${({ theme }) => theme.textColor};
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
        background: ${({ theme }) => theme.widgetContainer};
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-x:hidden;
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
        border: 1px solid ${({ theme }) => theme.buttonBorder};
        border-radius: 3px;
        color: ${({theme})=> theme.textColor};
    }

    .ds-item {
        padding: 10px;
        background: ${({ theme }) => theme.viewBg};
        //    margin-bottom: 10px;
        border-radius: 3px 3px 0px 0px;
        padding-bottom: 14px;
        display: flex;
        color: ${({theme})=> theme.textColor};
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
            color: ${({ theme }) => theme.textColor};
        }
        small {
            font-size: 12px;
        }
        .setting-icon {
            justify-self: flex-end;
            cursor: pointer;
        }
        .ds-settings {
            background: ${({ theme }) => theme.viewBg};
        }
    }
`;

export const Label = styled.div`
    color: ${(props) => props.theme.textColor};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 10px;
    //flex: 0;
    white-space: nowrap;
    ${props => props.width !== null ? `width:${props.width};` : ''}
    border-radius: 3px 0px 0px 3px;
    display:flex;
    align-items:center;
    height:28px;
  
`;

export const Input = styled.input`
    display: flex;
    flex: 1;
    background: ${(props) => props.theme.inputBg};
    color: ${(props) => props.theme.textColor};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    border-radius: 3px;
    justify-self: flex-end;
    height: 26px;
    padding-left: 8px;
`;

export const TextArea = styled.textarea`
    display: flex;
    flex: 1;
    background: ${(props) => props.theme.inputBg};
    color: ${(props) => props.theme.textColor};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    border-radius: 3px;
    justify-self: flex-end;
    padding-left: 8px;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
    ${props => props?.width && props?.width === 'normal' ? '' : 'flex:1;'}
    //flex: 1;
    select {
        background: ${(props) => props.theme.inputBg};
        color: ${(props) => props.theme.textColor};
        border: 1px solid ${(props) => props.theme.buttonBorder};
        border-radius: 3px;
        font-size: 12px;
        height: 30px;
        display:flex;
        align-items:center;
        padding:1px 2px 1px 8px;
    }
`;

export const InputCol = styled.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
    &.internal {
        max-width:400px;
    }
`;

export const InputHeaderCol = styled.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    align-items: center;
`;
export const InputCont = styled.div`
    padding: 10px;
`;
export const LinkFieldsGroup = styled.div`
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.mainBgColor};
`;

export const SettingsTitle = styled.div`
    padding: 10px;
    border-bottom: 1px solid  ${({ theme }) => theme.widgetContainer};
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

export const DataSourceSettingsCont = styled.div`
    background: ${(props) => props.theme.inputBg};
    padding: 10px;
    border-radius: 0px 0px 3px 3px;
    border-top: 1px solid ${({ theme }) => theme.buttonBorder};
`;

export const DsButtonStyled = styled(BtnSmall)`
    background: ${(props) =>
        props.primary ? props.theme.primaryDark : props.theme.buttonDefault};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    color: ${(props) => props.primary ? props.theme.buttonText: props.theme.textColor};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    height: 28px;
    display:flex;
    &:hover {
        background: ${(props) => props.theme.primaryLight};
        color: ${(props) => props.primary ? props.theme.textColor: props.theme.buttonText};
        
    }
    &:disabled {
        background: ${(props) => props.theme.buttonDefault};
        border: 1px solid ${(props) => props.theme.buttonBorder};
        cursor: not-allowed;
        color: ${(props) => props.theme.textColor};
    }
    @media screen and (max-width: 864px) {
        display: flex;

        margin: 0;
    }
`;
