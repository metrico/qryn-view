import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import HistoryIcon from "@mui/icons-material/History";
import { BtnSmall as btnSmall } from "@ui/theme/styles/Button";
import { InputSmall } from "@ui/theme/styles/Input";

const BtnSmall = btnSmall as any;
export const HistoryIconStyled: any = styled(HistoryIcon)`
    height: 18px;
    color: ${({ color }) => color};
    width: 18px;
`;
export const HistoryButtonStyled: any = styled(BtnSmall)`
    background: none;
    margin-left: 5px;
    padding: 0px 8px;
    color: ${(props) => props.theme.contrast};
    background: ${(props) => props.theme.neutral};
    border: 1px solid ${(props) => props.theme.accentNeutral};
    height: 26px;
    span {
        margin-left: 5px;
    }
    @media screen and (max-width: 1070px) {
        display: flex;
        gap: 2px;
    }
`;

export const ShowLabelsBtn: any = styled(BtnSmall)`
    background: ${({ theme }) => theme.neutral};
    border: 1px solid ${(props) => props.theme.accentNeutral};
    text-overflow: ellipsis;
    transition: 0.25s all;
    padding: 0px 2px;
    padding-right: 8px;
    margin-left: 4px;
    justify-content: flex-start;
    color: ${({ theme }: any) => theme.contrast};
    height: 26px;
    &:hover {
        background: ${({ theme }: any) => theme.lightNeutral};
    }
    @media screen and (max-width: 1070px) {
        display: ${({ isMobile }) => (isMobile ? "flex" : "none")};
        margin: 0;
        gap: 2px;
    }
`;

export const QueryBarContainer: any = styled.div`
    display: flex;
    margin-left: 0px;
    flex-wrap: wrap;
    border-radius: 3px;
    gap: 2px;
`;
export const ShowLogsBtn: any = styled(BtnSmall, {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== "loading",
})`
    background: ${(props) => (props.loading ? "#44bcd8" : props.theme.primary)};
    border: 1px solid ${(props) => props.theme.primaryAccent};
    color: ${(props) => props.theme.maxContrast};
    transition: 0.25s all;
    justify-content: center;
    height: 26px;
    margin: 0px 4px;
    &:hover {
        background: ${(props) => props.theme.primaryLight};
    }
    &:disabled {
        background: ${(props) => props.theme.neutral};
        border: 1px solid ${(props) => props.theme.accentNeutral};
        cursor: not-allowed;
        color: ${(props) => props.theme.contrast};
    }
    @media screen and (max-width: 1070px) {
        display: flex;
        margin: 0;
        gap: 2px;
    }
`;

export const ShowSettingsBtn: any = styled(BtnSmall)`
    background: none;
    margin-left: 5px;
    color: ${(props) => props.theme.contrast};
    background: ${(props) => props.theme.neutral};
    border: 1px solid ${(props) => props.theme.accentNeutral};
    height: 26px;
    span {
        margin-left: 5px;
    }
    display: ${(props) => (props.isMobile || props.isSplit ? "flex" : "none")};
`;

export const MobileTopQueryMenu: any = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 4px;
    @media screen and (max-width: 1070px) {
        display: flex;
        gap: 2px;
    }
`;

export const InputGroup: any = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-right: 10px;
    margin: 2px;
`;
export const InlineGroup: any = styled.div`
    display: flex;
    align-items: center;
`;

export const SettingCont: any = styled.div<{ theme: any }>`
    display: flex;
    flex: 1;
    flex-direction: column;
    background: ${({ theme }) => theme.shadow};
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
    background: ${({ theme }: any) => theme.deep};
    margin: 5px;
    flex: 1;
    padding: 5px 12px;
    border: 1px solid ${({ theme }: any) => theme.accentNeutral};
    color: ${({ theme }: any) => theme.contrast};
    &:focus {
        border: 1px solid ${({ theme }: any) => theme.lightNeutral};
    }
`;
export const SettingButton: any = styled(BtnSmall)`
    background: ${({ theme }: any) => theme.primary};
    border: 1px solid ${(props: any) => props.theme.primaryAccent};
    color: ${({ theme }: any) => theme.maxContrast};
    height: 30px;
    &:hover {
        background: ${({ theme }: any) => theme.primaryLight};
    }
`;

export const SettingLabel: any = styled.label`
    font-size: 12px;
    color: ${({ theme }: any) => theme.alphaNeutral};
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
        color: ${({ theme }: any) => theme.contrast};
    }
`;
export const SettingCloseBtn: any = styled(BtnSmall)`
    background: none;
    padding: 0;
    color: ${({ theme }: any) => theme.contrast};
`;
