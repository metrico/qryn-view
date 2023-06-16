import { ShowLogsBtn } from "../styled";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "../../../../theme";

export default function ShowLogsButton(props: any) {
    const { isDisabled, onClick, isMobile, alterText, loading = false } = props;
    const SHOW_LOGS = "Show Results";
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <ShowLogsBtn
                disabled={isDisabled}
                type="submit"
                onClick={onClick}
                isMobile={isMobile}
                loading={loading || false}
            >
                {loading ? <>Loading...</> : <>{alterText || SHOW_LOGS}</>}
            </ShowLogsBtn>
        </ThemeProvider>
    );
}
