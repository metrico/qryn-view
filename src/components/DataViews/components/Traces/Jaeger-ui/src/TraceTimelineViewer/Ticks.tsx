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
import styled from "@emotion/styled";
import cx from "classnames";
import * as React from "react";

import { TNil } from "../types";

import { formatDuration } from "./utils";

const TicksStyled = styled.div`
    pointer-events: none;
`;
const TicksTick = styled.div<{ theme: any }>`
    position: absolute;
    height: 100%;
    width: 1px;
    background: ${({ theme }) => theme.buttonBorder};
    &:last-child {
        width: 0;
    }
`;
const TicksTickLabel = css`
    left: 0.25rem;
    position: absolute;
`;
const TicksTickLabelEndAnchor = css`
    left: initial;
    right: 0.25rem;
`;

type TicksProps = {
    theme: any;
    endTime?: number | TNil;
    numTicks: number;
    showLabels?: boolean | TNil;
    startTime?: number | TNil;
};

export default function Ticks(props: TicksProps) {
    const { endTime, numTicks, showLabels, startTime } = props;

    let labels: undefined | string[];
    if (showLabels) {
        labels = [];
        const viewingDuration = (endTime || 0) - (startTime || 0);
        for (let i = 0; i < numTicks; i++) {
            const durationAtTick =
                (startTime || 0) + (i / (numTicks - 1)) * viewingDuration;
            labels.push(formatDuration(durationAtTick));
        }
    }
    const ticks: React.ReactNode[] = [];
    for (let i = 0; i < numTicks; i++) {
        const portion = i / (numTicks - 1);
        ticks.push(
            <TicksTick
                theme={props.theme}
                data-testid="TicksID"
                key={portion}
                style={{
                    left: `${portion * 100}%`,
                }}
            >
                {labels && (
                    <span
                        className={cx(TicksTickLabel, {
                            [TicksTickLabelEndAnchor]: portion >= 1,
                        })}
                    >
                        {labels[i]}
                    </span>
                )}
            </TicksTick>
        );
    }
    return <TicksStyled>{ticks}</TicksStyled>;
}

Ticks.defaultProps = {
    endTime: null,
    showLabels: null,
    startTime: null,
};
