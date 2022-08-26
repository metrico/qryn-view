import { ShowLabelsBtn } from "../styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { themes } from "../../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";

export default function ShowLabelsButton(props) {
    const { id } = props.data;
    const LOG_BROWSER = "Labels";
    const theme = useSelector((store) => store.theme);
    const labels = useSelector((store) => store.labels);
    const left = useSelector((store) => store.left);
    const right = useSelector((store) => store.right);
    const dispatch = useDispatch();
    const [isBrowserOpen, setIsBrowserOpen] = useState(props.data.browserOpen);

    function handleBrowserOpen() {
        if (props.name === "left") {
            const leftC = [...left];
            leftC.forEach((query) => {
                if (query.id === id) {
                    query.browserOpen = isBrowserOpen ? false : true;
                }
            });
            dispatch(setLeftPanel(leftC));
        }

        if (props.name === "right") {
            const rightC = [...right];
            rightC.forEach((query) => {
                if (query.id === id) {
                    query.browserOpen = isBrowserOpen ? false : true;
                }
            });
            dispatch(setRightPanel(rightC));
        }
        setIsBrowserOpen((prev) => {
            if (prev === true) {
                return false;
            } else {
                return true;
            }
        });
    }
    return (
        <ThemeProvider theme={themes[theme]}>
            <ShowLabelsBtn
                title={
                    labels?.length > 0
                        ? "Show / Hide Labels"
                        : "Labels Not Available"
                }
                onClick={handleBrowserOpen}
                browserActive={isBrowserOpen}
                isMobile={props.isMobile}
            >
                {isBrowserOpen ? (
                    <KeyboardArrowDownIcon
                        style={{ height: "18px", width: "18px" }}
                    />
                ) : (
                    <KeyboardArrowRightIcon
                        style={{ height: "18px", width: "18px" }}
                    />
                )}{" "}
                {LOG_BROWSER}
            </ShowLabelsBtn>
        </ThemeProvider>
    );
}
