import React, { RefObject, useCallback, useMemo, useState } from "react";

import {
    SpanBarOptionsData,
    Trace,
    TracePageHeader,
    TraceTimelineViewer,
    TTraceTimeline,
} from "./Jaeger-ui/src";
import { useDetailState } from "./useDetailState";
import { useViewRange } from "./useViewRange";
import { useChildrenState } from "./useChildrenState";
import { useHoverIndentGuide } from "./useHoverIntentGuide";
import { mapSpanFields, mapTracesResponse } from "./mapTracesResponse";
import { ViewHeader } from "../ViewHeader";
import { ViewStyled } from "./styled";


function noop() /* : {} */ {
    return {};
}

export function TraceView(props: any) {
    
    const {
        viewRef,
        panelSize,
        viewHeight,
        onStreamClose,
        onMaximize,
        onMinimize,
        actualQuery,
        total,
        type,
        theight,
        tableData,
        viewWidth,
        limit,
        streamData,
    } = props;
    
    
    const { dataView } = props;
    const { id,  data } = dataView;

    const tracePropMapped = useMemo(() => {
       return mapTracesResponse(data)[0];
    }, [data]);

    const spanFieldsMapped = useMemo(()=>{
        if(tracePropMapped?.spans?.length > 0) {
     
            const fields =  mapSpanFields(tracePropMapped.spans) 

            const fieldsMapped = {
                name:"Trace",
                refId:actualQuery?.idRef || "Traces",
                fields,
                length:fields?.length
            }

            return fieldsMapped
        }
        return null
    },[tracePropMapped, actualQuery])


    const { traceProp } ={ traceProp : {...tracePropMapped} };
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
        detailProcessToggle,
        detailReferencesToggle,
        detailReferenceItemToggle,
        detailTagsToggle,
        detailWarningsToggle,
        detailStackTracesToggle,
    } = useDetailState( spanFieldsMapped

    );
    const [slim, setSlim] = useState(false);
    const [spanNameColumnWidth, setSpanNameColumnWidth] = useState(0.25);
    const traceTimeline /* : TTraceTimeline  */ = useMemo(
        () => ({
            childrenHiddenIDs,
            detailStates,
            hoverIndentGuideIds,
            shouldScrollToFirstUiFindMatch: false,
            spanNameColumnWidth,
            traceID: /*props.*/traceProp?.traceID,
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

    if( spanFieldsMapped  && tracePropMapped ) {


            const styledProps = {
                ref:viewRef,
                size:panelSize,
                vheight:viewHeight,
                ...props
            }

        return (
           <ViewStyled {...styledProps}>
              
              <ViewHeader
                    onClose={onStreamClose}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    actualQuery={actualQuery}
                    total={total}
                    type={type}
                    {...props}
                />
                <div className="view-content">
                <TracePageHeader
                    canCollapse={false}
                    hideMap={false}
                    hideSummary={false}
                    onSlimViewClicked={onSlimViewClicked}
                    onTraceGraphViewClicked={noop}
                    slimView={slim}
                    trace={traceProp}
                    updateNextViewRangeTime={updateNextViewRangeTime}
                    updateViewRangeTime={updateViewRangeTime}
                    viewRange={viewRange}
                    {...props}
                    // timeZone={timeZone}
                />
                <TraceTimelineViewer
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
                    detailWarningsToggle={detailWarningsToggle}
                    detailStackTracesToggle={detailStackTracesToggle}
                    detailReferencesToggle={detailReferencesToggle}
                    detailReferenceItemToggle={detailReferenceItemToggle}
                    detailProcessToggle={detailProcessToggle}
                    detailTagsToggle={detailTagsToggle}
                    detailToggle={toggleDetail}
                    setTrace={noop}
                    addHoverIndentGuideId={addHoverIndentGuideId}
                    removeHoverIndentGuideId={removeHoverIndentGuideId}
                    linksGetter={noop}
                    uiFind={props.search}
                    // createSpanLink={createSpanLink}
                    scrollElement={props.scrollElement}
                    // focusedSpanId={focusedSpanId}
                    // focusedSpanIdForSearch={props.focusedSpanIdForSearch!}
                    // createFocusSpanLink={createFocusSpanLink}
                    // topOfViewRef={topOfViewRef}
                    // topOfViewRefType={topOfViewRefType}
                    {...props}
                />
                </div>
            </ViewStyled>
        );
    }
return null
 
}
