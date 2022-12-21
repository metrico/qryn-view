import { ShowSettingsBtn } from "../styled";
import { themes } from "../../../../theme/themes";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";

export default function ShowQuerySettingsButton({ disabled, onClick, isMobile }: any) {
    const SHOW_SETTINGS = "Options";
    const theme = useSelector((store: any) => store.theme);
    const _themes: any = themes;

    return (
        <ThemeProvider theme={_themes[theme]}>
            <ShowSettingsBtn
                disabled={disabled}
                type="submit"
                onClick={onClick}
                isMobile={isMobile}
            >
                {SHOW_SETTINGS}
            </ShowSettingsBtn>
        </ThemeProvider>
    );
}
