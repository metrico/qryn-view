import { ShowLabelsBtn } from "../styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { themes } from "../../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";

export default function ShowLabelsButton({
    onValueDisplay,
    labelsBrowserOpen,
    isMobile,
}) {
    const LOG_BROWSER = "Labels";
    const theme = useSelector((store) => store.theme);
    const labels = useSelector((store) => store.labels);
    return (
        <ThemeProvider theme={themes[theme]}>
            <ShowLabelsBtn
                title={
                    labels?.length > 0
                        ? "Show / Hide Labels"
                        : "Labels Not Available"
                }
                onClick={onValueDisplay}
                browserActive={labelsBrowserOpen}
                isMobile={isMobile}
            >
                {labelsBrowserOpen ? (
                    <KeyboardArrowDownIcon style={{height:'18px',width:'18px'}} />
                ) : (
                    <KeyboardArrowRightIcon style={{height:'18px',width:'18px'}} />
                )}{" "}
                {LOG_BROWSER}
            </ShowLabelsBtn>
        </ThemeProvider>
    );
}
