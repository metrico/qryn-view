import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import useTheme from "@ui/theme/useTheme"

const PageContainer = styled.div`
    background: ${({ theme }: any) => theme.background};
    p {
        color: ${({ theme }: any) => theme.contrast};
    }
`;

export default function LabelLinks() {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <p>Datasets Content</p>
            </PageContainer>
        </ThemeProvider>
    );
}
