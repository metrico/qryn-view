import { ThemeProvider } from "@emotion/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { PageContainer } from "./styles";
import { Route, Routes } from "react-router-dom";
import { DataSource } from "./DataSource";
import { List } from "./views/List";
import { Header } from "./components";

export function getURlParams(params) {

    const url = params.replace('#','')
    const decoded = decodeURIComponent(url)
    const urlParams = new URLSearchParams(decoded)
    let panels = {left:'', right:''}
    for(let [key,val] of urlParams) {
        if(key === 'left' ||  key === 'right') {
            panels[key] = JSON.parse(val)
        }
    }

}

export default function DataSources() {

    const themeState = useSelector((store) => store.theme) || "light";

    const theme = useMemo(() => {
        return themes[themeState];
    }, [themeState]);
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <div className="cont">
                    <Header title={"DataSources"} />
                    <List />
                </div>
            </PageContainer>
            <Routes>
                <Route path=":id" element={<DataSource />} />
            </Routes>
        </ThemeProvider>
    );
}
