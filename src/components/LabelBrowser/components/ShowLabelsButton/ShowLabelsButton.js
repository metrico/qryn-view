import { ShowLabelsBtn } from "../styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";



export default function ShowLabelsButton({ onValueDisplay, labelsBrowserOpen, isMobile }) {
    const LOG_BROWSER = "Labels";

    return (
        <ShowLabelsBtn
            onClick={onValueDisplay}
            browserActive={labelsBrowserOpen}
            isMobile={isMobile}
        >
            {labelsBrowserOpen ? (
                <KeyboardArrowDownIcon fontSize={"small"} />
            ) : (
                <KeyboardArrowRightIcon fontSize={"small"} />
            )}{" "}
            {LOG_BROWSER}
        </ShowLabelsBtn>
    );
}