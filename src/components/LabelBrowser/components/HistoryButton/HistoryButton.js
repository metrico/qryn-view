import { ThemeProvider } from '@emotion/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HistoryButtonStyled, HistoryIconStyled } from '../styled';
import { themes } from '../../../../theme/themes';
export default function HistoryButton({ queryLength, handleHistoryClick, isMobile }) {
    const [buttonState, setButtonState] = useState(false);
    const theme = useSelector((store) => store.theme);
    useEffect(() => {
        if (queryLength > 0) {
            setButtonState(true);
        } else {
            setButtonState(false);
        }
    }, [queryLength]);

    return (
        <ThemeProvider theme={themes[theme]}>
        <Tooltip title={"Query History (" + queryLength + ")"}>
            <HistoryButtonStyled
                isMobile={isMobile}
                onClick={handleHistoryClick}
            >
                <HistoryIconStyled color={buttonState ? "orange" : "#ddd"} />
                {isMobile && <span>History</span>}
            </HistoryButtonStyled>
        </Tooltip>
        </ThemeProvider>
    );
}