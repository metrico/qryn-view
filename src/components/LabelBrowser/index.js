import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { QueryBar } from "./QueryBar";
import { ValuesList } from "./ValuesList";

export default function LabelBrowser() {
    const theme = useSelector((store) => store.theme);
    return (
        <ThemeProvider theme={themes[theme]}>
            <div>
                <QueryBar className={"query-bar-placeholder"} />

                <ValuesList />
            </div>
        </ThemeProvider>
    );
}
