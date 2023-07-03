import { ThemeProvider } from "@emotion/react";
import { Dialog } from "@mui/material";
import { InfoContent } from "./InfoContent";
import { DialogStyles } from "@ui/plugins/settingsdialog/SettingsDialog";
import useTheme from "@ui/theme/useTheme"
export function InfoDialog({
    expr,
    idRef,
    labels,
    queryType,
    limit,
    total,
    onClose,
    open,
}: any) {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    classes: {
                        root: DialogStyles,
                    },
                }}
            >
                <InfoContent
                    expr={expr}
                    idRef={idRef}
                    labels={labels}
                    queryType={queryType}
                    limit={limit}
                    total={total}
                />
            </Dialog>
        </ThemeProvider>
    );
}
