import { Notification } from "../plugins/notifications";

import DataView from "./DataView/DataView";
import StatusBar from "./StatusBar";
import { UpdateStateFromQueryParams } from "../helpers/UpdateStateFromQueryParams";
import LabelBrowser from "./LabelBrowser";
import SettingsDialog from "../plugins/settingsdialog/SettingsDialog";
import { useSelector } from 'react-redux';

export default function MainView() {
    UpdateStateFromQueryParams();
    const settingsDialogOpen = useSelector( store => store.settingsDialogOpen)
    return (
        <div className={"log-search"}>

            <StatusBar />

            <LabelBrowser />

            <DataView />

            <Notification />


            <SettingsDialog
             open={settingsDialogOpen}
             />

        </div>
    );
}
