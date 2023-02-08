import setIsEmptyView from "../setIsEmptyView";
import setLogs from "../setLogs";
import setMatrixData from "../setMatrixData";
import { setVectorData } from "../setVectorData";
// this should reset query data
export async function resetParams(dispatch: Function, panel: string) {
    dispatch(setIsEmptyView(false));
    dispatch(setLogs([]));
    dispatch(setMatrixData([]));
    dispatch(setVectorData([]));
}
