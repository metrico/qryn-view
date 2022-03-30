import Drawer from "@mui/material/Drawer";
import { ThemeProvider } from "@mui/material";
import {
    DrawerContainer,
    SettingsHeader,
    LimitInputsCont,
    theme,
    MenuSeparator,
} from "./styled";
import CloseButton from "./CloseButton";

export default function SettingsDrawer({
    apiSelector,
    stepInput,
    limitInput,
    open,
    onClose,
    copyUrlButton,
}) {
    return (
        <ThemeProvider theme={theme}>
            <Drawer anchor={"bottom"} open={open} variant={"persistent"}>
                <DrawerContainer>
                    <SettingsHeader>
                        <span>Cloki Settings</span>
                        <CloseButton onClick={onClose}>close</CloseButton>
                    </SettingsHeader>

                    {apiSelector}
                    <MenuSeparator />
                    <LimitInputsCont>
                        {stepInput}
                        {limitInput}
                        {copyUrlButton}
                    </LimitInputsCont>
                </DrawerContainer>
            </Drawer>
        </ThemeProvider>
    );
}
