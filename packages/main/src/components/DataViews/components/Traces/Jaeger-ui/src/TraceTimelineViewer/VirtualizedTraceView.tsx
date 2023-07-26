import { css } from "@emotion/css";

import React, { useState, useEffect, useRef } from "react";
import { RefObject } from "react";

import { Accessors } from "../ScrollManager";
import { PEER_SERVICE } from "../constants/tag-keys";
import { SpanBarOptions, SpanLinkFunc, TNil } from "../types";
import TTraceTimeline from "../types/TTraceTimeline";
import {
    TraceLog,
    TraceSpan,
    Trace,
    TraceKeyValuePair,
    TraceLink,
    TraceSpanReference,
} from "../types/trace";
import { getColorByKey } from "../utils/color-generator";

import ListView from "./ListView";
import SpanBarRow from "./SpanBarRow";

import SpanDetailRow from "./SpanDetailRow";
import {
    findServerChildSpan,
    isErrorSpan,
    isKindClient,
    spanContainsErredSpan,
    ViewedBoundsFunctionType,
} from "./utils";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styled from "@emotion/styled";
import {
    DEFAULT_HEIGHTS,
    NUM_TICKS,
    memoizedGenerateRowStates,
    memoizedViewBoundsFunc,
    memoizedGetClipping,
} from "./helpers";

type TExtractUiFindFromStateReturn = {
    uiFind: string | undefined;
};

const ScrollToTopButton = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1;
`;
const RowsWrapper = css`
    width: 100%;
`;
const Row = styled.div<{ theme: any }>`
    color: ${({ theme }: any) => theme.contrast};
    width: 100%;
`;



export enum TopOfViewRefType {
    Explore = "Explore",
    Panel = "Panel",
}

type TVirtualizedTraceViewOwnProps = {
    currentViewRangeTime: [number, number];
    //   timeZone: TimeZone;
    findMatchesIDs: Set<string> | TNil;
    scrollToFirstVisibleSpan: () => void;
    registerAccessors: (accesors: Accessors) => void;
    trace: Trace;
    spanBarOptions: SpanBarOptions | undefined;
    linksGetter: (
        span: TraceSpan,
        items: TraceKeyValuePair[],
        itemIndex: number
    ) => TraceLink[];
    childrenToggle: (spanID: string) => void;
    clearShouldScrollToFirstUiFindMatch: () => void;
    detailLogItemToggle: (spanID: string, log: TraceLog) => void;
    detailLogsToggle: (spanID: string) => void;
    detailEventsToggle: (spanID: string) => void;
    detailWarningsToggle: (spanID: string) => void;
    detailStackTracesToggle: (spanID: string) => void;
    detailReferencesToggle: (spanID: string) => void;
    detailReferenceItemToggle: (
        spanID: string,
        reference: TraceSpanReference
    ) => void;
    detailProcessToggle: (spanID: string) => void;
    detailTagsToggle: (spanID: string) => void;
    detailToggle: (spanID: string) => void;
    setSpanNameColumnWidth: (width: number) => void;
    setTrace: (trace: Trace | TNil, uiFind: string | TNil) => void;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    createSpanLink?: SpanLinkFunc;
    scrollElement?: Element;
    focusedSpanId?: string;
    focusedSpanIdForSearch: string;
    //   createFocusSpanLink: (traceId: string, spanId: string) => LinkModel;
    topOfViewRef?: RefObject<HTMLDivElement>;
    topOfViewRefType?: TopOfViewRefType;
    theme: any;
};

type VirtualizedTraceViewProps = TVirtualizedTraceViewOwnProps &
    TExtractUiFindFromStateReturn &
    TTraceTimeline;

const VirtualizedTraceView = React.memo((props: VirtualizedTraceViewProps) => {
    const [listView, setListView] = useState(null);
    const topTraceViewRef = useRef(null);

    useEffect(() => {
        const { setTrace, trace, uiFind } = props;
        setTrace(trace, uiFind);
    }, [props]);

    useEffect(() => {
        scrollToSpan(props.focusedSpanId);
    }, [props.focusedSpanId]);

    const scrollToSpan = (spanID) => {
        if (spanID == null || !listView) {
            return;
        }
        const i = getRowStates().findIndex((row) => row.span.spanID === spanID);
        if (i >= 0) {
            listView.scrollToIndex(i);
        }
    };

    useEffect(() => {
        const { registerAccessors, trace } = props;
        const {
            shouldScrollToFirstUiFindMatch,
            clearShouldScrollToFirstUiFindMatch,
            scrollToFirstVisibleSpan,
            registerAccessors: nextRegisterAccessors,
            setTrace,
            trace: nextTrace,
            uiFind,
            focusedSpanId,
            focusedSpanIdForSearch,
        } = props;

        if (trace !== nextTrace) {
            setTrace(nextTrace, uiFind);
        }

        if (listView && registerAccessors !== nextRegisterAccessors) {
            nextRegisterAccessors(getAccessors());
        }

        if (shouldScrollToFirstUiFindMatch) {
            scrollToFirstVisibleSpan();
            clearShouldScrollToFirstUiFindMatch();
        }

        if (focusedSpanId !== props.focusedSpanId) {
            scrollToSpan(focusedSpanId);
        }

        if (focusedSpanIdForSearch !== props.focusedSpanIdForSearch) {
            scrollToSpan(focusedSpanIdForSearch);
        }
    }, [props]);

    const getRowStates = () => {
        const { childrenHiddenIDs, detailStates, trace } = props;
        return memoizedGenerateRowStates(
            trace,
            childrenHiddenIDs,
            detailStates
        );
    };

    const renderRow = (key, style, index, attrs) => {
        const { isDetail, span, spanIndex } = getRowStates()[index];

        if (isDetail) {
            return renderSpanDetailRow(span, key, style, attrs);
        } else {
            return renderSpanBarRow(span, spanIndex, key, style, attrs);
        }
    };

    const getCollapsedChildren = () => props.childrenHiddenIDs;

    const getViewRange = () => {
        return props.currentViewRangeTime;
    };

    const getSearchedSpanIDs = () => {
        return props.findMatchesIDs;
    };

    const getClipping = () => {
        const { currentViewRangeTime } = props;
        return memoizedGetClipping(currentViewRangeTime);
    };

    const getKeyFromIndex = (index: number) => {
        const { isDetail, span } = getRowStates()[index];
        return `${span.traceID}--${span.spanID}--${
            isDetail ? "detail" : "bar"
        }`;
    };

    const setListViewRef = (ref) => {
        console.log(ref);
        if (ref) {
            setListView(ref);
        }

        const isChanged = listView !== ref;

        if (ref && isChanged && listView) {
            props.registerAccessors(getAccessors());
        }
    };

    const scrollToTop = () => {
        topTraceViewRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const mapRowIndexToSpanIndex = (index: number) =>
        getRowStates()[index].spanIndex;

    const mapSpanIndexToRowIndex = (index: number) => {
        const max = getRowStates().length;
        for (let i = 0; i < max; i++) {
            const { spanIndex } = getRowStates()[i];
            if (spanIndex === index) {
                return i;
            }
        }
        throw new Error(`unable to find row for span index: ${index}`);
    };

    function getViewedBounds(): ViewedBoundsFunctionType {
        const { currentViewRangeTime, trace } = props;
        const [zoomStart, zoomEnd] = currentViewRangeTime;

        return memoizedViewBoundsFunc({
            min: trace.startTime,
            max: trace.endTime,
            viewStart: zoomStart,
            viewEnd: zoomEnd,
        });
    }

    const getIndexFromKey = (key: string) => {
        const parts = key.split("--");
        const _traceID = parts[0];
        const _spanID = parts[1];
        const _isDetail = parts[2] === "detail";
        const max = getRowStates().length;
        for (let i = 0; i < max; i++) {
            const { span, isDetail } = getRowStates()[i];
            if (
                span.spanID === _spanID &&
                span.traceID === _traceID &&
                isDetail === _isDetail
            ) {
                return i;
            }
        }
        return -1;
    };

    const getAccessors = () => {
        const lv = listView;

        if (!lv) {
            console.log("ListView unavailable");
        }

        return {
            getViewRange: getViewRange,
            getSearchedSpanIDs: getSearchedSpanIDs,
            getCollapsedChildren: getCollapsedChildren,
            getViewHeight: lv.getViewHeight,
            getBottomRowIndexVisible: lv.getBottomVisibleIndex,
            getTopRowIndexVisible: lv.getTopVisibleIndex,
            getRowPosition: lv.getRowPosition,
            mapRowIndexToSpanIndex: mapRowIndexToSpanIndex,
            mapSpanIndexToRowIndex: mapSpanIndexToRowIndex,
        };
    };

    const getRowHeight = (index: number) => {
        const { span, isDetail } = getRowStates()[index];
        if (!isDetail) {
            return DEFAULT_HEIGHTS.bar;
        }
        if (Array.isArray(span.logs) && span.logs.length) {
            return DEFAULT_HEIGHTS.detailWithLogs;
        }
        return DEFAULT_HEIGHTS.detail;
    };

    const renderSpanBarRow = (
        span: TraceSpan,
        spanIndex: number,
        key: string,
        style: React.CSSProperties,
        attrs = {}
    ) => {
        const { spanID } = span;
        const { serviceName } = span.process;
        const {
            childrenHiddenIDs,
            childrenToggle,
            detailStates,
            detailToggle,
            findMatchesIDs,
            spanNameColumnWidth,
            trace,
            spanBarOptions,
            hoverIndentGuideIds,
            addHoverIndentGuideId,
            removeHoverIndentGuideId,
            createSpanLink,
            focusedSpanId,
            focusedSpanIdForSearch,
            theme,
        } = props;
        // to avert flow error
        if (!trace) {
            return null;
        }
        const color = getColorByKey(serviceName, theme);
        const isCollapsed = childrenHiddenIDs.has(spanID);
        const isDetailExpanded = detailStates.has(spanID);
        const isMatchingFilter = findMatchesIDs
            ? findMatchesIDs.has(spanID)
            : false;
        const isFocused =
            spanID === focusedSpanId || spanID === focusedSpanIdForSearch;
        const showErrorIcon =
            isErrorSpan(span) ||
            (isCollapsed && spanContainsErredSpan(trace.spans, spanIndex));

        // Check for direct child "server" span if the span is a "client" span.
        let rpc = null;
        if (isCollapsed) {
            const rpcSpan = findServerChildSpan(trace.spans.slice(spanIndex));
            if (rpcSpan) {
                const rpcViewBounds = getViewedBounds()(
                    rpcSpan.startTime,
                    rpcSpan.startTime + rpcSpan.duration
                );
                rpc = {
                    color: getColorByKey(rpcSpan.process.serviceName, theme),
                    operationName: rpcSpan.operationName,
                    serviceName: rpcSpan.process.serviceName,
                    viewEnd: rpcViewBounds.end,
                    viewStart: rpcViewBounds.start,
                };
            }
        }

        const peerServiceKV = span.tags.find((kv) => kv.key === PEER_SERVICE);
        let noInstrumentedServer = null;
        if (!span.hasChildren && peerServiceKV && isKindClient(span)) {
            noInstrumentedServer = {
                serviceName: peerServiceKV.value,
                color: getColorByKey(peerServiceKV.value, theme),
            };
        }

        return (
            <Row theme={theme} key={key} style={style} {...attrs}>
                <SpanBarRow
                    theme={theme}
                    clippingLeft={getClipping().left}
                    clippingRight={getClipping().right}
                    color={color}
                    spanBarOptions={spanBarOptions}
                    columnDivision={spanNameColumnWidth}
                    isChildrenExpanded={!isCollapsed}
                    isDetailExpanded={isDetailExpanded}
                    isMatchingFilter={isMatchingFilter}
                    isFocused={isFocused}
                    numTicks={NUM_TICKS}
                    onDetailToggled={detailToggle}
                    onChildrenToggled={childrenToggle}
                    rpc={rpc}
                    noInstrumentedServer={noInstrumentedServer}
                    showErrorIcon={showErrorIcon}
                    getViewedBounds={getViewedBounds()}
                    traceStartTime={trace.startTime}
                    span={span}
                    hoverIndentGuideIds={hoverIndentGuideIds}
                    addHoverIndentGuideId={addHoverIndentGuideId}
                    removeHoverIndentGuideId={removeHoverIndentGuideId}
                    createSpanLink={createSpanLink}
                />
            </Row>
        );
    };

    function renderSpanDetailRow(
        span: TraceSpan,
        key: string,
        style: React.CSSProperties,
        attrs = {}
    ) {
        const { spanID } = span;
        const { serviceName } = span.process;
        const {
            detailLogItemToggle,
            detailLogsToggle,
            detailEventsToggle,
            detailProcessToggle,
            detailReferencesToggle,
            detailReferenceItemToggle,
            detailWarningsToggle,
            detailStackTracesToggle,
            detailStates,
            detailTagsToggle,
            detailToggle,
            spanNameColumnWidth,
            trace,
            //   timeZone,
            hoverIndentGuideIds,
            addHoverIndentGuideId,
            removeHoverIndentGuideId,
            linksGetter,
            createSpanLink,
            focusedSpanId,
            //   createFocusSpanLink,
            topOfViewRefType,
            //   theme,
        } = props;
        const detailState = detailStates.get(spanID);
        if (!trace || !detailState) {
            return null;
        }
        const color = getColorByKey(serviceName, props.theme);
        return (
            <Row
                theme={props.theme}
                key={key}
                style={{ ...style, zIndex: 1 }}
                {...attrs}
            >
                <SpanDetailRow
                    theme={props.theme}
                    color={color}
                    columnDivision={spanNameColumnWidth}
                    onDetailToggled={detailToggle}
                    detailState={detailState}
                    linksGetter={linksGetter}
                    logItemToggle={detailLogItemToggle}
                    logsToggle={detailLogsToggle}
                    eventsToggle={detailEventsToggle}
                    processToggle={detailProcessToggle}
                    referenceItemToggle={detailReferenceItemToggle}
                    referencesToggle={detailReferencesToggle}
                    warningsToggle={detailWarningsToggle}
                    stackTracesToggle={detailStackTracesToggle}
                    span={span}
                    //   timeZone={timeZone}
                    tagsToggle={detailTagsToggle}
                    traceStartTime={trace.startTime}
                    hoverIndentGuideIds={hoverIndentGuideIds}
                    addHoverIndentGuideId={addHoverIndentGuideId}
                    removeHoverIndentGuideId={removeHoverIndentGuideId}
                    createSpanLink={createSpanLink}
                    focusedSpanId={focusedSpanId}
                    //   createFocusSpanLink={createFocusSpanLink}
                    topOfViewRefType={topOfViewRefType}
                />
            </Row>
        );
    }

    const {
        scrollElement,
        //topOfViewRef, // This should be passed as a prop to the topmost parent component using ref
        // ...rest
    } = props;

    return (
        <>
            <ListView
                ref={setListViewRef}
                dataLength={getRowStates().length}
                itemHeightGetter={getRowHeight}
                itemRenderer={renderRow}
                viewBuffer={50}
                viewBufferMin={50}
                itemsWrapperClassName={RowsWrapper}
                getKeyFromIndex={getKeyFromIndex}
                getIndexFromKey={getIndexFromKey}
                windowScroller={false}
                scrollElement={scrollElement}
            />
            <KeyboardArrowUpIcon
                className={ScrollToTopButton}
                onClick={scrollToTop}
            ></KeyboardArrowUpIcon>
        </>
    );
});

export default VirtualizedTraceView;
