import store  from "@ui/store/store";
import { setLeftDataView } from "../setLeftDataView";
import { setRightDataView } from "../setRightDataView";

const setDv = (name: string, dispatch: Function, data: any) => {
    if (name === "left") {
        dispatch(setLeftDataView(data));
    } else {
        dispatch(setRightDataView(data));
    }
};
// this should reset query data
export function resetParams(dispatch: Function, panel: string, id: string) {
    // let
    let actDv = store.getState()[`${panel}DataView`];
    let filtered = [...actDv];

    filtered.forEach((dv: any) => {
        if (dv.id === id) {
            dv = [];
        }
    });
    setDv(panel, dispatch, filtered);
}
