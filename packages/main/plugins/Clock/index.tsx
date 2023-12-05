import { css, cx } from "@emotion/css";
import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { Plugin } from "../types";
import useTheme from "@ui/theme/useTheme";

const ClockStyles = (theme: any) => css`
    color: ${theme.contrast};
    background: ${theme.shadow};
    display: flex;
    font-size: 10px;
    letter-spacing: 1px;
    font-family: "Courier New", Courier, monospace;
    margin: 0px 10px;
`;

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());
    const theme = useTheme();
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className={cx(ClockStyles(theme))}>
                <p>{time.toLocaleString()}</p>
            </div>
        </div>
    );
};

const clockPlugin: Plugin = {
    name: "Clock",
    section: "Status Bar",
    id: nanoid(),
    Component: Clock,
    description: "A simple clock with date / time",
    active: false,
    visible: true,
    roles:["admin","user","guest","superAdmin"]
};

export default clockPlugin;
