import styled from "@emotion/styled";
import {
    QrynTab,
    qrynButtonClasses,
    qrynTabClasses,
    QrynTabPanel,
    QrynTabs,
    QrynTabsList,
} from "@ui/qrynui/Tabs";

export const ViewStyled: any = styled.div`
    margin: 4px;
    padding: 5px;
    margin-top: 0px;
    border: 1px solid ${({ theme }: any) => theme.accentNeutral};
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    flex: ${({ size }: any) => (size === "min" ? "0 0 auto" : "1 1 auto")};
    min-height: 0;
    height: ${({ size }: any) => (size === "min" ? "20px" : "auto")};
    overflow: hidden;
    .view-content {
        display: ${({ size }: any) => (size === "min" ? "none" : "flex")};
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
        overflow: auto;
    }
`;

export const TabPanelq = styled(QrynTabPanel)`
    width: 100%;
    background: ${({ theme }: any) => theme.shadow};
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;
export const TabsContainer = styled(QrynTabs)`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
`;
export const TabsListq: any = styled(QrynTabsList)`
    min-width: 320px;
    background: ${({ theme }: any) => theme.shadow};
    border-bottom: 4px solid ${({ theme }: any) => theme.bgNeutral};
    display: ${({ panelsize }: any) => (panelsize === "min" ? "none" : "flex")};
    align-items: center;
    align-content: space-between;
`;

export const Tabq = styled(QrynTab)`
    color: ${({ theme }: any) => theme.contrast};
    background: ${({ theme }: any) => theme.neutral};
    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    cursor: pointer;
    font-size: 13px;
    background-color: transparent;
    padding: 6px 10px;
    border: none;
    border-radius: 3px 3px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid transparent;
    transition: 0.2s all;

    &:hover {
        background-color: ${({ theme }: any) => theme.lightNeutral};
    }

    &:focus {
        color: ${({ theme }: any) => theme.contrast};
        background: ${({ theme }: any) => theme.neutral};
        border-radius: 3px 3px 0px 0px;

        outline-offset: 2px;
    }

    &.${qrynTabClasses.selected} {
        border-bottom: 1px solid ${({ theme }: any) => theme.primary};
    }

    &.${qrynButtonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
    @media screen and (max-width: 360px) {
        span {
            display: none;
        }
        padding: 5px 20px;
    }
`;
