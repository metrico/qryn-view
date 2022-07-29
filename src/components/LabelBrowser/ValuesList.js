import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import LabelsSelector from "./components/LabelsSelector";
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

    const left = useSelector((store) => store.left);
    const right = useSelector((store) => store.right);

    const browserOpen = useMemo(() => {
        let isOpen = false;
        if (props.name === "left") {
            const actQuery = left.find((f) => f.id === props.data.id);
            isOpen = actQuery["browserOpen"];
        }
        if (props.name === "right") {
            const actQuery = right.find((f) => f.id === props.data.id);
            isOpen = actQuery["browserOpen"];
        }
        return isOpen;
    }, [left, right, props.name, props.data.id]);

    const [open, setOpen] = useState(browserOpen);

    useEffect(() => {
        let isOpen = false;
        if (props.name === "left") {
            const actQuery = left.find((f) => f.id === props.data.id);
            isOpen = actQuery["browserOpen"];
        }
        if (props.name === "right") {
            const actQuery = right.find((f) => f.id === props.data.id);
            isOpen = actQuery["browserOpen"];
        }
        setOpen(isOpen);
    }, [left, right, props.data.id, props.name]);

  
    return (
        open && (
            <ThemeProvider theme={themes[theme]}>
                <LabelsSelector {...props} />
            </ThemeProvider>
        )
    );
};
