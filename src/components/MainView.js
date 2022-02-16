
import  LogView  from "./LogView";
import  StatusBar  from "./StatusBar/StatusBar";
import LabelBrowser from "./LabelBrowser/LabelBrowser"
import { UpdateStateFromQueryParams } from "./UpdateStateFromQueryParams";
export default function MainView() {
  UpdateStateFromQueryParams()
    return (
        <div className={"log-search"}>

        <StatusBar/>

        <LabelBrowser/>

        <LogView />

    </div>
    )
}
