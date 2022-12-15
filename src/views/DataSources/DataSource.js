import { css, cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import { useMemo } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAlert } from "../../actions";
import { Notification } from "../../qryn-ui/notifications";
import { themes } from "../../theme/themes";
import { Header } from "./components";
import setDataSources from "./store/setDataSources";
import { Container } from "./styles/Container";
import { Button, Icon } from "./ui";
import { Settings } from "./views";

const HeaderRow = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
`;

export function DataSourceSetting(props) {
    const {
        url,
        auth: {
            basicAuth,
            fields: {
                basicAuth: [user, password],
            },
        },
    } = props;
    // const [cookie, setCookie] = useCookies(['qryn-dev-cookie']) // for testing cookies feature

    const dispatch = useDispatch();
    const dataSources = useSelector((store) => store.dataSources);
    const useForAll = () => {
        const dsCP = [...dataSources];
        const prevDs = JSON.parse(JSON.stringify(dsCP));

        const newDs = prevDs?.map((m) => ({
            ...m,
            url,
            auth: {
                ...m.auth,
                basicAuth: { ...m.auth.basicAuth, value: basicAuth.value },
                fields: {
                    ...m.auth.fields,
                    basicAuth: [...m.auth.fields.basicAuth]?.map((ba) => {
                        if (ba.name === "user") {
                            return { ...ba, value: user.value };
                        }
                        if (ba.name === "password") {
                            return { ...ba, value: password.value };
                        }
                        return ba;
                    }),
                },
            },
        }));
        // var today = new Date()
        // var tomorrow = new Date();
        // tomorrow.setDate(today.getDate()+1);
        // setCookie('qryn-session', `${btoa('harry')}:${btoa('potter')}`, {path:'/',expires:tomorrow} ) // uncomment for testing cookies feature
        
        localStorage.setItem("dataSources", JSON.stringify(newDs));
        dispatch(setDataSources(newDs));
        dispatch(createAlert({
            type:'success',
            message:'Set same URL and Basic Auth for All Data Sources'
        }))
    };
    return (
        <div className="ds-cont">
            <div className={cx(HeaderRow)}>
                <DataSourceSettingHeader {...props} />

                <Button
                    title={"Use same URL and Basic Auth for all Data Sources"}
                    value={"Use For All"}
                    onClick={useForAll}
                    primary={true}
                />
            </div>

            <div className="ds-settings">
                <Settings {...props} />
                <Notification/>
            </div>
        </div>
    );
}

export const DataSourceSettingHeader = (props) => {
    const { icon, name, type, url } = props;
    return (
        <div className="ds-item">
            <Icon icon={icon} />
            <div className="ds-text">
                <div className="ds-type">{name}</div>
                <small>
                    {type} | {url}
                </small>
            </div>
        </div>
    );
};

export function DataSource() {
    let { id } = useParams();
    const { theme } = useSelector((store) => store);
    const dataSources = useSelector((store) => store.dataSources);
    const datasource = useMemo(() => {
        if (!dataSources || dataSources.length === 0) {
            return {};
        }

        return dataSources.find((f) => f.id === id) || {};
    }, [id, dataSources]);

    return (
        <ThemeProvider theme={themes[theme]}>
            <Container>
                <div className="body-cont">
                    <Header
                        title={"DataSource Settings"}
                        datasource={datasource}
                    />
                    <div className="datasource-body">
                        <DataSourceSetting {...datasource} />
                    </div>
                    
                </div>
            </Container>
        </ThemeProvider>
    );
}
