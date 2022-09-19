import styled from "@emotion/styled";
export const PageContainer = styled.div`
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
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    .cont {
        padding: 10px;
        margin: 10px;
        background: ${({ theme }) => theme.widgetContainer};
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .ds-header {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 24px;
        display: flex;
        align-items: center;
        padding-left: 0px;
        .logo {
            margin-right: 10px;
        }
    }
    .ds-cont {
        margin-bottom: 10px;
        border: 1px solid ${({theme}) => theme.buttonBorder};
        border-radius:3px;
    }
    .ds-item {
        padding: 10px;
        background: ${({ theme }) => theme.viewBg};
        //    margin-bottom: 10px;
        border-radius: 3px 3px 0px 0px;
        padding-bottom: 14px;
        display: flex;
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
    background: ${(props) => props.theme.buttonInactive};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 8px;
    flex: 0;
    white-space: nowrap;
    height: 19px;
    border-radius: 3px 0px 0px 3px;
`;

export const Input = styled.input`
    display: flex;
    background: ${(props) => props.theme.inputBg};
    color: ${(props) => props.theme.textColor};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    border-radius: 3px;
    justify-self: flex-end;
    padding-left: 8px;
`;

export const InputGroup = styled.div`
    display: flex;
    margin-right: 10px;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
`;

export const InputCol = styled.div`
    display: flex;
    margin: 15px 0px;
    flex-wrap:wrap;
`;
export const LinkFieldsGroup = styled.div`
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid  ${({ theme }) => theme.mainBgColor};
`;

export const SettingsTitle = styled.div`
    padding: 10px;
    background: ${({ theme }) => theme.mainBgColor};
    border-radius:3px;

`;

export const DatsourceSettingsCont = styled.div`
    background: ${(props) => props.theme.inputBg};
    padding: 10px;
    border-radius: 0px 0px 3px 3px;
    border-top: 1px solid ${({ theme }) => theme.buttonBorder};
`;
