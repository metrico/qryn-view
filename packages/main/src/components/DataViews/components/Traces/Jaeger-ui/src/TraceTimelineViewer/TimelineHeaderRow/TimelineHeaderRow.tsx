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
import cx from "classnames";
import React from 'react';

import { ubFlex, ubPx2 } from "../../uberUtilityStyles";
import Ticks from "../Ticks";
import TimelineRow from "../TimelineRow";
import {
    TUpdateViewRangeTimeFunction,
    ViewRangeTime,
    ViewRangeTimeUpdate,
} from "../types";

import { TimelineCollapser } from "./TimelineCollapser";
import TimelineColumnResizer from "./TimelineColumnResizer";
import TimelineViewingLayer from "./TimelineViewingLayer";
const TimelineHeaderRowStyled = (theme: any) => css`
    background:${theme.background};
    border-bottom: 1px solid ${theme.accentNeutral};
    color:${theme.contrast}
    height: 38px;
    line-height: 38px;
    width: 100%;
    z-index: 4;
    position: relative;
    font-size:12px;
`;
const TimelineHeaderWrapper = css`
    align-items: center;
`;
const TimelineHeaderRowTitle = css`
    flex: 1;
    overflow: hidden;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

type TimelineHeaderRowProps = {
    theme: any;
    duration: number;
    nameColumnWidth: number;
    numTicks: number;
    onCollapseAll: () => void;
    onCollapseOne: () => void;
    onColummWidthChange: (width: number) => void;
    onExpandAll: () => void;
    onExpandOne: () => void;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRangeTime: ViewRangeTime;
    columnResizeHandleHeight: number;
};

export default function TimelineHeaderRow(props: TimelineHeaderRowProps) {
    const {
        duration,
        nameColumnWidth,
        numTicks,
        onCollapseAll,
        onCollapseOne,
        onColummWidthChange,
        onExpandAll,
        onExpandOne,
        updateViewRangeTime,
        updateNextViewRangeTime,
        viewRangeTime,
        columnResizeHandleHeight,
    } = props;
    const [viewStart, viewEnd] = viewRangeTime.current;
    //   const styles = useStyles2(getStyles);
    return (
        <TimelineRow
            theme={props.theme}
            className={TimelineHeaderRowStyled(props.theme)}
            data-testid="TimelineHeaderRow"
        >
            <TimelineRow.Cell
                theme={props.theme}
                className={cx(ubFlex, ubPx2, TimelineHeaderWrapper)}
                width={nameColumnWidth}
                id="collapser"
            >
                <h4 className={TimelineHeaderRowTitle}>
                    Service &amp; Operation
                </h4>
                <TimelineCollapser
                    theme={props.theme}
                    onCollapseAll={onCollapseAll}
                    onExpandAll={onExpandAll}
                    onCollapseOne={onCollapseOne}
                    onExpandOne={onExpandOne}
                />
            </TimelineRow.Cell>
            <TimelineRow.Cell
                theme={props.theme}
                id="ticker"
                width={1 - nameColumnWidth}
            >
                <TimelineViewingLayer
                    boundsInvalidator={nameColumnWidth}
                    updateNextViewRangeTime={updateNextViewRangeTime}
                    updateViewRangeTime={updateViewRangeTime}
                    viewRangeTime={viewRangeTime}
                />
                <Ticks
                    theme={props.theme}
                    numTicks={numTicks}
                    startTime={viewStart * duration}
                    endTime={viewEnd * duration}
                    showLabels
                />
            </TimelineRow.Cell>
            <TimelineColumnResizer
                columnResizeHandleHeight={columnResizeHandleHeight}
                position={nameColumnWidth}
                onChange={onColummWidthChange}
                min={0.2}
                max={0.85}
            />
        </TimelineRow>
    );
}
