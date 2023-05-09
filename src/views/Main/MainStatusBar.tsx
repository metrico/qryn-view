import { css, cx } from "@emotion/css";

import React from "react";
import { useLocation } from "react-router-dom";
import PluginRenderer from "../../plugins/PluginsRenderer";
import ClokiMenu from "../../plugins/settingsmenu/Menu";
import { useTheme } from "../../theme";
import Logo from "./assets/qryn-logo.png";

const StatusBarStyles = (theme: any) => css`
    background: ${theme.widgetContainer};
    height: 30px;
    padding: 4px;
    display: flex;
    align-items: center;
    border-bottom:1px solid ${theme.buttonBorder};
    .logo-section {
        margin: 0;
        .version {
            color: ${theme.textColor};
            font-size: 10px;
            margin-left: 5px;
        }
        .path {
            color:${theme.textColor};
            margin-left:20px;
            flex:1;
            font-weight:bold;
            text-transform:uppercase;
            font-size:11px;
            letter-spacing:1px;
        }
    }
`;

const MainStatusBar: React.FC = () => {
    const theme = useTheme();
    const location = useLocation()

    const renderPath = (path:string) => {
        return path.replace(/\//,"")
    }

    return (
        <div className={cx(StatusBarStyles(theme))}>
            <div className="logo-section">
                <img
                    src={Logo}
                    alt="Qryn View"
                    height="24px"
                    className="logo"
                />
                <p className={"version"}>{process.env.REACT_APP_VERSION}</p>
                <p className="path"> {"/"} {renderPath(location.pathname)}</p>
            </div>
            <PluginRenderer section={"Status Bar"} localProps={theme} />
            <ClokiMenu />
        </div>
    );
};

export default MainStatusBar;
