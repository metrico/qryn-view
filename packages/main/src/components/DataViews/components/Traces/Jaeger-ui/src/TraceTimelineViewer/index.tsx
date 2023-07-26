import React, {useState, useEffect} from 'react';


import { merge as mergeShortcuts } from "../keyboard-shortcuts";

import TimelineHeaderRow from "./TimelineHeaderRow";
import VirtualizedTraceView from "./VirtualizedTraceView";

import styled from "@emotion/styled";


const TraceTimelineViewer = styled.div<{theme:any}>`
    border-bottom: 1px solid ${({theme})=>theme.accentNeutral};

    & .json-markup {
        line-height: 17px;
        font-size: 13px;
        font-family: monospace;
        white-space: pre-wrap;
    }

    & .json-markup-key {
        font-weight: bold;
    }

    & .json-markup-bool {
        color: ${({theme})=>theme.contrast};
    }

    & .json-markup-string {
        color: ${({theme})=>theme.contrast};
        font-size:12px;
        font-family:monospace;
    }

    & .json-markup-null {
        color: ${({theme})=>theme.contrast};
    }

    & .json-markup-number {
        color: ${({theme})=>theme.contrast};
    }
`;



const NUM_TICKS = 5;

/**
 * `TraceTimelineViewer` now renders the header row because it is sensitive to
 * `props.viewRange.time.cursor`. If `VirtualizedTraceView` renders it, it will
 * re-render the ListView every time the cursor is moved on the trace minimap
 * or `TimelineHeaderRow`.
 */

 const UnthemedTraceTimelineViewer = (props) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        mergeShortcuts({
            collapseAll: collapseAll,
            expandAll: expandAll,
            collapseOne: collapseOne,
            expandOne: expandOne,
        });
    }, []);

    const collapseAll = () => {
        props.collapseAll(props.trace.spans);
    };

    const collapseOne = () => {
        props.collapseOne(props.trace.spans);
    };

    const expandAll = () => {
        props.expandAll();
    };

    const expandOne = () => {
        props.expandOne(props.trace.spans);
    };

    const {
        setSpanNameColumnWidth,
        updateNextViewRangeTime,
        updateViewRangeTime,
        viewRange,
        traceTimeline,
        topOfViewRef,
        focusedSpanIdForSearch,
        ...rest
    } = props;
    const { trace } = rest;

    return (
        <TraceTimelineViewer theme={props.theme}>
            <TimelineHeaderRow
                theme={props.theme}
                duration={trace.duration}
                nameColumnWidth={traceTimeline.spanNameColumnWidth}
                numTicks={NUM_TICKS}
                onCollapseAll={collapseAll}
                onCollapseOne={collapseOne}
                onColummWidthChange={setSpanNameColumnWidth}
                onExpandAll={expandAll}
                onExpandOne={expandOne}
                viewRangeTime={viewRange.time}
                updateNextViewRangeTime={updateNextViewRangeTime}
                updateViewRangeTime={updateViewRangeTime}
                columnResizeHandleHeight={height}
            />
            <VirtualizedTraceView
                {...rest}
                {...traceTimeline}
                setSpanNameColumnWidth={setSpanNameColumnWidth}
                currentViewRangeTime={viewRange.time.current}
                topOfViewRef={topOfViewRef}
                focusedSpanIdForSearch={focusedSpanIdForSearch}
            />
        </TraceTimelineViewer>
    );
};

export default UnthemedTraceTimelineViewer;



