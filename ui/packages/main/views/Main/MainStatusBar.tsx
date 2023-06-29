import { css, cx } from "@emotion/css";

import { useLocation } from "react-router-dom";
import PluginRenderer from "@ui/plugins/PluginsRenderer";
import MainMenu from "@ui/plugins/settingsmenu/MainMenu";
import useTheme from "@ui/theme/useTheme";
import Logo from "./assets/qryn-logo.png";
import { QrynTheme } from "@ui/theme/types";


const StatusBarStyles = (theme: QrynTheme) => css`
    background: ${theme.shadow};
    height: 30px;
    padding: 4px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${theme.accentNeutral};
    .logo-section {
        margin: 0;
        .version {
            color: ${theme.contrast};
            font-size: 10px;
            margin-left: 5px;
        }
        .path {
            color: ${theme.contrast};
            margin-left: 20px;
            flex: 1;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 1px;
        }
    }
`;

const MainStatusBar = () => {
    const theme = useTheme();
    const location = useLocation();

    const renderPath = (path: string) => {
        return path.replace(/\//, "");
    };

    return (
        <div className={cx(StatusBarStyles(theme))}>
            <div className="logo-section">
                <img
                    src={Logo}
                    alt="Qryn View"
                    height="24px"
                    className="logo"
                />
                <p className={"version"}>{import.meta.env.VITE_APP_VERSION}</p>
                <p className="path">
                    {" "}
                    {"/"} {renderPath(location.pathname)}
                </p>
            </div>
            <PluginRenderer section={"Status Bar"} localProps={theme} />

            <MainMenu />
        </div>
    );
};

export default MainStatusBar;
