import styled from "@emotion/styled";

import { BtnSmall } from "../../theme/styles/Button";
import { InputSmall } from "../../theme/styles/Input";

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;
export const InlineGroup = styled.div`
    display: flex;
    align-items: center;
`;

export const SettingCont = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

  
    background: ${({ theme }: any) => theme.widgetContainer};
`;

export const SettingsInputContainer: any = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const SettingInput: any = styled(InputSmall)`
    background: ${({ theme }: any) => theme.inputBg};
    margin: 5px;
    flex: 1;
    padding: 5px 12px;
    border: 1px solid ${({ theme }: any) => theme.buttonBorder};
    color: ${({ theme }: any) => theme.textColor};
    &:focus {
        border: 1px solid ${({ theme }: any) => theme.buttonHover};
    }
`;
export const SettingButton: any = styled(BtnSmall)`
    background: ${({ theme }: any) => theme.primaryDark};
    color: ${({ theme }: any) => theme.buttonText};
    height: 30px;
    &:hover {
        background: ${({ theme }: any) => theme.primaryLight};
    }
`;

export const SettingLabel: any = styled.label`
    font-size: 12px;
    color: ${({ theme }: any) => theme.inputLabelColor};
    margin-left: 10px;
`;

export const SettingLabelSection : any = styled.label`
display:flex;
font-size: 12px;
margin-left: 10px;
color: ${({ theme }: any) => theme.inputLabelColor};
border-bottom: 1px solid ${({ theme }: any) => theme.buttonBorder};
padding:2px;
margin-bottom:2px;
`
export const SettingHeader: any = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    h3 {
        margin-left: 10px;
        font-size: 1em;
        color: ${({ theme }: any) => theme.textColor};
    }
`;
export const SettingCloseBtn: any = styled(BtnSmall)`
    background: none;
    padding: 0;
    color: ${({ theme }: any) => theme.textColor};
`;

export const EmbedArea: any = styled.textarea`
    display: flex;
    flex: 1;
    margin: 5px;
    height: 150px;
    padding: 5px 8px;
    border: 1px solid ${({theme}: any) => theme.buttonBorder};
    border-radius: 3px;
    background: ${({ theme }: any) => theme.inputBg};
    color: ${({ theme }: any) => theme.textColor};
`;
