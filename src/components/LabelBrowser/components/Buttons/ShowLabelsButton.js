import { ShowLabelsBtn } from "../styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { themes } from "../../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";

export function panelAction(name, value) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}

export default function ShowLabelsButton(props) {
    const dispatch = useDispatch();
    const { name } = props;
    const { id, browserOpen } = props.data;
    const open = useMemo(() => browserOpen, [browserOpen]);
    const theme = useSelector((store) => store.theme);
    const labels = useSelector((store) => store.labels);
    const panelQuery = useSelector((store) => store[name]);
    

    const [isBrowserOpen, setIsBrowserOpen] = useState(open);

    useEffect(() => {
        setIsBrowserOpen(open);
    }, [open]);

    function handleBrowserOpen() {
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                query.browserOpen = isBrowserOpen ? false : true;
            }
        });
        dispatch(panelAction(name, panel));
        setIsBrowserOpen(open);
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
                )}
                {'Labels'}
            </ShowLabelsBtn>
        </ThemeProvider>
    );
}
