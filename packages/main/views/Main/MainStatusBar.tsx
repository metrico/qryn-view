import { css, cx } from "@emotion/css";


import PluginRenderer from "@ui/plugins/PluginsRenderer";
import MainMenu from "@ui/plugins/settingsmenu/MainMenu";
import useTheme from "@ui/theme/useTheme";
import Logo from "./assets/qryn-logo.png";
import { QrynTheme } from "@ui/theme/types";
import Breadcrumbs from "./Breadcrumbs";

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
            .bread-link {
                cursor: pointer;
                &:hover {
                    color: ${theme.primary}
                }
            }
        }
    }
`;


const MainStatusBar = () => {
    const theme = useTheme();

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
                    <Breadcrumbs />
                </p>
            </div>
            <PluginRenderer section={"Status Bar"} localProps={theme} />

            <MainMenu />
        </div>
    );
};

export default MainStatusBar;
