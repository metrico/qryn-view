import { ThemeProvider } from "@emotion/react";
import { EmptyViewContainer } from "../styled";
import { useTheme } from "./QueryBuilder/hooks";

export default function EmptyViewCont(props: any) {
    const theme = useTheme();
    const { loading } = props;
    return (
        !loading && (
            <ThemeProvider theme={theme}>
                <EmptyViewContainer>
                    {
                        "Please adjust search parameters and click on ‘Show Results’ button"
                    }
                </EmptyViewContainer>
            </ThemeProvider>
        )
    );
}
