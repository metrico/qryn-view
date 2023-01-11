import { ThemeProvider } from "@emotion/react";
import StatusBar from "../../components/StatusBar";
import QueryHistory from "../../plugins/queryhistory";
import SettingsDialog from "../../plugins/settingsdialog/SettingsDialog";
import { Notification } from "../../qryn-ui/notifications";
import MainTabs from "../MainTabs";
import { MainContainer } from "./styled";

/**
 *
 * @param {theme, isEmbed, settingsDialogOpen}
 * @returns Mobile View
 */

export interface Props {
    theme: any;
    isEmbed: boolean;
    settingsDialogOpen: boolean;
}

export function MobileView({ theme, isEmbed, settingsDialogOpen }: Props) {
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
