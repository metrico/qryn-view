import { useEffect, useMemo, useState } from "react";
import LogsList from "./LogsList";
import LogsCounter from "./LogsCounter";
import useDataSources from "./useDataSources";
import HeaderSection from "./HeaderSection";
import { useTheme } from "../../theme";
import { css, cx } from "@emotion/css";
import getLookupSeries from "./getLookupSeries";
import updateQuery from "./updateQuery";
import { useSelector } from "react-redux";
export const UpdateQueryStringFromPanel = (panel: string, id: string) => {};

const QueryPreviewStyles = (theme: any) => css`
    display: flex;
    color: ${theme.textColor};
    font-family: monospace;
    font-size: 12px;
    padding: 8px;
    margin: 10px;
    border-radius: 3px;
    flex-wrap: wrap;
    white-space: pre-wrap;
    max-width: 100%;
    button {
        border: 1px solid ${theme.primaryBorder};
        border-radius: 3px;
        padding: 4px 8px;
        background: ${theme.primaryDark};
        color: ${theme.buttonText};
        margin: 0px 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 30px;
        font-size: 12px;
        &:hover {
            background: ${theme.primaryLight};
        }
    }
    code {
        padding-left: 3px;
        border: 1px solid ${theme.buttonBorder};
        flex: 1;
        border-radius: 3px;
        display: flex;
        align-items: center;
        background: ${theme.inputBg};
    }
`;
const RaggixContainer = (theme: any) => css`
    border: 1px solid ${theme.buttonBorder};
    border-radius: 3px;
    margin: 10px;
    border-radius: 3px;
`;

export const updateQueryFromPanel = (query: string) => {};

export const useDataSourceConfig = (ds: any) => {
    return useMemo(() => {
        const { auth } = ds;
        let headersMap = ds.headers?.map((k: any) => ({ [k.header]: k.value }));
        let headers: any = {};

        for (let header of headersMap) {
            let entries: any = Object.entries(header)[0];
            headers[entries[0]] = entries[1];
        }
        const config: any = { headers };
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
    const { data } = props.localProps;
    const { name, id } = data;
    const panel = useSelector((store: any) => store[data?.panel]);

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
    const convertLabelToString = (labels: string) => {
        const labelsParsed = JSON.parse(labels);
        let entries = Object.entries(labelsParsed);

        let labelsConverted = entries
            .map(([key, val]) => {
                return `${key}="${val}"`;
            })
            .join(", ");
        let result = `{${labelsConverted}}`;

        return result;
    };

    const handleRecurrent = (e: any) => {
        setIsRecurrent(() => e.target.checked);
    };
    const handleReset = () => {
        setLogs(() => []);
        setLabelString(() => "");
    };

    const openLog = (e: any) => {
        setIndex(() => e);
    };

    const showLabels = (e: any) => {
        const converted = convertLabelToString(e);
        setLabelString(() => converted);
    };
    const openLogs = (e: any) => {
        setOpen(() => e.target.checked);
    };
    // update query sending query from button

    const handleQueryRequest = (e: any) => {
        if (labelString?.length > 0 && panel) {
            updateQuery(name, id, "expr", labelString, panel);
        }
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
                {labelString !== "" && (
                    <div className={cx(QueryPreviewStyles(theme))}>
                        <button onClick={handleQueryRequest}>Send Query</button>{" "}
                        <code>{labelString}</code>
                    </div>
                )}
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
