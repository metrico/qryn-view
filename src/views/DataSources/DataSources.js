import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import Logo from "./assets/qryn-logo.png";
import metrics_icon from "./assets/metrics_icon.png";
import logs_icon from "./assets/logs_icon.png";
import traces_icon from "./assets/traces_icon.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const Icon = ({ icon }) => {
    switch (icon) {
        case "metrics_icon":
            return (
                <img
                    height="40px"
                    className="logo"
                    src={metrics_icon}
                    alt="metrics"
                />
            );
        case "logs_icon":
            return (
                <img
                    height="40px"
                    className="logo"
                    src={logs_icon}
                    alt="logs"
                />
            );
        case "traces_icon":
            return (
                <img
                    height="40px"
                    className="logo"
                    src={traces_icon}
                    alt="traces"
                />
            );
        default:
            return (
                <img
                    height="40px"
                    className="logo"
                    src={logs_icon}
                    alt="logs"
                />
            );
    }
};
const PageContainer = styled.div`
    margin: 0px;
    padding: 0px;
    left: 0;
    top: 0;
    border-radius: 3px;
    background: ${({ theme }) => theme.viewBg};
    color: ${({ theme }) => theme.textColor};
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    .cont {
        padding: 10px;
        margin: 10px;
        background: ${({ theme }) => theme.widgetContainer};
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .ds-header {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 24px;
        display: flex;
        align-items: center;
        padding-left: 0px;
        .logo {
            margin-right: 10px;
        }
    }
    .ds-item {
        padding: 10px;
        background: ${({ theme }) => theme.viewBg};
        margin-bottom: 10px;
        border-radius: 3px;
        padding-bottom: 14px;
        display: flex;
        .logo {
            padding: 10px;
            padding-right: 20px;
            padding-left: 0px;
        }
        .ds-text {
            display: flex;
            flex-direction: column;
            flex:1;
        }
        .ds-type {
            font-size: 18px;
            padding: 10px;
            padding-left: 0px;
        }
        small {
            font-size: 12px;
        }
        .setting-icon {
            justify-self:flex-end;
        }
    }
`;

export function DataSourceItem({ type, name, url, icon }) {
    return (
        <div className="ds-item">
            <Icon icon={icon} />
            <div className="ds-text">
                <div className="ds-type">{type}</div>
                <small>
                    {" "}
                    {name} | {url}
                </small>
            </div>
            <SettingsOutlinedIcon className="setting-icon"/>
        </div>
    );
}

export function DataSourcesList() {
    const ds = useSelector(({ dataSources }) => dataSources);
    if (ds?.length > 0) {
        return (
            <div>
                {ds.map((item, idx) => (
                    <DataSourceItem key={idx} {...item} />
                ))}
            </div>
        );
    }
    return (
        <div>
            <h1>No Data Sources Found.</h1>
        </div>
    );
}

export function DataSourcesHeader() {
    return (
        <div className="ds-header">
            <img
                src={Logo}
                alt={"qryyn View"}
                height={"24px"}
                className={"logo"}
            />{" "}
            <h1>Data Sources</h1>
        </div>
    );
}

export default function DataSources() {
    const themeState = useSelector(({ theme }) => theme);

    const theme = useMemo(() => {
        return themes[themeState];
    }, [themeState]);
    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <div className="cont">
                    <DataSourcesHeader />
                    <DataSourcesList />
                </div>
            </PageContainer>
        </ThemeProvider>
    );
}
