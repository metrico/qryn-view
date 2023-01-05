import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { themes } from "../../../theme/themes";
import { EmptyViewContainer } from "../styled";

export default function EmptyViewCont(props: any): any {
    const theme = useSelector((store: any) => store.theme);
    const { loading }: any = props;

    return (
        !loading && (
            <ThemeProvider theme={(themes as any)[theme]}>
                <EmptyViewContainer>
                    {
                        "Please adjust search parameters and click on ‘Show Results’ button"
                    }
                </EmptyViewContainer>
            </ThemeProvider>
        )
    );
}
