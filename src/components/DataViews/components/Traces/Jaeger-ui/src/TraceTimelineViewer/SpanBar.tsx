// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { css } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import cx from "classnames";
import { groupBy as _groupBy } from "lodash";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {themes} from '../theme/themes'

// import { Popover } from '../common/Popover';
import { TNil } from "../types";
import { TraceSpan } from "../types/trace";

import AccordianLogs from "./SpanDetail/AccordianLogs";
import { ViewedBoundsFunctionType } from "./utils";

const Wrapper = css`
       bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    z-index: 0;

`;
const Bar = css`
       border-radius: 3px;
    min-width: 2px;
    position: absolute;
    height: 36%;
    top: 32%;
`;
const Rpc = css`
       position: absolute;
    top: 35%;
    bottom: 35%;
    z-index: 1;
`;
const Label = css`
       color: #aaa;
    font-size: 12px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1em;
    white-space: nowrap;
    padding: 0 0.5em;
    position: absolute;
`;
const LogMarker = css`
       background-color: #2c3235;
    cursor: pointer;
    height: 60%;
    min-width: 1px;
    position: absolute;
    top: 20%;
    &:hover {
        background-color: #464c54;
    }
    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        border: 1px solid transparent;
    }
    &::after {
        left: 0;
    }
`;

type Props = {
    color: string;
    onClick?: (evt: React.MouseEvent<any>) => void;
    viewEnd: number;
    viewStart: number;
    getViewedBounds: ViewedBoundsFunctionType;
    rpc:
        | {
              viewStart: number;
              viewEnd: number;
              color: string;
          }
        | TNil;
    traceStartTime: number;
    span: TraceSpan;
    className?: string;
    labelClassName?: string;
    longLabel: string;
    shortLabel: string;
};

function toPercent(value: number) {
    return `${(value * 100).toFixed(1)}%`;
}
type themeProps = {
    theme: 'light' | 'dark'
}
function SpanBar({
    viewEnd,
    viewStart,
    getViewedBounds,
    color,
    shortLabel,
    longLabel,
    onClick,
    rpc,
    traceStartTime,
    span,
    className,
    labelClassName,
}: Props) {
    const [label, setLabel] = useState(shortLabel);
    const setShortLabel = () => setLabel(shortLabel);
    const setLongLabel = () => setLabel(longLabel);
    const storeTheme = useSelector((store:themeProps)=> store.theme)
    // group logs based on timestamps
    const logGroups = _groupBy(span.logs, (log) => {
        const posPercent = getViewedBounds(log.timestamp, log.timestamp).start;
        // round to the nearest 0.2%
        return toPercent(Math.round(posPercent * 500) / 500);
    });
    const theme = useMemo(()=>{
        return themes[storeTheme]
    },[storeTheme])
    return (
        <ThemeProvider theme={theme}>
        <div
              className={cx(Wrapper, className)}
            onClick={onClick}
            onMouseLeave={setShortLabel}
            onMouseOver={setLongLabel}
            aria-hidden
        >
            <div
                aria-label={label}
                className={Bar}
                style={{
                    background: color,
                    left: toPercent(viewStart),
                    width: toPercent(viewEnd - viewStart),
                }}
            >
                <div
                    className={cx(Label, labelClassName)}  data-testid="SpanBar--label"
                >
                    {label}
                </div>
            </div>
            <div>
                {/* {Object.keys(logGroups).map((positionKey) => (
          <Popover
            key={positionKey}
            content={
              <AccordianLogs interactive={false} isOpen logs={logGroups[positionKey]} timestamp={traceStartTime} />
            }
          >
            <div data-testid="SpanBar--logMarker"  className={styles.logMarker}  style={{ left: positionKey }} />
          </Popover>
        ))} */}
            </div>
            {rpc && (
                <div
                    //   className={styles.rpc}
                    style={{
                        background: rpc.color,
                        left: toPercent(rpc.viewStart),
                        width: toPercent(rpc.viewEnd - rpc.viewStart),
                    }}
                />
            )}
        </div>
        </ThemeProvider>
    );
}

export default React.memo(SpanBar);
