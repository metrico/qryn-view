
import  LogView  from "./LogView";

import LabelBrowser from "./LabelBrowser/LabelBrowser"
import { UpdateStateFromQueryParams } from "./UpdateStateFromQueryParams";
import { Notification } from "../plugins/notifications";
import StatusBar from "../features/statusbar";
import SettingsDrawer from "../plugins/settingsdrawer/SettingsDrawer";

export default function MainView() {
    
  UpdateStateFromQueryParams()
  
    return (
        <div className={"log-search"}>
                
        <StatusBar/>

        <LabelBrowser/>

        <LogView />

        <Notification/>
       <SettingsDrawer/>
    </div>
    )
}
