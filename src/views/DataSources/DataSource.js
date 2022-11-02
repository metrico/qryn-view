import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { themes } from "../../theme/themes";
import { Header } from "./components";
import { Icon } from "./ui";

import { Settings } from "./views";
export const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    background: ${({ theme }) => theme.viewBg};
    display: flex;
    flex-direction: culumn;
    justify-content: center;
    color: ${({ theme }) => theme.textColor};
    flex: 1;
    height: 100%;
    width: 100%;

    .body-cont {
        max-width: 1440px;
        padding: 10px;
        margin: 10px;
        border-radius: 3px;
        flex: 1;
        background: ${({ theme }) => theme.widgetContainer};
        overflow-y:auto;
        overflow-x:hidden;
    }
    .ds-header {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 24px;
        flex: 1;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding-left: 0px;
        .logo {
            margin-right: 10px;
        }
    }
    .ds-cont {
        margin-bottom: 10px;
        border: 1px solid ${({ theme }) => theme.buttonBorder};
        border-radius: 3px;
        overflow-y:auto;
    }
    .ds-item {
        padding: 10px;
        background: ${({ theme }) => theme.viewBg};
        //    margin-bottom: 10px;
        border-radius: 3px 3px 0px 0px;
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
            flex: 1;
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
            justify-self: flex-end;
            cursor: pointer;
        }
        .ds-settings {
            background: ${({ theme }) => theme.viewBg};
        }
    }
`;

export function DataSourceSetting(props) {
    const { type, name, url, icon } = props;

    return (
        <div className="ds-cont">
            <div className="ds-item">
                <Icon icon={icon} />
                <div className="ds-text">
                    <div className="ds-type">{name}</div>

                    <small>
                        {" "}
                        {type} | {url}
                    </small>
                </div>
            </div>
            <div className="ds-settings">
                <Settings {...props} />
            </div>
        </div>
    );
}

export function DataSource() {
    let { id } = useParams();
    const { theme } = useSelector((store) => store);
    const dataSources = useSelector((store) => store.dataSources);

    const datasource = useMemo(() => {
        if (dataSources?.length > 0) {
            return dataSources?.find((f) => f.id === id);
        } else {
            return {};
        }
    }, [id, dataSources]);

    return (
        <ThemeProvider theme={themes[theme]}>
            <Container>
                <div className="body-cont">
                    <Header title={"DataSource Settings"} />
                    <div className="datasource-body">
                        <DataSourceSetting {...datasource} />
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}
