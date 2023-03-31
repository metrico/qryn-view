import { css, cx } from "@emotion/css";
import LogItem from "./LogItem";

const LogsCounterStyles = (theme: any) => css`
    margin: 0px 10px;
    display: flex;
    flex-wrap: wrap;
`;

type Props = {
    loading: boolean;
    logs: any[];
    theme: any;
    openLog: Function;
    showLabels: (e: any) => void;
};

const LogsCounter: React.FC<Props> = (props) => {
    const { logs, loading, openLog, showLabels, theme } = props;

    if (!loading) {
        return (
            <div className={cx(LogsCounterStyles(theme))}>
                {logs?.length > 0 &&
                    logs?.map((log: any, index: number) => (
                        <div key={index}>
                            <LogItem
                                log={log}
                                showLabels={showLabels}
                                openLog={openLog}
                                index={index}
                            />
                        </div>
                    ))}
            </div>
        );
    }
    return <></>;
};

export default LogsCounter;
