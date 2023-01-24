import { ThemeProvider } from "@emotion/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HistoryButtonStyled, HistoryIconStyled } from "../styled";
import { themes } from "../../../../theme/themes";
export default function HistoryButton({
    queryLength,
    handleHistoryClick,
    isMobile,
}: any) {
    const [buttonState, setButtonState] = useState(false);
    const theme = useSelector((store: any) => store.theme);
    useEffect(() => {
        if (queryLength > 0) {
            setButtonState(true);
        } else {
            setButtonState(false);
        }
    }, [queryLength]);
    const _themes: any = themes;
    return (
        <ThemeProvider theme={_themes[theme]}>
            <Tooltip title={"Query History (" + queryLength + ")"}>
                <HistoryButtonStyled
                    isMobile={isMobile}
                    onClick={handleHistoryClick}
                >
                    <HistoryIconStyled
                        color={
                            buttonState
                                ? _themes[theme].textColor
                                : _themes[theme].textOff
                        }
                    />
                    {isMobile && <span>History</span>}
                </HistoryButtonStyled>
            </Tooltip>
        </ThemeProvider>
    );
}
