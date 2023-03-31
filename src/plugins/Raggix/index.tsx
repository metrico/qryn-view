import { useEffect, useMemo, useState } from "react";
import LogsList from "./LogsList";
import LogsCounter from "./LogsCounter";
import useDataSources from "./useDataSources";
import HeaderSection from "./HeaderSection";
import { useTheme } from "../../theme";
import { css, cx } from "@emotion/css";
import getLookupSeries from "./getLookupSeries";

const QueryPreviewStyles = (theme: any) => css`
    display: flex;
    color: ${theme.textColor};
    background: ${theme.inputBg};
    font-family: monospace;
    font-size: 12px;
    padding: 8px;
    margin: 10px;
    border-radius: 3px;
    flex-wrap: wrap;
    white-space: pre-wrap;
    max-width: 100%;
`;
const RaggixContainer = (theme: any) => css`
    border: 1px solid ${theme.buttonBorder};
    margin: 10px;
    border-radius: 3px;
`;

export const useDataSourceConfig = (ds: any) => {
    return useMemo(() => {
        const { auth } = ds;
        let headers = ds.headers?.map((k: any) => ({ [k.header]: k.value }));

        const options = {
            method: auth.method.value,
            headers,
        };
        const config: any = { options };
        const hasBasicAuth = auth.basicAuth.value;

        if (hasBasicAuth) {
            const {
                fields: {
                    basicAuth: [us, pw],
                },
            } = auth;
            const username = us.value;
            const password = pw.value;
            config.auth = { username, password };
        }

        return config;
    }, [ds]);
};

const Raggix = (props: any) => {
    const {
        localProps: {
            data: { dataSourceType },
        },
    } = props;

    const theme = useTheme();
    const ds = useDataSources(dataSourceType);
    const config = useDataSourceConfig(ds);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(true);
    const [logs, setLogs] = useState<any>("");
    const [loading, setLoading] = useState(false);
    const [rangeValue, setRangeValue] = useState(5000);
    const [labelString, setLabelString] = useState("");
    const [isRecurrent, setIsRecurrent] = useState(false);
    const [recurrentValue, setRecurrentValue] = useState(30000);
    const [actTimestamp, setActTimestamp] = useState(Date.now());

    const handleRecurrent = (e: any) => {
        setIsRecurrent(() => e.target.checked);
    };
    const handleReset = () => {
        setLogs(() => []);
    };

    const openLog = (e: any) => {
        setIndex(() => e);
    };
    const showLabels = (e: any) => {
        setLabelString(() => e);
    };
    const openLogs = (e: any) => {
        setOpen(() => e.target.checked);
    };

    const launchLogs = (e: any) => {
        const end = Date.now();
        const start = end - rangeValue;
        const host = ds?.url;
        let res = getLookupSeries(
            start,
            end,
            host,
            setLoading,
            dataSourceType,
            config
        );

        res.then((data) => {
            setLogs(() => data);
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActTimestamp(Date.now());
        }, recurrentValue);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isRecurrent && actTimestamp) {
            // do worker stuff
            const end = Date.now();
            const start = end - rangeValue;
            const host = ds?.url;
            let res = getLookupSeries(
                start,
                end,
                host,
                setLoading,
                dataSourceType,
                config
            );
            res.then((data) => {
                setLogs(data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecurrent, actTimestamp]);

    return (
        <div className={cx(RaggixContainer(theme))}>
            <div>
                <HeaderSection
                    theme={theme}
                    loading={loading}
                    isRecurrent={isRecurrent}
                    open={open}
                    openLogs={openLogs}
                    handleRecurrent={handleRecurrent}
                    handleReset={handleReset}
                    launchLogs={launchLogs}
                    rangeValue={rangeValue}
                    setRangeValue={setRangeValue}
                    setRecurrentValue={setRecurrentValue}
                    recurrentValue={recurrentValue}
                />
                <div className={cx(QueryPreviewStyles(theme))}>
                    {labelString}
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <LogsCounter
                    theme={theme}
                    showLabels={showLabels}
                    loading={loading}
                    logs={logs}
                    openLog={openLog}
                />
            </div>
            <div>
                {logs && (
                    <LogsList
                        theme={theme}
                        open={open}
                        loading={loading}
                        logs={logs[index]}
                    />
                )}
            </div>
        </div>
    );
};

export default Raggix;
