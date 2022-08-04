import setIsEmptyView from "../setIsEmptyView";
import setLogs from "../setLogs";
import setMatrixData from "../setMatrixData";
import { setVectorData } from "../setVectorData";

export async function resetNoData(dispatch:Function) {
    dispatch(setLogs([]));
    dispatch(setMatrixData([]));
    dispatch(setVectorData({type:'',data:[]}));
    dispatch(setIsEmptyView(true))
}
