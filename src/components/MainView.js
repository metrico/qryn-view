import { Notification } from "../plugins/notifications";

import DataView from "./DataView/DataView";
import StatusBar from "./StatusBar";
import { UpdateStateFromQueryParams } from "../helpers/UpdateStateFromQueryParams";
import LabelBrowser from "./LabelBrowser";
import SettingsDialog from "../plugins/settingsdialog/SettingsDialog";
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { ThemeProvider } from '@emotion/react';
import { themes } from "../theme/themes";
export const MainViewStyled = styled.div`
    position:absolute;
    top:0;
    padding-top: 5px;
    left:0;
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    background-color: ${props => props.theme.mainBgColor} !important;
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${props => props.theme.scrollbarThumb} !important;
    }
`;
export default function MainView() {
    UpdateStateFromQueryParams();
    const settingsDialogOpen = useSelector( store => store.settingsDialogOpen);
    const theme = useSelector((store) => store.theme);
    return (
        
        <ThemeProvider theme={themes[theme]}>
            <MainViewStyled>

                <StatusBar />

                <LabelBrowser />

                <DataView />

                <Notification />


                <SettingsDialog
                open={settingsDialogOpen}
                />

            </MainViewStyled>
        </ThemeProvider>
    );
}
