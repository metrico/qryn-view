
import  LogView  from "./LogView";
import  StatusBar  from "./StatusBar/StatusBar";
import LabelBrowser from "./LabelBrowser/LabelBrowser"
import { UpdateStateFromQueryParams } from "./UpdateStateFromQueryParams";
import {createAlert} from '../actions/createAlert';
import { useDispatch } from 'react-redux';
import { Notification } from "../plugins/notifications";
export default function MainView() {
    
  UpdateStateFromQueryParams()
  
  const dispatch = useDispatch()
    return (
        <div className={"log-search"}>
        <button style={{zIndex: 100, position: "fixed", width: '200px', height: '200px'}} onClick={()=>{
                    console.log('test')
                    dispatch(createAlert({
                    type: 'error',
                    message: 'potato'
                }))}}>alert</button>
                
        <Notification/>
        <StatusBar/>

        <LabelBrowser/>

        <LogView />

    </div>
    )
}
