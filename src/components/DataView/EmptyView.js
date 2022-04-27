import { ThemeProvider } from "@emotion/react";
import { useStore } from "react-redux";
import { themes } from "../../theme/themes";
import { EmptyViewContainer } from "./styled";

export default function EmptyView() {
    const theme = useStore().getState().theme;
    return (
        <ThemeProvider theme={themes[theme]}>
            <EmptyViewContainer>
                {
                    "Please adjust search parameters and click on ‘Show Logs’ button"
                }
            </EmptyViewContainer>
        </ThemeProvider>
    );
}
