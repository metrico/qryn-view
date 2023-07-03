import { setLeftPanel, setRightPanel } from "./actions";

export const panelDispatch = (name: string, data: any) => {
    if (name === "left") return setLeftPanel(data);
    return setRightPanel(data);
};

