import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../../theme/themes";
const PageContainer = styled.div`
    background: ${({ theme }) => theme.viewBg};
    p {
        color: ${({ theme }) => theme.textColor};
    }
`;

export default function LabelLinks() {
    const themeState = useSelector(({ theme }) => theme);

    const theme = useMemo(() => {
        return themes[themeState];
    }, [themeState]);
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <p>Datasets Content</p>
            </PageContainer>
        </ThemeProvider>
    );
}
