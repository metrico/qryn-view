import { ThemeProvider } from "@emotion/react";

import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { EmptyViewContainer } from "./styled";

export default function EmptyView() {
    const theme = useSelector((store) => store.theme);
    const loading = useSelector((store) => store.loading);


    return (
        !loading && (
            <ThemeProvider theme={themes[theme]}>
                <EmptyViewContainer>
                    {
                        "Please adjust search parameters and click on ‘Show Logs’ button"
                    }
                </EmptyViewContainer>
            </ThemeProvider>
        )
    )

}
