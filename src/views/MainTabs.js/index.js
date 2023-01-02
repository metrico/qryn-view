import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import Panel from "../../components/Panel/Panel";
import styled from "@emotion/styled";
import TabsUnstyled from "@mui/base/TabsUnstyled";

export const TabsContainer = styled(TabsUnstyled)`
    height: "320px";
    background: ${(props) => props.theme.inputBg};
`;

export const Tab = styled(TabUnstyled)`
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.buttonDefault};
    border: 1px solid ${(props) => props.theme.buttonBorder};
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
        background-color: ${({ theme }) => theme.buttonHover};
    }

    &:focus {
        color: ${({ theme }) => theme.textColor};
        background: ${({ theme }) => theme.buttonDefault};
        border-radius: 3px 3px 0px 0px;

        outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
        border-bottom: 1px solid ${({ theme }) => theme.primaryDark};
    }

    &.${buttonUnstyledClasses.disabled} {
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
    color: ${(props) => props.theme.textColor};
    justify-content: space-between;
    background: ${(props) => props.theme.tabHeader};
    height: 37px;
`;
export const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    background: ${({ theme }) => theme.widgetContainer};
`;

export const TabsList = styled(TabsListUnstyled)`
    min-width: 320px;
    background: ${({ theme }) => theme.tabHeader};
    border-bottom: 4px solid ${({ theme }) => theme.historyRow};
    display: flex;
    align-items: center;
    align-content: space-between;
`;

// setup all the values for matching inside the tabs
export default function MainTabs() {
    return (
        <TabsContainer defaultValue={0}>
            <TabsList>
                <Tab>
                    <span>{"Left"}</span>
                </Tab>

                <Tab>
                    <span>{"Right"}</span>
                </Tab>
            </TabsList>
            <TabPanel value={0}>
                <Panel name="left" />
            </TabPanel>
            <TabPanel value={1}>
                <Panel name="right" />
            </TabPanel>
        </TabsContainer>
    );
}
