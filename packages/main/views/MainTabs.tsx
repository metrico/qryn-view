import styled from "@emotion/styled";
import Panel from "../sections/Panel";
import {
    QrynTab,
    qrynButtonClasses,
    qrynTabClasses,
    QrynTabPanel,
    QrynTabs,
    QrynTabsList,
} from "@ui/qrynui/Tabs";

export const TabsContainer = styled(QrynTabs)`
    background: ${({theme}: any) => theme.deep};
  
`;



export const Tabq = styled(QrynTab)`
    color: ${({theme}: any) => theme.contrast};
    background: ${({theme}: any) => theme.neutral};
    border: 1px solid ${({theme}: any) => theme.accentNeutral};
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

export const TabHeaderContainer = styled.div`
    padding: 0px 15px;
    font-size: 13px;
    display: flex;
    align-items: center;
    color: ${({theme}: any) => theme.contrast};
    justify-content: space-between;
    background: ${({theme}: any) => theme.shadow};
    height: 37px;
`;
export const TabPanelq = styled(QrynTabPanel)`
    width: 100%;
    background: ${({ theme }: any) => theme.shadow};
    height: inherit;
`;

export const TabsListq = styled(QrynTabsList)`
    min-width: 320px;
    background: ${({ theme }: any) => theme.shadow};
    border-bottom: 4px solid ${({ theme }: any) => theme.bgNeutral};
    display: flex;
    align-items: center;
    align-content: space-between;
`;

// setup all the values for matching inside the tabs
export default function MainTabs() {
    return (
        <TabsContainer defaultValue={0}>
            <TabsListq>
                <Tabq>
                    <span>{"Left"}</span>
                </Tabq>

                <Tabq>
                    <span>{"Right"}</span>
                </Tabq>
            </TabsListq>
            <TabPanelq value={0}>
                <Panel name="left" />
            </TabPanelq>
            <TabPanelq value={1}>
                <Panel name="right" />
            </TabPanelq>
        </TabsContainer>
    );
}
