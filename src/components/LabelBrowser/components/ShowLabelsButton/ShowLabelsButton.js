import { ShowLabelsBtn } from "../styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { themes } from '../../../../theme/themes';
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';


export default function ShowLabelsButton({ onValueDisplay, labelsBrowserOpen, isMobile }) {
    const LOG_BROWSER = "Labels";
    const theme = useSelector((store) => store.theme);
    
    return (
        <ThemeProvider theme={themes[theme]}>
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
        </ThemeProvider>
    );
}