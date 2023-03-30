import { Switch } from "@mui/material";
import { css, cx } from "@emotion/css";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { useMemo } from "react";

const HeaderSectionStyles = (theme: any) => css`
    color: ${theme.textColor};
    .title {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-family: monospace;
        font-size: 10px;
        letter-spacing: 1px;
        color: ${theme.textColor};
        background: ${theme.inputBg};
        padding: 10px;
        border-radius: 3px 3px 0px 0px;
    }
    .content {
        display: flex;
        padding-top:10px;
        align-items: center;
    }
    select {
        height: 26px;
        color: ${theme.textColor};
        background: ${theme.inputBg};
        border: 1px solid ${theme.buttonBorder};
        border-radius: 3px;
        padding: 0px 6px;
    }
    label {
        padding: 10px;
        display: flex;
        align-items: center;
        font-size: 11px;
    }
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
        &:hover {
            background: ${theme.primaryLight};
        }
    }
`;

const LoaderStyle = css`
    border: 2px solid #f3f3f3; /* Light grey */
    border-top: 2px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 5px;
    height: 5px;
    margin-left: 2px;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loader = () => {
    return <div className={cx(LoaderStyle)}></div>;
};

type HeaderProps = {
    handleRecurrent: (e: any) => void;
    handleReset: (e: any) => void;
    openLogs: (e: any) => void;
    launchLogs: (e: any) => void;
    setRangeValue: (e: any) => void;
    setRecurrentValue: (e: any) => void;
    recurrentValue: number;
    isRecurrent: boolean;
    open: boolean;
    rangeValue: number;
    loading: boolean;
    theme: any;
};

const HeaderSection: React.FC<HeaderProps> = (props) => {
    const {
        isRecurrent,
        handleRecurrent,
        handleReset,
        open,
        openLogs,
        loading,
        theme,
        launchLogs,
        rangeValue,
        setRangeValue,
        setRecurrentValue,
        recurrentValue,
    } = props;

    const rangeOpts = useMemo(() => {
        return [
            ["5s", 5000],
            ["10s", 10000],
            ["20s", 20000],
            ["30s", 30000],
        ].map(([label, value]) => {
            return { label, value };
        });
    }, []);

    const periodicOpts = useMemo(() => {
        return [
            ["30s", 30000],
            ["1m", 60000],
            ["5m", 300000],
            ["10m", 600000],
        ].map(([label, value]) => {
            return { label, value };
        });
    }, []);

    const handleSelectChange = (e: any) => {
        if (e?.target?.selected) {
            setRangeValue(() => e.target.selected);
        }
    };

    const handleRecurrentChange = (e: any) => {
        if (e?.target?.selected) {
            setRecurrentValue(() => e.target.selected);
        }
    };

    return (
        <div className={cx(HeaderSectionStyles(theme))}>
            <p className={"title"}>
                {" "}
                <span>Raggix Lookup</span>
                {loading && <Loader />}
            </p>
            <div className={"content"}>
                {" "}
                {/* {logs} */}
                <label>Logs Preview </label>{" "}
                <Switch
                    checked={open}
                    size={"small"}
                    onChange={openLogs}
                    inputProps={{ "aria-label": "controlled" }}
                />
                <button onClick={handleReset}>Reset</button>
                <button onClick={launchLogs} title={"Launch Raggix Lookup"}>
                    Launch
                    <PlayArrowOutlinedIcon fontSize="small" />
                </button>
                <label>Range:</label>
                <select defaultValue={rangeValue} onChange={handleSelectChange}>
                    {rangeOpts?.map(({ label, value }, key) => (
                        <option key={key} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <label>Recurrent: </label>{" "}
                <Switch
                    checked={isRecurrent}
                    size={"small"}
                    onChange={handleRecurrent}
                    inputProps={{ "aria-label": "controlled" }}
                />
                {isRecurrent && (
                    <>
                        <label>Launch Every: </label>
                        <select
                            defaultValue={recurrentValue}
                            onChange={handleRecurrentChange}
                        >
                            {periodicOpts?.map(({ label, value }, key) => (
                                <option key={key} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>
        </div>
    );
};

export default HeaderSection;
