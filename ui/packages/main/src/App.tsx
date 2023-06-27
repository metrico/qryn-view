import  useTheme  from "@ui/theme/useTheme";
import { cx, css } from "@emotion/css";
import MainStatusBar from "@ui/views/Main/MainStatusBar";
import {  Outlet } from "react-router-dom";
import { Notification } from "@ui/qrynui/notifications";
import { useSelector } from "react-redux";
import SettingsDialog from "@ui/plugins/settingsdialog/SettingsDialog";
import { QrynTheme } from "@ui/theme/types";

export const MainAppStyles = (theme:QrynTheme) => css`
    background: ${theme.background};
    display:flex;
    flex-direction:column;
    height:100vh;
    flex:1;
`;

export default function App() {
    const theme = useTheme();
    const settingDialogOpen = useSelector((store:any)=>store.settingsDialogOpen)
    return (
        <div className={cx(MainAppStyles(theme))}>
            <MainStatusBar/>

            <Outlet />
            <Notification/>
            <SettingsDialog open={settingDialogOpen} />
        </div>
    );
}
