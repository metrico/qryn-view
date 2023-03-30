import { useEffect, useState } from "react";
import LogsList from "./LogsList";

import getLogsSeries from "./getLogsSeries";
import LogsCounter from "./LogsCounter";
import useDataSources from "./useDataSources";
import HeaderSection from "./HeaderSection";
import { useTheme } from "../../theme";
import { css, cx } from "@emotion/css";

const LabelsStyle = (theme: any) => ({
    display: "flex",
    color: theme.textColor,
    background: theme.inputBg,
    fontFamily: "monospace",
    fontSize: "12px",
    padding: "8px",
    margin: "10px",
    borderRadius:"3px"
});

const RaggixContainer = (theme: any) => css`
    border: 1px solid ${theme.buttonBorder};
    margin: 10px;
    border-radius: 3px;
`;

const Raggix = () => {
    const theme = useTheme();
    const ds = useDataSources();
    const [logs, setLogs] = useState<any>("");
    const [isRecurrent, setIsRecurrent] = useState(false);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [recurrentValue, setRecurrentValue] = useState(30000);
    const [actTimestamp, setActTimestamp] = useState(Date.now());
    const [rangeValue, setRangeValue] = useState(5000);

    const [labelString, setLabelString] = useState("");
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
        const host = ds?.Logs?.url;
        let res = getLogsSeries(start, end, host, setLoading);
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
            const host = ds?.Logs?.url;
            let res = getLogsSeries(start, end, host, setLoading);
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
                <div style={LabelsStyle(theme)}>{labelString}</div>
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
                <LogsList
                    theme={theme}
                    open={open}
                    loading={loading}
                    logs={logs[index]}
                />
            </div>
        </div>
    );
};

export default Raggix;
