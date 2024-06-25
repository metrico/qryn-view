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
import React, {useState } from "react";
import useTheme from '@ui/theme/useTheme'

// import { Popover } from '../common/Popover';
import { TNil } from "../types";
import { TraceSpan } from "../types/trace";
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

const Label = css`
    color: #aaa;
    font-size: 12px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1em;
    white-space: nowrap;
    padding: 0 0.5em;
    position: absolute;
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

function SpanBar({
    viewEnd,
    viewStart,
    color,
    shortLabel,
    longLabel,
    onClick,
    rpc,
    className,
    labelClassName,
}: Props) {
    const [label, setLabel] = useState(shortLabel);
    const setShortLabel = () => setLabel(shortLabel);
    const setLongLabel = () => setLabel(longLabel);
    const theme = useTheme()
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
                        className={cx(Label, labelClassName)}
                        data-testid="SpanBar--label"
                    >
                        {label}
                    </div>
                </div>
                <div></div>
                {rpc && (
                    <div
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
