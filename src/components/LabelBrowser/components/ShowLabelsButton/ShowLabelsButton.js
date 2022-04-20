import { ShowLabelsBtn } from "../styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";


export default function ShowLabelsButton({ onValueDisplay, labelsBrowserOpen, isMobile }) {
    const LOG_BROWSER = "Labels";
    const labels = useSelector( store => store.labels)
    return (

        <ShowLabelsBtn
        title={ labels?.length > 0 ? 'Show / Hide Labels' : 'Labels Not Available' }
            onClick={onValueDisplay}
            browserActive={labelsBrowserOpen}
            isMobile={isMobile}
            disabled={labels?.length < 1}

         
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