

import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { HistoryButtonStyled, HistoryIconStyled } from '../styled';

export default function HistoryButton({ queryLength, handleHistoryClick, isMobile }) {
    const [buttonState, setButtonState] = useState(false);

    useEffect(() => {
        if (queryLength > 0) {
            setButtonState(true);
        } else {
            setButtonState(false);
        }
    }, [queryLength]);

    return (
        <Tooltip title={"Query History (" + queryLength + ")"}>
            <HistoryButtonStyled
                isMobile={isMobile}
                onClick={handleHistoryClick}
            >
                <HistoryIconStyled color={buttonState ? "orange" : "#ddd"} />
                {isMobile && <span>History</span>}
            </HistoryButtonStyled>
        </Tooltip>
    );
}