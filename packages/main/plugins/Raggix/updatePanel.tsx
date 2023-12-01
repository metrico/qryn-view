import store  from "@ui/store/store";

export const setLeftPanel = (left: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_LEFT_PANEL",
        left,
    });
}; 

export const setRightPanel = (right: any) => (dispatch: Function) => {
    dispatch({
        type: "SET_RIGHT_PANEL", 
        right,
    });
}; 

const updatePanel = ( panel: "left" | "right", data: any) => {
    const dispatch: any = store.dispatch;

    if (panel === "left") {
        dispatch(setLeftPanel(data));
    }

    if (panel === "right") {
        dispatch(setRightPanel(data));
    }
};
export default updatePanel;
