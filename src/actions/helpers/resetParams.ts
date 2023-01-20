import setIsEmptyView from "../setIsEmptyView";
import setLogs from "../setLogs";
export async function resetParams(dispatch: Function, panel: string) {
    dispatch(setIsEmptyView(false));
    dispatch(setLogs([]));
}
