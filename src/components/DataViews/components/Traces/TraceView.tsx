import React, { useCallback, useMemo, useState } from "react";

import { TracePageHeader, TraceTimelineViewer } from "./Jaeger-ui/src";
import { useDetailState } from "./useDetailState";
import { useViewRange } from "./useViewRange";
import { useChildrenState } from "./useChildrenState";
import { useHoverIndentGuide } from "./useHoverIntentGuide";
import { mapSpanFields, mapTracesResponse } from "./mapTracesResponse";
import { ViewHeader } from "../ViewHeader";
import { ViewStyled } from "./styled";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "../../../../theme";

function noop() /* : {} */ {
    return {};
}

export function TraceView(props: any) {
    const {
        viewRef,
        panelSize,
        viewHeight,
        setStreamClose,
        setMaxHeight,
        setMinimize,
        actualQuery,
        total,
        type,
    } = props;

    const { dataView } = props;
    const { data } = dataView;

    const tracePropMapped = useMemo(() => {
        return mapTracesResponse(data)[0];
    }, [data]);

    const theme = useTheme();
    const spanFieldsMapped = useMemo(() => {
        if (tracePropMapped?.spans?.length > 0) {
            const fields = mapSpanFields(tracePropMapped.spans);

            const fieldsMapped = {
                name: "Trace",
                refId: actualQuery?.idRef || "Traces",
                fields,
                length: fields?.length,
            };

            return fieldsMapped;
        }
        return null;
    }, [tracePropMapped, actualQuery]);

    const { traceProp } = { traceProp: { ...tracePropMapped } };
    /* { */

    const {
        removeHoverIndentGuideId,
        addHoverIndentGuideId,
        hoverIndentGuideIds,
    } = useHoverIndentGuide();
    const { viewRange, updateViewRangeTime, updateNextViewRangeTime } =
        useViewRange();
    const {
        expandOne,
        collapseOne,
        childrenToggle,
        collapseAll,
        childrenHiddenIDs,
        expandAll,
    } = useChildrenState();

    const {
        detailStates,
        toggleDetail,
        detailLogItemToggle,
        detailLogsToggle,
        detailEventsToggle,
        detailProcessToggle,
        detailReferencesToggle,
        detailReferenceItemToggle,
        detailTagsToggle,
        detailWarningsToggle,
        detailStackTracesToggle,
    } = useDetailState(spanFieldsMapped);

    const [slim, setSlim] = useState(false);
    const [spanNameColumnWidth, setSpanNameColumnWidth] = useState(0.25);
    const traceTimeline /* : TTraceTimeline  */ = useMemo(
        () => ({
            childrenHiddenIDs,
            detailStates,
            hoverIndentGuideIds,
            shouldScrollToFirstUiFindMatch: false,
            spanNameColumnWidth,
            traceID: /*props.*/ traceProp?.traceID,
        }),
        [
            childrenHiddenIDs,
            detailStates,
            hoverIndentGuideIds,
            spanNameColumnWidth,
            traceProp?.traceID,
        ]
    );
    const onSlimViewClicked = useCallback(() => setSlim(!slim), [slim]);

    if (spanFieldsMapped && tracePropMapped) {
        const styledProps = {
            ref: viewRef,
            size: panelSize,
            vheight: viewHeight,
            ...props,
        };

        return (
            <ThemeProvider theme={theme}>
                <ViewStyled {...styledProps}>
                    <ViewHeader
                        {...props}
                        onClose={setStreamClose}
                        setMinimize={setMinimize}
                        setMaxHeight={setMaxHeight}
                        actualQuery={actualQuery}
                        total={total}
                        type={type}
                    />
                    <div className="view-content">
                        <TracePageHeader
                            {...props}
                            canCollapse={false}
                            hideMap={false}
                            hideSummary={false}
                            theme={theme}
                            onSlimViewClicked={onSlimViewClicked}
                            onTraceGraphViewClicked={noop}
                            slimView={slim}
                            trace={traceProp}
                            updateNextViewRangeTime={updateNextViewRangeTime}
                            updateViewRangeTime={updateViewRangeTime}
                            viewRange={viewRange}

                            // timeZone={timeZone}
                        />
                        <TraceTimelineViewer
                            {...props}
                            theme={theme}
                            registerAccessors={noop}
                            scrollToFirstVisibleSpan={noop}
                            // findMatchesIDs={spanFindMatches}
                            trace={traceProp}
                            // datasourceType={datasourceType}
                            // spanBarOptions={spanBarOptions?.spanBar}
                            traceTimeline={traceTimeline}
                            updateNextViewRangeTime={updateNextViewRangeTime}
                            updateViewRangeTime={updateViewRangeTime}
                            viewRange={viewRange}
                            // timeZone={timeZone}
                            setSpanNameColumnWidth={setSpanNameColumnWidth}
                            collapseAll={collapseAll}
                            collapseOne={collapseOne}
                            expandAll={expandAll}
                            expandOne={expandOne}
                            childrenToggle={childrenToggle}
                            clearShouldScrollToFirstUiFindMatch={noop}
                            detailLogItemToggle={detailLogItemToggle}
                            detailLogsToggle={detailLogsToggle}
                            detailEventsToggle={detailEventsToggle}
                            detailWarningsToggle={detailWarningsToggle}
                            detailStackTracesToggle={detailStackTracesToggle}
                            detailReferencesToggle={detailReferencesToggle}
                            detailReferenceItemToggle={
                                detailReferenceItemToggle
                            }
                            detailProcessToggle={detailProcessToggle}
                            detailTagsToggle={detailTagsToggle}
                            detailToggle={toggleDetail}
                            setTrace={noop}
                            addHoverIndentGuideId={addHoverIndentGuideId}
                            removeHoverIndentGuideId={removeHoverIndentGuideId}
                            linksGetter={noop}
                            uiFind={props.search}
                            scrollElement={props.scrollElement}
                        />
                    </div>
                </ViewStyled>
            </ThemeProvider>
        );
    }
    return null;
}
