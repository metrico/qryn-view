import { ApiSelector } from "./components/apiselector/ApiSelector";
import { StatusBarSelectors } from "./components/statusbarselectors/StatusBarSelectors";
import Logo from "./assets/qryn-logo.png";
import { StatusBarCont, StatusCont } from "./styled";
import ClokiMenu from "../../plugins/settingsmenu/Menu";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "../DataViews/components/QueryBuilder/hooks";

export default function StatusBar() {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <StatusBarCont>
                <div className="logo-section">
                    <img
                        src={Logo}
                        alt="Qryn View"
                        height="24px"
                        className="logo"
                    />{" "}
                    <p
                        style={{
                            color: theme.textColor,
                            fontSize: "10px",
                            marginLeft: "5px",
                        }}
                    >
                        v{process.env.REACT_APP_VERSION}
                    </p>
                    <ApiSelector />
                </div>

                <StatusCont>
                    <StatusBarSelectors />
                    <ClokiMenu />
                </StatusCont>
            </StatusBarCont>
        </ThemeProvider>
    );
}
