
import styled from "@emotion/styled";


import darkTheme from '../../../theme/dark';
import { BtnSmall } from '../../../theme/styles/Button';
import { InputSmall } from '../../../theme/styles/Input';



const dTheme = darkTheme;

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

    height: 650px;
    background: ${dTheme.black.b300};
`;

export const SettingsInputContainer = styled.div`
    margin:20px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const SettingInput = styled(InputSmall)`
    background: ${dTheme.inputBg};
    margin: 5px;
    flex: 1;
    padding:5px 12px;
    border:1px solid transparent;
    &:focus {
        background: ${dTheme.black.b100};
        border:1px solid ${dTheme.buttonHover};
        color:${dTheme.buttonText};
    }
`;
export const SettingButton = styled(BtnSmall)`
    background: ${dTheme.primaryDark};
    color:${dTheme.buttonText};
    height:26px;
    &:hover {
        background: ${dTheme.primaryLight};
    }
`;

export const SettingLabel = styled.label`
    font-size: 12px;
    color: ${dTheme.inputLabelColor};
    margin-left: 10px;
`;

export const SettingHeader = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
margin:10px;
h3 {
    margin-left: 10px;
    font-size: 1em;
    color:${dTheme.textColor}

}
`
export const SettingCloseBtn = styled(BtnSmall)`
background:none;
padding:0;
color:${dTheme.textColor}
`