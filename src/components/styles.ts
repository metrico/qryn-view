import styled from "@emotion/styled";

export const MainViewStyled = styled.div`
    padding-top: 5px;
    height: 100%;
    width: 100%;
    display: flex;
    flex:1;
    flex-direction: column;
    background-color: ${({theme}: any) => theme.mainBgColor} !important;
    &::-webkit-scrollbar-corner {
        background: transparent;
      }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({theme}: any) => theme.scrollbarThumb} !important;
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

  
    background: ${({ theme }: any) => theme.widgetContainer};
`;

export const SettingsInputContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;


export const SettingLabel = styled.label`
    font-size: 12px;
    color: ${({ theme }: any) => theme.textColor};
    margin-left: 10px;
`;

