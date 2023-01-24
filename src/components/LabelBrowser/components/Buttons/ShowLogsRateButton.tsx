import { HistoryButtonStyled, ShowLogsBtn } from "../styled";
import { themes } from "../../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { Button } from "./Button.model";
import { Store } from "../../../../store/store.model";

const _themes = themes as any;
export default function ShowLogsRateButton({ isDisabled, onClick, isMobile, alterText }: any) {
    const SHOW_LOGS_RATE = "Show Logs Rate";
    const theme = useSelector((store: Store) => store.theme);
    return (
        <ThemeProvider theme={_themes[theme]}>
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
