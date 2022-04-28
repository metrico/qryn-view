import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";

const LabelsLegend = styled.div`
    margin:3px;
    padding:3px;
    line-height: 1.5;
    color: ${props => props.theme.textColor};
    .legend-title {
        font-size: 12px;
        font-weight: bold;
    }
    .legend-text {
        font-size: 12px;
        font-family: monospace;
    }

`

export const Legend = (props) => {
    const { title, text } = props;
    const theme = useSelector((store) => store.theme);
    return (
        <ThemeProvider theme={themes[theme]}>
            <LabelsLegend>
                <p className={"legend-title"}>{title}</p>
                <small className={"legend-text"}>{text}</small>
            </LabelsLegend>
        </ThemeProvider>
    );
};
