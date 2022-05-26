import setIsEmptyView from "../setIsEmptyView";
import setLoading from "../setLoading";
import setLogs from "../setLogs";
import setMatrixData from "../setMatrixData";
import { setVectorData } from "../setVectorData";


export async function resetParams(dispatch: Function) {
    dispatch(setLoading(true));
    dispatch(setIsEmptyView(false));
    dispatch(setLogs([]));
    dispatch(setMatrixData([]));
    dispatch(setVectorData([]));
}
