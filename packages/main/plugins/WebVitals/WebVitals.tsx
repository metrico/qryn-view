import React from "react";
import { WebVitalsStore } from "./store";
import CustomSwitch from "@ui/qrynui/CustomSwitch/CustomSwitch";
import { css, cx } from "@emotion/css";
import useTheme from "@ui/theme/useTheme";
import { QrynTheme } from "@ui/theme/types";
import Tooltip from "@mui/material/Tooltip";
const WebVitalStyles = (theme: QrynTheme) => css`
    display: flex;
    align-items: center;
    p {
        font-size: 0.75em;
        color: ${theme.contrast};
    }
`;

export const WebVitals: React.FC = () => {
    const { 
        webVitalsActive, 
        httpPerformanceActive,
        setWebVitalsActive,
        setHttpPerformanceActive,
        qrynInstance
    } = WebVitalsStore();
    
    const theme = useTheme();
    const onWebVitalsActivate = () => {
        setWebVitalsActive(webVitalsActive);
    };
    const onHttpPerformanceRequestActivate = () => {
        setHttpPerformanceActive(httpPerformanceActive)
    }

    return (
        <div className={cx(WebVitalStyles(theme))}>
            <Tooltip title="Monitor Web vitals sending data to Qryn">
                <p>Monitor WebVitals</p>
            </Tooltip>
            <CustomSwitch
                onChange={onWebVitalsActivate}
                defaultActive={webVitalsActive}
            />
                      <Tooltip title="Monitor HTTP Requests sending data to Qryn">
                <p>Monitor HTTP Requests</p>
            </Tooltip>
            <CustomSwitch
                onChange={onHttpPerformanceRequestActivate}
                defaultActive={httpPerformanceActive}
            />
            <Tooltip title="Your qryn-view instance tag to monitor statistics">
            <p>Instance: {qrynInstance ?? ""}</p>
            </Tooltip>
        </div>
    );
};
