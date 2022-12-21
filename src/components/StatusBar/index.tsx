import { ApiSelector } from "./components/apiselector/ApiSelector";
import { StatusBarSelectors } from "./components/statusbarselectors/StatusBarSelectors";
import Logo from "./assets/qryn-logo.png";
import { StatusBarCont, StatusCont } from "./styled";
import ClokiMenu from "../../plugins/settingsmenu/Menu";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { ThemeProvider } from "@emotion/react";

export default function StatusBar() {
    const _themes: any = themes;
    const theme = useSelector(({ theme }: any) => theme)
    return (
        <ThemeProvider theme={_themes[theme]}>
            <StatusBarCont>
                <div className="logo-section">
                    <img
                        src={Logo}
                        alt="cLoki View"
                        height="24px"
                        className="logo"
                    />
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
