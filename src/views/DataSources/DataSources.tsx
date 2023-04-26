import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageContainer } from "./styles";
import { Route, Routes } from "react-router-dom";
import { DataSource } from "./DataSource";
import { List } from "./views/List";
import { Header } from "./components";
import { DataSourcesFiller } from "./components/DataSourcesFiller";
import { setTheme } from "../../actions";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../../components/DataViews/components/QueryBuilder/hooks";
import { PluginsSwitches } from "../../plugins/settingsdialog/SettingsDialog";

export function getURlParams(params: any) {
    const url = params.replace(/#/, "");
    const decoded = decodeURIComponent(url);
    const urlParams = new URLSearchParams(decoded);
    let panels = { left: "", right: "" };
    for (let [key, val] of urlParams) {
        if (key === "left" || key === "right") {
            panels[key] = JSON.parse(val);
        }
    }
}

export default function DataSources() {
    const isAutoDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
    const dispatch = useDispatch();
    const theme = useTheme();
    const autoTheme = useSelector((store: any) => store.autoTheme);
    useEffect(() => {
        if (autoTheme) {
            const theme = isAutoDark ? "dark" : "light";
            dispatch(setTheme(theme));
            localStorage.setItem(
                "theme",
                JSON.stringify({ theme: theme, auto: autoTheme })
            );
        }
    }, [isAutoDark, autoTheme, dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <div className="cont">
                    <Header title={"DataSources"} />
                    <List />

                    <div style={{ display: "flex", flex: 1 }}>
                        <div className="plugins-cont">
                            <p className="title">Plugins</p>
                            <PluginsSwitches border="false" />
                        </div>
                        <div
                            style={{
                                height: "40px",
                            }}
                        >
                            <DataSourcesFiller />
                        </div>
                    </div>
                </div>
            </PageContainer>
            <Routes>
                <Route path=":id" element={<DataSource />} />
            </Routes>
        </ThemeProvider>
    );
}
