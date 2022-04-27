import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
export const Legend = (props) => {
    const { title, text } = props;
    const theme = useSelector((store) => store.theme);
    return (
        <ThemeProvider theme={themes[theme]}>
            <div className={"legend-container"}>
                <p className={"legend-title"}>{title}</p>
                <small className={"legend-text"}>{text}</small>
            </div>
        </ThemeProvider>
    );
};
