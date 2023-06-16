import { ThemeProvider } from "@emotion/react";
import QueryHistory from "../../plugins/queryhistory";
import MainTabs from "../MainTabs";
import { MainContainer } from "./styled";

/**
 *
 * @param {theme, isEmbed, settingsDialogOpen}
 * @returns Mobile View
 */

export interface Props {
    theme: any;
    isEmbed: boolean;
    settingsDialogOpen: boolean;
}

export function MobileView({ theme }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <MainContainer>
                <MainTabs />
            </MainContainer>

            <QueryHistory />
        </ThemeProvider>
    );
}
