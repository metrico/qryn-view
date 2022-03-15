
import  LogView  from "./LogView";
import  StatusBar  from "./StatusBar/StatusBar";
import LabelBrowser from "./LabelBrowser/LabelBrowser"
import { UpdateStateFromQueryParams } from "./UpdateStateFromQueryParams";
import { Notification } from "../plugins/notifications";
export default function MainView() {
    
  UpdateStateFromQueryParams()
  
    return (
        <div className={"log-search"}>
                
        <Notification/>
        <StatusBar/>

        <LabelBrowser/>

        <LogView />

    </div>
    )
}
