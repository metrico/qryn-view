
import  LogView  from "./LogView";
import  StatusBar  from "./StatusBar/StatusBar";
import LabelBrowser from "./LabelBrowser/LabelBrowser"

export default function MainView() {

    return (
        <div className="log-search">

        <StatusBar/>

        <LabelBrowser/>

        <LogView />
        
    </div>
    )
}
