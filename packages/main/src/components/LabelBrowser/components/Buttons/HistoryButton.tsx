import { ThemeProvider } from "@emotion/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { HistoryButtonStyled, HistoryIconStyled } from "../styled";
import  useTheme  from "@ui/theme/useTheme";
export default function HistoryButton({
    queryLength,
    handleHistoryClick,
    isMobile,
}: any) {
    const [buttonState, setButtonState] = useState(false);
    const theme = useTheme();
    useEffect(() => {
        if (queryLength > 0) {
            setButtonState(true);
        } else {
            setButtonState(false);
        }
    }, [queryLength]);

    return (
        <ThemeProvider theme={theme}>
            <Tooltip title={"Query History (" + queryLength + ")"}>
                <HistoryButtonStyled
                    isMobile={isMobile}
                    onClick={handleHistoryClick}
                >
                    <HistoryIconStyled
                        color={buttonState ? theme.contrast : theme.lightContrast}
                    />
                    {isMobile && <span>History</span>}
                </HistoryButtonStyled>
            </Tooltip>
        </ThemeProvider>
    );
}
