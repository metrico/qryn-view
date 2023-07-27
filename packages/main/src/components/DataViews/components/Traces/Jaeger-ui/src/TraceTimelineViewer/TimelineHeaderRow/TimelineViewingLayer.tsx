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

import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useState, useEffect, useRef } from "react";

import { TNil } from "../../types";
import DraggableManager, {
    DraggableBounds,
    DraggingUpdate,
} from "../../utils/DraggableManager";
import {
    TUpdateViewRangeTimeFunction,
    ViewRangeTime,
    ViewRangeTimeUpdate,
} from "../types";

const TimelineViewingLayerStyled = styled.div`
    bottom: 0;
    cursor: vertical-text;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
`;
const TimelineViewingLayerCursorGuideStyled = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    background-color: red;
`;

const TimelineViewingLayerDragged = css`
    position: absolute;
    top: 0;
    bottom: 0;
`;
const TimelineViewingLayerDraggedDraggingLeft = css`
    border-left: 1px solid;
`;
const TimelineViewingLayerDraggedDraggingRight = css`
    border-right: 1px solid;
`;
const TimelineViewingLayerDraggedShiftDrag = css`
    background-color: rgba(68, 68, 255, 0.2);
    border-color: #44f;
`;
const TimelineViewingLayerDraggedReframeDrag = css`
    background-color: rgba(255, 68, 68, 0.2);
    border-color: #f44;
`;

type TimelineViewingLayerProps = {
    /**
     * `boundsInvalidator` is an arbitrary prop that lets the component know the
     * bounds for dragging need to be recalculated. In practice, the name column
     * width serves fine for this.
     */
    boundsInvalidator: any | null | undefined;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRangeTime: ViewRangeTime;
};

type TDraggingLeftLayout = {
    isDraggingLeft: boolean;
    left: string;
    width: string;
};

type TOutOfViewLayout = {
    isOutOfView: true;
};

function isOutOfView(
    layout: TDraggingLeftLayout | TOutOfViewLayout
): layout is TOutOfViewLayout {
    return Reflect.has(layout, "isOutOfView");
}

/**
 * Map from a sub range to the greater view range, e.g, when the view range is
 * the middle half ([0.25, 0.75]), a value of 0.25 befomes 3/8.
 * @returns {number}
 */
function mapFromViewSubRange(
    viewStart: number,
    viewEnd: number,
    value: number
) {
    return viewStart + value * (viewEnd - viewStart);
}

/**
 * Map a value from the view ([0, 1]) to a sub-range, e.g, when the view range is
 * the middle half ([0.25, 0.75]), a value of 3/8 becomes 1/4.
 * @returns {number}
 */
function mapToViewSubRange(viewStart: number, viewEnd: number, value: number) {
    return (value - viewStart) / (viewEnd - viewStart);
}

/**
 * Get the layout for the "next" view range time, e.g. the difference from the
 * drag start and the drag end. This is driven by `shiftStart`, `shiftEnd` or
 * `reframe` on `props.viewRangeTime`, not by the current state of the
 * component. So, it reflects in-progress dragging from the span minimap.
 */
function getNextViewLayout(
    start: number,
    position: number
): TDraggingLeftLayout | TOutOfViewLayout {
    let [left, right] =
        start < position ? [start, position] : [position, start];
    if (left >= 1 || right <= 0) {
        return { isOutOfView: true };
    }
    if (left < 0) {
        left = 0;
    }
    if (right > 1) {
        right = 1;
    }
    return {
        isDraggingLeft: start > position,
        left: `${left * 100}%`,
        width: `${(right - left) * 100}%`,
    };
}

/**
 * Render the visual indication of the "next" view range.
 */
function getMarkers(
    viewStart: number,
    viewEnd: number,
    from: number,
    to: number,
    isShift: boolean
): React.ReactNode {
    const mappedFrom = mapToViewSubRange(viewStart, viewEnd, from);
    const mappedTo = mapToViewSubRange(viewStart, viewEnd, to);
    const layout = getNextViewLayout(mappedFrom, mappedTo);
    if (isOutOfView(layout)) {
        return null;
    }
    const { isDraggingLeft, left, width } = layout;
    //   const styles = getStyles();
    const cls = cx({
        [TimelineViewingLayerDraggedDraggingRight]: !isDraggingLeft,
        [TimelineViewingLayerDraggedReframeDrag]: !isShift,
        [TimelineViewingLayerDraggedShiftDrag]: isShift,
    });
    return (
        <div
            className={cx(
                TimelineViewingLayerDragged,
                TimelineViewingLayerDraggedDraggingLeft,
                cls
            )}
            style={{ left, width }}
            data-testid="Dragged"
        />
    );
}

/**
 * `TimelineViewingLayer` is rendered on top of the TimelineHeaderRow time
 * labels; it handles showing the current view range and handles mouse UX for
 * modifying it.
 */

const TimelineViewingLayer: React.FC<TimelineViewingLayerProps> = ({
    viewRangeTime,
    updateNextViewRangeTime,
    updateViewRangeTime,
    boundsInvalidator,
}) => {
    const [root, setRoot] = useState<Element | TNil>(null);
    const draggerReframe = useRef<DraggableManager | null>(null);

    useEffect(() => {
        draggerReframe.current = new DraggableManager({
            getBounds: getDraggingBounds,
            onDragEnd: handleReframeDragEnd,
            onDragMove: handleReframeDragUpdate,
            onDragStart: handleReframeDragUpdate,
            onMouseLeave: handleReframeMouseLeave,
            onMouseMove: handleReframeMouseMove,
        });

        return () => {
            if (draggerReframe.current) {
                draggerReframe.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (boundsInvalidator) {
            draggerReframe.current?.resetBounds();
        }
    }, [boundsInvalidator]);

    const getDraggingBounds = (): DraggableBounds => {
        if (!root) {
            throw new Error("Invalid state");
        }
        const { left: clientXLeft, width } = root.getBoundingClientRect();
        return { clientXLeft, width };
    };

    const handleReframeMouseMove = ({ value }: DraggingUpdate) => {
        const [viewStart, viewEnd] = viewRangeTime.current;
        const cursor = mapFromViewSubRange(viewStart, viewEnd, value);
        updateNextViewRangeTime({ cursor });
    };

    const handleReframeMouseLeave = () => {
        updateNextViewRangeTime({ cursor: undefined });
    };

    const handleReframeDragUpdate = ({ value }: DraggingUpdate) => {
        const { current, reframe } = viewRangeTime;
        const [viewStart, viewEnd] = current;
        const shift = mapFromViewSubRange(viewStart, viewEnd, value);
        const anchor = reframe ? reframe.anchor : shift;
        const update = { reframe: { anchor, shift } };
        updateNextViewRangeTime(update);
    };

    const handleReframeDragEnd = ({ manager, value }: DraggingUpdate) => {
        const { current, reframe } = viewRangeTime;
        const [viewStart, viewEnd] = current;
        const shift = mapFromViewSubRange(viewStart, viewEnd, value);
        const anchor = reframe ? reframe.anchor : shift;
        const [start, end] = shift < anchor ? [shift, anchor] : [anchor, shift];
        manager.resetBounds();
        updateViewRangeTime(start, end, "timeline-header");
    };

    const { current, cursor, reframe, shiftEnd, shiftStart } = viewRangeTime;
    const [viewStart, viewEnd] = current;
    const haveNextTimeRange =
        reframe != null || shiftEnd != null || shiftStart != null;
    let cursorPosition: string | TNil;
    if (
        !haveNextTimeRange &&
        cursor != null &&
        cursor >= viewStart &&
        cursor <= viewEnd
    ) {
        cursorPosition = `${
            mapToViewSubRange(viewStart, viewEnd, cursor) * 100
        }%`;
    }

    return (
        <TimelineViewingLayerStyled
            aria-hidden
            ref={(elm) => setRoot(elm)}
            onMouseDown={draggerReframe.current?.handleMouseDown}
            onMouseLeave={draggerReframe.current?.handleMouseLeave}
            onMouseMove={draggerReframe.current?.handleMouseMove}
            data-testid="TimelineViewingLayer"
        >
            {cursorPosition != null && (
                <TimelineViewingLayerCursorGuideStyled
                    style={{ left: cursorPosition }}
                    data-testid="TimelineViewingLayer--cursorGuide"
                />
            )}
            {reframe != null &&
                getMarkers(
                    viewStart,
                    viewEnd,
                    reframe.anchor,
                    reframe.shift,
                    false
                )}
            {shiftEnd != null &&
                getMarkers(viewStart, viewEnd, viewEnd, shiftEnd, true)}
            {shiftStart != null &&
                getMarkers(viewStart, viewEnd, viewStart, shiftStart, true)}
        </TimelineViewingLayerStyled>
    );
};

export default TimelineViewingLayer;
