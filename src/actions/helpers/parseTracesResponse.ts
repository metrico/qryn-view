import store from "../../store/store";
import { setLeftDataView } from "../setLeftDataView";
import { setRightDataView } from "../setRightDataView";
import { QueryResult, TracesResult } from "../types";

function setDataView(panel:string) {
    if( panel === 'left') {
        return {
            state:'leftDataView',
            action: setLeftDataView
        }
    } else {
        return {
            state: 'rightDataView',
            action: setRightDataView
        }
    }
}

export function parseTracesResponse(props:TracesResult) {
    const {result, debugMode, dispatch, panel, id, type} = props

    console.log(props)
    try {
        const panelResult = {
            id,
            type: 'traces',
            data:result,
            total: result?.resourceSpans?.length
        }
    
        const dataView = setDataView(panel);
        const {action,state} = dataView;
        const prevDV = store.getState()?.[state];
        if(prevDV.some((dv:any) => dv.id === panelResult.id)) {
            let newPanel  = [];
            dispatch(action([]));
            const filtered = prevDV.filter(
                (dv:any) => dv.id !== panelResult.id
            ) 
            newPanel = [...filtered, {...panelResult}];
            dispatch(action(newPanel));
    
        }else {
            let newPanel = [...prevDV, panelResult];
            dispatch(action(newPanel))
        }
    } catch(e) {
        if(debugMode) {
            console.log(
               " 🚧 getData / getting an error from rendering Traces type streams",
               e
            )
          
        }
        console.log(e)
    }


    
}