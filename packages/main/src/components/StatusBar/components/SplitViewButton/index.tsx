import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLeftPanel } from "@ui/store/actions/setLeftPanel";
import { setRightPanel } from "@ui/store/actions/setRightPanel";
import { setSplitView } from "./setSplitView";
import { SplitButton } from "./styled";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export type props = {
    panel?: string;
};

export function closePanel(
    [leftOpen, rightOpen]: [leftOpen: boolean, rightOpen: boolean],
    panel: "left" | "right",
    prev: any,
    dispatch: any
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
    dispatch: any
) {
    let leftCopy = [...left];
    let rightCopy = [...right];

    const open = (data: any) => data?.map((m: any) => ({ ...m, open: true }));
    const openLeft = open(leftCopy);
    const openRight = open(rightCopy);
    dispatch(setLeftPanel(openLeft));
    dispatch(setRightPanel(openRight));
}

type SplitButtonProps = {
    type: "remove" | "split";
    side?: "left" | "right";
    isSplit?: boolean;
    onDeleteQuery?: () => void | undefined;
};

export default function SplitViewButton({
    type,
    side = "left",
    onDeleteQuery,
    isSplit,
}: SplitButtonProps) {
    const panel = useSelector((store: any) => store[side]);
    const left = useSelector((store: any) => store.left);
    const right = useSelector((store: any) => store.right);
    const usedSide = useSelector((store: any) => store[side]);
    const dispatch: any = useDispatch();
    const isSplitView = useSelector((store: any) => store.isSplit);

    const splitView = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isSplit && !isSplitView) {
            openPanel([left, right], dispatch);
            dispatch(setSplitView(true));
        } else {
            const leftOpen = left[0].open;
            const rightOpen = right[0].open;
            closePanel([leftOpen, rightOpen], side, panel, dispatch);
            dispatch(setSplitView(false));
        }
    };

    const handleDeleteAction = (e: any) => {
        if (usedSide?.length > 1 && onDeleteQuery !== undefined) {
            onDeleteQuery();
        } else if (isSplitView) {
            splitView(e);
        }
    };

    const setTitle = isSplit ? "Close Split View" : "Split View";
    return (
        <>
            {type === "split" ? (
                <Tooltip title={setTitle}>
                    <SplitButton onClick={splitView}>
                        {isSplit ? "Close" : "Split"}
                    </SplitButton>
                </Tooltip>
            ) : (
                <button className="add-btn trash" onClick={handleDeleteAction}>
                    <DeleteOutlineIcon
                        style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            padding: "3px",
                        }}
                    />
                </button>
            )}
        </>
    );
}
