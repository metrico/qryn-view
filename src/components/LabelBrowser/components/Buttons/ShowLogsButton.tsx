import { ShowLogsBtn } from "../styled";
import { themes } from "../../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { Store } from "../../../../store/store.model";
const _themes = themes as any;
export default function ShowLogsButton(props:any) {
    const {
        isDisabled,
        onClick,
        isMobile,
        alterText,
        loading = false,
    } = props
    const SHOW_LOGS = "Show Results";
    const theme = useSelector((store: Store) => store.theme);
    return (
        <ThemeProvider theme={_themes[theme]}>
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
