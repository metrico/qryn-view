import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { themes } from "../theme/themes";
import Panel from "../components/Panel/Panel";
import { Notification } from "../qryn-ui/notifications";
import SettingsDialog from "../plugins/settingsdialog/SettingsDialog";
import { UpdateStateFromQueryParams } from "../helpers/UpdateStateFromQueryParams";
import StatusBar from "../components/StatusBar";
import QueryHistory from "../plugins/queryhistory";
import { useMediaQuery } from "react-responsive";
import MainTabs from "./MainTabs.js";
import { useMemo } from "react";

export const MainContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    flex: 1;

    background-color: ${(props) => props.theme.mainBgColor} !important;
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${(props) => props.theme.scrollbarThumb} !important;
    }
    .panels-container {
        display: flex;
        background: ${({ theme }) => theme.shBgColor};
        height: calc(100vh - 45px);
    }
`;

/**
 *
 * @param {theme, isEmbed, settingsDialogOpen}
 * @returns Mobile View
 */

export function MobileView({ theme, isEmbed, settingsDialogOpen }) {
    return (
        <ThemeProvider theme={theme}>
            {!isEmbed && <StatusBar />}

            <MainContainer>
                <MainTabs />
            </MainContainer>

            <Notification />
            <SettingsDialog open={settingsDialogOpen} />
            <QueryHistory />
        </ThemeProvider>
    );
}
/**
 *
 * @param {theme, isEmbed, isSplit, settingsDialogOpen}
 * @returns Desktop View
 */
export function DesktopView({ theme, isEmbed, isSplit, settingsDialogOpen }) {
    return (
        <ThemeProvider theme={theme}>
            <MainContainer>
                {!isEmbed && <StatusBar />}
                <div className="panels-container">
                    <Panel name="left" />
                    {isSplit && <Panel name="right" />}
                </div>
            </MainContainer>
            <SettingsDialog open={settingsDialogOpen} />
            <QueryHistory />
        </ThemeProvider>
    );
}

export default function Main() {
    UpdateStateFromQueryParams();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const isSplit = useSelector((store) => store.isSplit);
    const isEmbed = useSelector((store) => store.isEmbed);
    const theme = useSelector((store) => store.theme);
    const settingsDialogOpen = useSelector((store) => store.settingsDialogOpen);
    const themeMemo = useMemo(() => themes[theme], [theme]);

    if (!isTabletOrMobile) {
        // desktop view
        return (
            <DesktopView
                isEmbed={isEmbed}
                isSplit={isSplit}
                theme={themeMemo}
                settingsDialogOpen={settingsDialogOpen}
            />
        );
    } else {
        // mobile view
        return (
            <MobileView
                isEmbed={isEmbed}
                theme={themeMemo}
                settingsDialogOpen={settingsDialogOpen}
            />
        );
    }
}
