import { ShowLabelsBtn } from "../styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { themes } from "../../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { setLeftPanel } from "../../../../actions/setLeftPanel";
import { setRightPanel } from "../../../../actions/setRightPanel";
import { css, cx } from "@emotion/css";
import { Tooltip } from "@mui/material";

export function panelAction(name: string, value: any) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}

export const ArrowIcon = css`
    height: 18px !important;
    width: 18px !important;
`;

export default function ShowLabelsButton(props: any) {
    const dispatch = useDispatch();
    const { name } = props;
    const { id, browserOpen } = props.data;
    const open = useMemo(() => browserOpen, [browserOpen]);
    const theme = useSelector((store: any) => store.theme);
    const labels = useSelector((store: any) => store.labels);
    const panelQuery = useSelector((store: any) => store[name]);

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

    const labelsTitle = (labels: any) => {
        if (props.labels?.length > 0) {
            return "Show / Hide Labels";
        }
        return "Labels Not Available";
    };
    const renderArrow = (open: any) => {
        if (open) {
            return <KeyboardArrowDownIcon className={cx(ArrowIcon)} />;
        }
        return <KeyboardArrowRightIcon className={cx(ArrowIcon)} />;
    };

    const _themes: any = themes;    

    return (
        <ThemeProvider theme={_themes[theme]}>
            <Tooltip 
                title={labelsTitle(labels)}>
                <ShowLabelsBtn
                    onClick={handleBrowserOpen}
                    browserActive={isBrowserOpen}
                    isMobile={props.isMobile}
                >
                    {renderArrow(isBrowserOpen)}
                    {"Labels"}
                </ShowLabelsBtn>
            </Tooltip>
        </ThemeProvider>
    );
}
