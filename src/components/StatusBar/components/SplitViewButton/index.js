import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSplitView } from "./setSplitView";
import { SplitButton } from "./styled";

export default function SplitViewButton() {
    const isSplit = useSelector((store) => store.isSplit);
    const dispatch = useDispatch();
    const {hash} = useLocation()
    const splitView = () => {
        if (!isSplit) {
            dispatch(setSplitView(true));
        } else {
            // let urlParams = new URLSearchParams(hash.replace("#",""))
            // const actquery = []
            // const rightPanel = encodeURIComponent(JSON.stringify(actquery))
            // urlParams.set('right',rightPanel)
            // window.location.hash = urlParams
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
