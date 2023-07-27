import cx from "classnames";
import memoizeOne from "memoize-one";
import React from "react";

import {
    TUpdateViewRangeTimeFunction,
    ViewRange,
    ViewRangeTimeUpdate,
} from "../..";
import { TraceSpan, Trace } from "../../types/trace";
import { ubPb2, ubPx2, ubRelative } from "../../uberUtilityStyles";

import CanvasSpanGraph from "./CanvasSpanGraph";
import TickLabels from "./TickLabels";
import ViewingLayer from "./ViewingLayer";

const DEFAULT_HEIGHT = 60;
const TIMELINE_TICK_INTERVAL = 4;

type SpanGraphProps = {
    height?: number;
    trace: Trace;
    viewRange: ViewRange;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    updateNextViewRangeTime: (nextUpdate: ViewRangeTimeUpdate) => void;
    theme: any;
};

type SpanItem = {
    valueOffset: number;
    valueWidth: number;
    serviceName: string;
};

function getItem(span: TraceSpan): SpanItem {
    return {
        valueOffset: span.relativeStartTime,
        valueWidth: span.duration,
        serviceName: span.process.serviceName,
    };
}

function getItems(trace: Trace): SpanItem[] {
    return trace.spans.map(getItem);
}

const memoizedGetitems = memoizeOne(getItems);

const SpanGraph: React.FC<SpanGraphProps> = (props) => {
    const {
        height,
        trace,
        viewRange,
        updateNextViewRangeTime,
        updateViewRangeTime,
    } = props;
    if (!trace) {
        return <div />;
    }

    const items = memoizedGetitems(trace);
    return (
        <div className={cx(ubPb2, ubPx2)}>
            <TickLabels
                theme={props.theme}
                numTicks={TIMELINE_TICK_INTERVAL}
                duration={trace.duration}
            />
            <div className={ubRelative}>
                <CanvasSpanGraph
                    {...props}
                    valueWidth={trace.duration}
                    items={items}
                />
                <ViewingLayer
                    theme={props.theme}
                    viewRange={viewRange}
                    numTicks={TIMELINE_TICK_INTERVAL}
                    height={height || DEFAULT_HEIGHT}
                    updateViewRangeTime={updateViewRangeTime}
                    updateNextViewRangeTime={updateNextViewRangeTime}
                />
            </div>
        </div>
    );
};

SpanGraph.defaultProps = {
    height: DEFAULT_HEIGHT,
};

export default SpanGraph;
