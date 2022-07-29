import setIsEmptyView from "../setIsEmptyView";
import { setLeftDataView } from "../setLeftDataView";
import setLoading from "../setLoading";
import setLogs from "../setLogs";
import setMatrixData from "../setMatrixData";
import { setRightDataView } from "../setRightDataView";
import { setVectorData } from "../setVectorData";


export async function resetParams(dispatch: Function,panel:string) {
    dispatch(setLoading(true));
    dispatch(setIsEmptyView(false));
    dispatch(setLogs([]));

    dispatch(setMatrixData([]));
    dispatch(setVectorData([]));
    if (panel === 'left') {
           
    dispatch(setLeftDataView({type:'',data:[]}))
      dispatch(setIsEmptyView(true))
    }

    if (panel === 'right') {
         dispatch(setRightDataView({type:'',data:[]}))
       dispatch(setIsEmptyView(true))
    }
}
