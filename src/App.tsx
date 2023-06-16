import { useTheme } from "./theme";
import { cx, css } from "@emotion/css";
import MainStatusBar from "./views/Main/MainStatusBar";
import {  Outlet } from "react-router-dom";
import { Notification } from "./qryn-ui/notifications";
import { useSelector } from "react-redux";
import SettingsDialog from "./plugins/settingsdialog/SettingsDialog";

export const MainAppStyles = (theme: any) => css`
    background: ${theme.mainBgColor};
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
