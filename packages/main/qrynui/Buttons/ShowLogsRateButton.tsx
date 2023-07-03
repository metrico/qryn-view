import { HistoryButtonStyled } from "./styled";
import { ThemeProvider } from "@emotion/react";
import useTheme from "@ui/theme/useTheme";

export default function ShowLogsRateButton({
    isDisabled,
    onClick,
    isMobile,
    alterText,
}: any) {
    const SHOW_LOGS_RATE = "Show Logs Rate";
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <HistoryButtonStyled
                disabled={isDisabled}
                type="submit"
                onClick={onClick}
                isMobile={isMobile}
            >
                {alterText || SHOW_LOGS_RATE}
            </HistoryButtonStyled>
        </ThemeProvider>
    );
}
