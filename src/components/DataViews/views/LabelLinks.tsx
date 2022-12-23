import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../theme/themes";
const PageContainer = styled.div`
    background: ${({ theme }: any) => theme.viewBg};
    p {
        color: ${({ theme }: any) => theme.textColor};
    }
`;

export default function LabelLinks() {
    const themeState = useSelector(({ theme }: any) => theme);

    const theme = useMemo(() => {
        return (themes as any)[themeState];
    }, [themeState]);
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <p>Datasets Content</p>
            </PageContainer>
        </ThemeProvider>
    );
}
