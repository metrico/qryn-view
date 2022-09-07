import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../../theme/themes";
import LabelsSelector from "./LabelsSelector";
import { useEffect, useMemo, useState } from "react";

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
    const labelError = useSelector((store) => store.apiErrors);
    const theme = useSelector((store) => store.theme);

    return (
        <ThemeProvider theme={themes[theme]}>
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

export const ValuesList = (props) => {
    const theme = useSelector((store) => store.theme);
    const { name } = props;
    const { id } = props.data;
    const panelQuery = useSelector((store) => store[name]);
    const browserOpen = useMemo(() => {
        let isOpen = false;
        const actQuery = panelQuery.find((f) => f.id === id);
        isOpen = actQuery["browserOpen"];
        return isOpen;
    }, [panelQuery, id]);

    const [open, setOpen] = useState(browserOpen);

    useEffect(() => {
        let isOpen = false;
        const actQuery = panelQuery.find((f) => f.id === id);
        isOpen = actQuery["browserOpen"];
        setOpen(isOpen);
    }, [panelQuery, id]);

    return (
        open && (
            <ThemeProvider theme={themes[theme]}>
                <LabelsSelector {...props} />
            </ThemeProvider>
        )
    );
};
