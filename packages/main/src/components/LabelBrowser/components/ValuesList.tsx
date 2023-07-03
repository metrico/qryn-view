import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import LabelsSelector from "./LabelsSelector";
import { useEffect, useState } from "react";
import useTheme from "@ui/theme/useTheme"

const ErrorContainer = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LabelErrorStyled = styled.div`
    padding: 10px;
    color: orangered;
    border: 1px solid orangered;
    border-radius: 3px;
    font-size: 1em;
`;

export const LabelsFetchError = () => {
    const labelError = useSelector((store: any) => store.apiErrors);
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <ErrorContainer>
                {labelError !== "" && (
                    <LabelErrorStyled>
                        <span> {labelError}</span>
                    </LabelErrorStyled>
                )}
            </ErrorContainer>
        </ThemeProvider>
    );
};

export const ValuesList: any = (props: any) => {
    const theme = useTheme();
    const { browserOpen }: any = props.data;

    const [open, setOpen] = useState(browserOpen);

    useEffect(() => {
        setOpen(browserOpen);
    }, [browserOpen]);

    return (
        open && (
            <ThemeProvider theme={theme}>
                <LabelsSelector {...props} />
            </ThemeProvider>
        )
    );
};
