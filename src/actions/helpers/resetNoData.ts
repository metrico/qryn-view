import setIsEmptyView from "../setIsEmptyView";
import { setLeftDataView } from "../setLeftDataView";
import setLogs from "../setLogs";
import setMatrixData from "../setMatrixData";
import { setRightDataView } from "../setRightDataView";
import { setVectorData } from "../setVectorData";

export async function resetNoData(dispatch:Function) {
    dispatch(setLogs([]));
    dispatch(setMatrixData([]));
    dispatch(setRightDataView({}))
    dispatch(setLeftDataView({type:'',data:[]}))
    dispatch(setVectorData({type:'',data:[]}));
    dispatch(setIsEmptyView(true))
}
