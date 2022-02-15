
import  LogView  from "./LogView";
import  StatusBar  from "./StatusBar/StatusBar";
import LabelBrowser from "./LabelBrowser/LabelBrowser"
import { updateStateFromQueryParams } from "./updateStateFromQueryParams";
export default function MainView() {
updateStateFromQueryParams()
    return (
        <div className="log-search">

        <StatusBar/>

        <LabelBrowser/>

        <LogView />
        
    </div>
    )
}
