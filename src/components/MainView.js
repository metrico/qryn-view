import { Notification } from "../plugins/notifications";
import DataView from "./DataView/DataView";
import StatusBar from "./StatusBar";
import { UpdateStateFromQueryParams } from "../helpers/UpdateStateFromQueryParams";
import LabelBrowser from "./LabelBrowser";
import SettingsDialog from "../plugins/settingsdialog/SettingsDialog";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../theme/themes";
import { MainViewStyled } from "./styles";

export default function MainView() {

    UpdateStateFromQueryParams();
    const settingsDialogOpen = useSelector((store) => store.settingsDialogOpen);
    const theme = useSelector((store) => store.theme);
    return (
        <ThemeProvider theme={themes[theme]}>
            <MainViewStyled>
                <StatusBar />
                <LabelBrowser />
                <DataView />
                <Notification />
                <SettingsDialog open={settingsDialogOpen} />
            </MainViewStyled>
        </ThemeProvider>
    );
}
