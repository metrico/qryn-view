import { ShowLogsBtn } from "../styled";
import { themes } from '../../../../theme/themes';
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';

export default function ShowLogsButton({ disabled, onClick, isMobile }) {
    const SHOW_LOGS = "Show Logs";
    const theme = useSelector((store) => store.theme);
    return (
        <ThemeProvider theme={themes[theme]}>
        <ShowLogsBtn
            disabled={disabled}
            type="submit"
            onClick={onClick}
            isMobile={isMobile}
        >
            {SHOW_LOGS}
        </ShowLogsBtn>
        </ThemeProvider>
    );
}
