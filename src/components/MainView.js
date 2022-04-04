import { Notification } from "../plugins/notifications";

import DataView from "./DataView/DataView";
import StatusBar from "./StatusBar";
import { UpdateStateFromQueryParams } from "../helpers/UpdateStateFromQueryParams";
import LabelBrowser from "./LabelBrowser";
import SettingsMenu from "../plugins/settingsmenu";

export default function MainView() {
    UpdateStateFromQueryParams();

    return (
        <div className={"log-search"}>
            <StatusBar />

            <LabelBrowser />

            <DataView />

            <Notification />
            <SettingsMenu />
        </div>
    );
}
