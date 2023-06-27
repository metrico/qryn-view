import setIsEmptyView from "../setIsEmptyView";
export async function resetNoData(dispatch:Function) {
    dispatch(setIsEmptyView(true))
}
