import { css, cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import { useCallback, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAlert } from "@ui/store/actions";

import { Header } from "./components";
import setDataSources from "./store/setDataSources";
import { Container } from "./styles/Container";
import { Button, Icon } from "./ui";
import { Settings } from "./views";
import DOMPurify from "isomorphic-dompurify";
import useTheme from "@ui/theme/useTheme";
const HeaderRow = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
`;

interface CookieProps {
    auth?: string;
    url?: string;
}

function setCookieFromParams(parsedDs: string, user: string, password: string) {
    let cookie: CookieProps = {};
    let hasAuth = password && password !== "" && user && user !== "";
    let auth = hasAuth ? `${btoa(user)}:${btoa(password)}` : "";
    let url = JSON.parse(JSON.stringify(parsedDs));

    if (hasAuth && auth) {
        cookie.auth = auth;
    }

    cookie.url = url;

    return JSON.stringify(cookie);
}

export function DataSourceSetting(props: any) {
    const {
        url,
        auth: {
            basicAuth,
            fields: {
                basicAuth: [user, password],
            },
        },
    } = props;

    // eslint-disable-next-line
    const [cookie, setCookie] = useCookies([
        "qryn-dev-cookie",
        "qryn-settings",
    ]); // for testing cookies feature

  
    const dispatch: any = useDispatch();
    const dataSources = useSelector((store: any) => store.dataSources);
    const useForAll = () => {
        const dsCP = [...dataSources];
        const prevDs = JSON.parse(JSON.stringify(dsCP));

        const newDs = prevDs?.map((m: any) => ({
            ...m,
            url: DOMPurify.sanitize(url),
            auth: {
                ...m.auth,
                basicAuth: { ...m.auth.basicAuth, value: basicAuth.value },
                fields: {
                    ...m.auth.fields,
                    basicAuth: [...m.auth.fields.basicAuth]?.map((ba) => {
                        if (ba.name === "user") {
                            return {
                                ...ba,
                                value: DOMPurify.sanitize(user.value),
                            };
                        }
                        if (ba.name === "password") {
                            return {
                                ...ba,
                                value: DOMPurify.sanitize(password.value),
                            };
                        }
                        return ba;
                    }),
                },
            },
        }));

        // uncomment for testing cookies feature

        localStorage.setItem("dataSources", JSON.stringify(newDs));

        dispatch(setDataSources(newDs));
        dispatch(
            createAlert({
                type: "success",
                message: "Set same URL and Basic Auth for All Data Sources",
            })
        );
    };

    function addCookie() {
        const today = new Date();
        const tomorrow = new Date();

        tomorrow.setDate(today.getDate() + 1);

        try {
            setCookie(
                "qryn-settings",
                setCookieFromParams(url, user.value, password.value),
                { path: "" }
            );
        } catch (e) {
            console.log(e);
        }
    }

    function downLoadJson() {
        const { headers, id, name, linkedFields } = props;

        const headersMapped = headers?.map(({ header, value }) => ({
            [header]: value,
        }));

        const datasources = { id, name, headers: headersMapped, linkedFields };

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(datasources)
        )}`;

        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `${name}_${id}.json`;

        link.click();
    }

    return (
        <div className="ds-cont">
            <div className={cx(HeaderRow)}>
                <DataSourceSettingHeader {...props} />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                        title={"Download Datasource settings as JSON"}
                        value={DOMPurify.sanitize("Download JSON")}
                        onClick={downLoadJson}
                        primary={true}
                    />
                    <Button
                        title={"Set Cookie with name: qryn-settings"}
                        value={DOMPurify.sanitize("Save Cookie")}
                        onClick={addCookie}
                        primary={true}
                    />

                    <Button
                        title={
                            "Use same URL and Basic Auth for all Data Sources"
                        }
                        value={DOMPurify.sanitize("Use For All")}
                        onClick={useForAll}
                        primary={true}
                    />
                </div>
            </div>

            <div className="ds-settings">
                <Settings {...props}  />
            </div>
        </div>
    );
}

export const DataSourceSettingHeader = (props: any) => {
    const { icon, name, type, url } = props;
    return (
        <div className={"ds-item"}>
            <Icon icon={icon} />
            <div className={"ds-text"}>
                <div className={"ds-type"}>{name}</div>
                <small>
                    {DOMPurify.sanitize(type)} | {DOMPurify.sanitize(url)}
                </small>
            </div>
        </div>
    );
};

export function DataSource() {
    let { id } = useParams();
    const theme = useTheme();
    const dispatch:any = useDispatch()

    const dataSources = useSelector((store: any) => store.dataSources);
    const [dataChanged, setDataChanged] = useState([])

    const datasource = useMemo(() => {
        if (!dataSources || dataSources.length === 0) {
            return {};
        }

        return dataSources.find((f: any) => f.id === id) || {};
    }, [id, dataSources]);

    const saveSettings = () => useCallback(()=>{
        dispatch(setDataSources(dataChanged))
        localStorage.setItem("dataSources", JSON.stringify(dataChanged));
    },[dataChanged])



    return (
        <ThemeProvider theme={theme}>
            <Container>
                <div className={"body-cont"}>
                    <Header
                        title={"DataSource Settings"}
                        datasource={datasource}
                        onSave={saveSettings}
                    />
                    <div className={"datasource-body"}>
                        <DataSourceSetting
                         {...datasource} 
                         saveSettings={setDataChanged}  />
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}
