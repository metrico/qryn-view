import styled from "@emotion/styled";

export const MainViewStyled = styled.div`
    position: absolute;
    top: 0;
    padding-top: 5px;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.mainBgColor} !important;
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${(props) => props.theme.scrollbarThumb} !important;
    }
`;





export const InputGroup = styled.div`
    display: flex;
    align-items:center;
`;
export const InlineGroup = styled.div`
    display: flex;
    align-items: center;
`;

export const SettingCont = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

  
    background: ${({ theme }) => theme.widgetContainer};
`;

export const SettingsInputContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;


export const SettingLabel = styled.label`
    font-size: 12px;
    color: ${({ theme }) => theme.inputLabelColor};
    margin-left: 10px;
`;

