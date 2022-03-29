// it should :
/**
 * have an api selector with save button
 * have a copy link button
 * have a step input
 * have a limit input
 * have a daterangepicker
 *
 */
import Drawer from "@mui/material/Drawer";
import { ThemeProvider } from "@mui/material";
import ApiSelector from "./ApiSelector/ApiSelector";
import StepInput from "./StepInput/StepInput";

import { useDispatch, useSelector } from "react-redux";
import { setSettingsMenuOpen } from "../../features/statusbar/actions/setMenuSettingsOpen";
import CloseIcon from "@mui/icons-material/Close";

import {
    DrawerContainer,
    SettingsHeader,
    StyledCloseBtn,
    LimitInputsCont,
    theme,
    MenuSeparator,
} from "./styled";
import LimitInput from "./LimitInput/LimitInput";
import CopyButton from "./CopyButton/CopyButton";

function CloseButton({ onClick }) {
    return (
        <StyledCloseBtn onClick={onClick}>
            <CloseIcon />
        </StyledCloseBtn>
    );
}
function TemporaryDrawer({
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

export default function SettingsDrawer() {
    const dispatch = useDispatch();
    const settingsOpen = useSelector((store) => store.settingsMenuOpen);
    function onClose() {
        dispatch(setSettingsMenuOpen(false));
    }

    return (
        <div>
            <TemporaryDrawer
                apiSelector={<ApiSelector />}
                stepInput={<StepInput />}
                limitInput={<LimitInput />}
                copyUrlButton={<CopyButton />}
                open={settingsOpen}
                onClose={onClose}
            />
        </div>
    );
}
