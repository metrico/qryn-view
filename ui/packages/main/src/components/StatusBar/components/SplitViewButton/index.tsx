import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLeftPanel } from "@ui/store/actions/setLeftPanel";
import { setRightPanel } from "@ui/store/actions/setRightPanel";
import { setSplitView } from "./setSplitView";
import { SplitButton } from "./styled";

export type props = {
    panel?: string;
};

export function closePanel(
    [leftOpen, rightOpen]: [leftOpen: boolean, rightOpen: boolean],
    panel: "left" | "right",
    prev: any,
    dispatch: Function
) {
    let data = [...prev];
    let next = data?.map((m: any) => ({ ...m, open: false }));

    if (panel === "left" && rightOpen) {
        dispatch(setLeftPanel([...next]));
    }
    if (panel === "right" && leftOpen) {
        dispatch(setRightPanel([...next]));
    }
}

export function openPanel(
    [left, right]: [left: any, right: any],
    dispatch: Function
) {
    let leftCopy = [...left];
    let rightCopy = [...right];

    const open = (data: any) => data?.map((m: any) => ({ ...m, open: true }));
    const openLeft = open(leftCopy);
    const openRight = open(rightCopy);
    dispatch(setLeftPanel(openLeft));
    dispatch(setRightPanel(openRight));
}

export default function SplitViewButton(props: any) {
    // close button will go into queryitemtoolbar
    const { side, isSplit } = props;
    // see which one is open
    // set open to false
    const panel = useSelector((store: any) => store[side]);
    //const { left, right } = useSelector((store: any) => store);
    const left = useSelector((store: any) => store.left);
    const right = useSelector((store: any) => store.right);
    const dispatch: any = useDispatch();

    const splitView = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isSplit) {
            openPanel([left, right], dispatch);
            dispatch(setSplitView(true));
        } else {
            const leftOpen = left[0].open;
            const rightOpen = right[0].open;
            closePanel([leftOpen, rightOpen], side, panel, dispatch);
            dispatch(setSplitView(false));
        }
    };

    const setTitle = isSplit ? "Close Split View" : "Split View";
    return (
        <>
            <Tooltip title={setTitle}>
                <SplitButton onClick={splitView}>
                    {isSplit ? "Close" : "Split"}
                </SplitButton>
            </Tooltip>
        </>
    );
}
