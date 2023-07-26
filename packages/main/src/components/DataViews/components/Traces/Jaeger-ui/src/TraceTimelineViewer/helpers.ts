import { isEqual } from "lodash";
import memoizeOne from "memoize-one";

import { TraceSpan, Trace } from "../types/trace";

import DetailState from "./SpanDetail/DetailState";
import { TNil } from "../types";
import { createViewedBoundsFunc } from "./utils";


type RowState = {
    isDetail: boolean;
    span: TraceSpan;
    spanIndex: number;
};


// export for tests
export const DEFAULT_HEIGHTS = {
    bar: 28,
    detail: 161,
    detailWithLogs: 197,
};

export const NUM_TICKS = 5;

function generateRowStates(
    spans: TraceSpan[] | TNil,
    childrenHiddenIDs: Set<string>,
    detailStates: Map<string, DetailState | TNil>
): RowState[] {
    if (!spans) {
        return [];
    }
    let collapseDepth = null;
    const rowStates = [];
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const { spanID, depth } = span;
        let hidden = false;
        if (collapseDepth != null) {
            if (depth >= collapseDepth) {
                hidden = true;
            } else {
                collapseDepth = null;
            }
        }
        if (hidden) {
            continue;
        }
        if (childrenHiddenIDs.has(spanID)) {
            collapseDepth = depth + 1;
        }
        rowStates.push({
            span,
            isDetail: false,
            spanIndex: i,
        });
        if (detailStates.has(spanID)) {
            rowStates.push({
                span,
                isDetail: true,
                spanIndex: i,
            });
        }
    }
    return rowStates;
}

function getClipping(currentViewRange: [number, number]) {
    const [zoomStart, zoomEnd] = currentViewRange;
    return {
        left: zoomStart > 0,
        right: zoomEnd < 1,
    };
}

function generateRowStatesFromTrace(
    trace: Trace | TNil,
    childrenHiddenIDs: Set<string>,
    detailStates: Map<string, DetailState | TNil>
): RowState[] {
    return trace
        ? generateRowStates(trace.spans, childrenHiddenIDs, detailStates)
        : [];
}

export const memoizedGenerateRowStates = memoizeOne(generateRowStatesFromTrace);
export const memoizedViewBoundsFunc = memoizeOne(createViewedBoundsFunc, isEqual);
export const memoizedGetClipping = memoizeOne(getClipping, isEqual);
