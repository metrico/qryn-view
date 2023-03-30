import { css, cx } from "@emotion/css";
import { useMemo } from "react";

const levelColors: any = {
    error: "red",
    info: "green",
    information: "green",
    warn: "purple",
    warning: "purple",
    debug: "blue",
};

const LogItemStyle = (level: string) => css`
    height: 20px;
    width: 20px;
    background: ${level || "gray"};
    margin: 3px;
    border-radius: 3px;
    opacity: 0.7;
    transition: 0.4s all;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
`;

const useLevel = (props: any) =>
    useMemo(() => {
        if (props?.log?.stream?.level) {
            const keys = Object.keys(props.log.stream);
            if (keys.includes("level")) {
                return levelColors[props.log.stream.level || "info"];
            }
        }

        return "";
    }, [props.log.stream]);

const LogItem = (props: any) => {
    const { openLog, index, showLabels } = props;
    const level = useLevel(props);
    return (
        <div
            className={cx(LogItemStyle(level))}
            onClick={() => openLog(index)}
            onMouseEnter={() => showLabels(JSON.stringify(props.log.stream))}
        ></div>
    );
};

export default LogItem;
