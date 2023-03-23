import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useTheme } from "../../../theme";

const PageContainer = styled.div`
    background: ${({ theme }: any) => theme.viewBg};
    p {
        color: ${({ theme }: any) => theme.textColor};
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
