import styled from "@emotion/styled";

import { BtnSmall } from "../../../theme/styles/Button";
import { InputSmall } from "../../../theme/styles/Input";


export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;s
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

    height: 650px;
    background: ${({theme}) => theme.widgetContainer};
`;

export const SettingsInputContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const SettingInput = styled(InputSmall)`
    background: ${({theme}) => theme.inputBg};
    margin: 5px;
    flex: 1;
    padding: 5px 12px;
    border: 1px solid transparent;
    color: ${({theme}) => theme.textColor};
    &:focus {
        border: 1px solid ${({theme}) => theme.buttonHover};
    }
`;
export const SettingButton = styled(BtnSmall)`
    background: ${({theme}) => theme.primaryDark};
    color: ${({theme}) => theme.buttonText};
    height: 26px;
    &:hover {
        background: ${({theme}) => theme.primaryLight};
    }
`;

export const SettingLabel = styled.label`
    font-size: 12px;
    color: ${({theme}) => theme.inputLabelColor};
    margin-left: 10px;
`;

export const SettingHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    h3 {
        margin-left: 10px;
        font-size: 1em;
        color: ${({theme}) => theme.textColor};
    }
`;
export const SettingCloseBtn = styled(BtnSmall)`
    background: none;
    padding: 0;
    color: ${({theme}) => theme.textColor};
`;

export const EmbedArea = styled.textarea`
    display: flex;
    flex: 1;
    margin: 5px;
    height: 150px;
    padding: 5px 8px;
    border: none;
    border-radius: 3px;
    background: ${({theme}) => theme.inputBg};
    color: ${({theme}) => theme.textColor};
`;
