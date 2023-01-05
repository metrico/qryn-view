import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSplitView } from "./setSplitView";
import { SplitButton } from "./styled";

export default function SplitViewButton() {
    const isSplit = useSelector((store:any) => store.isSplit);
    const dispatch = useDispatch();
    const splitView = () => {
        if (!isSplit) {
            dispatch(setSplitView(true));
        } else {
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
