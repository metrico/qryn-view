
import styled from "@emotion/styled";
import isPropValid from '@emotion/is-prop-valid'

import HistoryIcon from "@mui/icons-material/History";
import { BtnSmall as btnSmall } from "../../../theme/styles/Button";
import { InputSmall } from "../../../theme/styles/Input";
const BtnSmall = btnSmall as any;
export const HistoryIconStyled: any = styled(HistoryIcon)`
    height: 18px;
    color: ${({ color }) => color};
    width: 18px;
`;
export const HistoryButtonStyled: any = styled(BtnSmall)`
    background: none;
    margin-left: 5px;
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.buttonDefault};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    height: 28px;
    span {
        margin-left: 5px;
    }
    @media screen and (max-width: 1070px) {
        display: flex;
    }
`;

export const ShowLabelsBtn: any = styled(BtnSmall)`
    background: ${({ theme }) => theme.buttonDefault};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    text-overflow: ellipsis;
    transition: 0.25s all;
    padding-left: 6px;
    justify-content: flex-start;
    color: ${({ theme }: any) => theme.textColor};
    height: 28px;
    &:hover {
        background: ${({ theme }: any) => theme.buttonHover};
    }
    @media screen and (max-width: 1070px) {
        display: ${({ isMobile }) => (isMobile ? "flex" : "none")};

        margin: 0;
    }
`;

export const QueryBarContainer: any = styled.div`
    display: flex;
    padding: 4px 8px;
    margin-left: 0px;
    flex-wrap: wrap;
    border-radius: 3px;
`;
export const ShowLogsBtn: any = styled(BtnSmall, {
    shouldForwardProp: prop => isPropValid(prop) && prop !== 'loading'
})`
    background: ${(props) => props.loading ? '#44bcd8' : props.theme.primaryDark};
    border: 1px solid ${(props) => props.theme.primaryBorder};
    color: ${(props) => props.theme.buttonText};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    
    height: 28px;
    &:hover {
        background: ${(props) => props.theme.primaryLight};
    }
    &:disabled {
        background: ${(props) => props.theme.buttonDefault};
        border: 1px solid ${(props) => props.theme.buttonBorder};
        cursor: not-allowed;
        color: ${(props) => props.theme.textColor};
    }
    @media screen and (max-width: 1070px) {
        display: flex;

        margin: 0;
        margin-left: 5px;
    }
`;

export const ShowSettingsBtn: any = styled(BtnSmall)`
    background: none;
    margin-left: 5px;
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.buttonDefault};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    height: 28px;
    span {
        margin-left: 5px;
    }
    display: ${(props) => (props.isMobile || props.isSplit ? "flex" : "none")};
`;

export const MobileTopQueryMenu: any = styled.div`
    display: ${(props:any) =>
        props.isSplit || props.dataSourceType === "flux" ? "flex" : "none"};
    flex-wrap: wrap;

    @media screen and (max-width: 1070px) {
        display: flex;
    }
`;

export const InputGroup: any = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-right: 10px;
`;
export const InlineGroup: any = styled.div`
    display: flex;
    align-items: center;
`;

export const SettingCont: any = styled.div<{theme:any}>`
    display: flex;
    flex: 1;
    flex-direction: column;

    background: ${({ theme }) => theme.widgetContainer};
`;

export const SettingsInputContainer: any = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    .options-input {
        margin: 10px;
        display: flex;
        justify-content: space-between;
    }
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
    border: 1px solid ${(props:any)=>props.theme.primaryBorder};
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
