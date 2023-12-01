import { ShowSettingsBtn } from "../styled";
import { ThemeProvider } from "@emotion/react";
import  useTheme  from "@ui/theme/useTheme";

export default function ShowQuerySettingsButton({
    disabled,
    onClick,
    isMobile,
}: any) {
    const SHOW_SETTINGS = "Options";
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
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
