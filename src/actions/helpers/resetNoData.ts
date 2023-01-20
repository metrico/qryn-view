import setIsEmptyView from "../setIsEmptyView";
import setLogs from "../setLogs";

export async function resetNoData(dispatch:Function) {
    dispatch(setLogs([]));
    dispatch(setIsEmptyView(true))
}
