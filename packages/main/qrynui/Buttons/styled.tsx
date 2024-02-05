import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import HistoryIcon from "@mui/icons-material/History";
import { BtnSmall } from "@ui/theme/styles/Button";
export const HistoryIconStyled: any = styled(HistoryIcon)`
    height: 18px;
    color: ${({ color }) => color};
    width: 18px;
`;
export const HistoryButtonStyled: any = styled(BtnSmall)`
    background: none;
    margin-left: 5px;
    color: ${(props: any) => props.theme.contrast};
    background: ${(props: any) => props.theme.neutral};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    height: 26px;
    span {
        margin-left: 5px;
    }
    @media screen and (max-width: 1070px) {
        display: flex;
    }
`;

export const ShowLabelsBtn: any = styled(BtnSmall)`
    background: ${(props: any) => props.theme.neutral};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    text-overflow: ellipsis;
    transition: 0.25s all;
    padding-left: 6px;
    justify-content: flex-start;
    color: ${({ theme }: any) => theme.contrast};
    height: 26px;
    &:hover {
        background: ${({ theme }: any) => theme.lightNeutral};
    }
    @media screen and (max-width: 1070px) {
        display: ${({ isMobile }: { isMobile: boolean }) =>
            isMobile ? "flex" : "none"};

        margin: 0;
    }
`;

export const QueryBarContainer: any = styled.div`
    display: flex;
    padding: 0px 4px;
    margin-left: 0px;
    flex-wrap: wrap;
    border-radius: 3px;
    margin-right:2px;
`;
export const ShowLogsBtn: any = styled(BtnSmall, {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== "loading",
})`
    background: ${(props: any) =>
        props.loading ? "#44bcd8" : props.theme.primary};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    color: ${(props: any) => props.theme.maxContrast};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;

    height: 26px;
    &:hover {
        background: ${(props: any) => props.theme.primaryLight};
    }
    &:disabled {
        background: ${(props: any) => props.theme.neutral};
        border: 1px solid ${(props: any) => props.theme.accentNeutral};
        cursor: not-allowed;
        color: ${(props: any) => props.theme.contrast};
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
    color: ${(props: any) => props.theme.contrast};
    background: ${(props: any) => props.theme.neutral};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    height: 26px;
    span {
        margin-left: 5px;
    }
    display: ${(props: any) =>
        props.isMobile || props.isSplit ? "flex" : "none"};
`;