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
import React from "react";

const ScrubberHandles = styled.g`
    &:hover > .scrubber-handle-expansion {
        fill-opacity: 1;
    }
    &:hover > .scrubber-handle {
        fill: #44f;
    }
    &:hover + .scrubber.line {
        stroke: #44f;
    }
`;
const ScrubberHandle = cx(
    css`
        cursor: col-resize;
        fill: #555;
    `,
    "scrubber-handle"
);
const ScrubberDragging = css`
    & .scrubber-handle-expansion {
        fill-opacity: 1;
    }
    & .scrubber-handle {
        fill: #44f;
    }
    & > .scrubber-line {
        stroke: #44f;
    }
`;
const ScrubberHandleExpansion = cx(
    css`
        cursor: col-resize;
        fill-opacity: 0;
        fill: #44f;
    `,
    "scrubber-handle-expansion"
);
const ScrubberLine = cx(
    css`
        pointer-events: none;
        stroke: #555;
    `,
    "scrubber-line"
);

type ScrubberProps = {
    isDragging: boolean;
    position: number;
    onMouseDown: (evt: React.MouseEvent<any>) => void;
    onMouseEnter: (evt: React.MouseEvent<any>) => void;
    onMouseLeave: (evt: React.MouseEvent<any>) => void;
};

export default function Scrubber({
    isDragging,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    position,
}: ScrubberProps) {
    const xPercent = `${position * 100}%`;
    //   const styles = useStyles2(getStyles);
    const className = cx({ [ScrubberDragging]: isDragging });
    return (
        <g className={className} data-testid="scrubber-component">
            <ScrubberHandles
                data-testid="scrubber-component-g"
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {/* handleExpansion is only visible when `isDragging` is true */}
                <rect
                    data-testid="scrubber-component-rect-1"
                    x={xPercent}
                    className={ScrubberHandleExpansion}
                    style={{ transform: `translate(-4.5px)` }}
                    width="9"
                    height="20"
                />
                <rect
                    data-testid="scrubber-component-rect-2"
                    x={xPercent}
                    className={ScrubberHandle}
                    style={{ transform: `translate(-1.5px)` }}
                    width="3"
                    height="20"
                />
            </ScrubberHandles>
            <line
                className={ScrubberLine}
                y2="100%"
                x1={xPercent}
                x2={xPercent}
                data-testid="scrubber-component-line"
            />
        </g>
    );
}
