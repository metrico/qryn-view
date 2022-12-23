import { TraceLog, TraceSpanReference } from "./Jaeger-ui/src/types/trace";
import { useCallback, useState, useEffect } from "react";

import { DetailState } from "./Jaeger-ui/src";

/**
 * Keeps state of the span detail. This means whether span details are open but also state of each detail subitem
 * like logs or tags.
 */
export function useDetailState(frame: any) {
    // console.trace()
    const [detailStates, setDetailStates] = useState(
        new Map<string, DetailState>()
    );

    // Clear detail state when new trace arrives
    // useEffect(() => {
    //     setDetailStates(new Map<string, DetailState>());
    // }, [frame, setDetailStates]);

    const toggleDetail = useCallback(
        function toggleDetail(spanID: string) {
            const newDetailStates = new Map(detailStates);
            if (newDetailStates.has(spanID)) {
                newDetailStates.delete(spanID);
            } else {
                newDetailStates.set(spanID, new DetailState());
            }
            setDetailStates(newDetailStates);
        },
        [detailStates]
    );

    const detailEventsItemToggle = useCallback(
        function detailEventsItemToggle(spanID:string, event: any) {
            const old = detailStates.get(spanID);
            if(!old){
                return;
            }
            const detailState = old.toggleEventItem(event);
            const newDetailStates = new Map(detailStates);
            newDetailStates.set(spanID, detailState);
            return setDetailStates(newDetailStates);
        },
        [detailStates]
    )

    const detailLogItemToggle = useCallback(
        function detailLogItemToggle(spanID: string, log: TraceLog) {
            const old = detailStates.get(spanID);
            if (!old) {
                return;
            }
            const detailState = old.toggleLogItem(log);
            const newDetailStates = new Map(detailStates);
            newDetailStates.set(spanID, detailState);
            return setDetailStates(newDetailStates);
        },
        [detailStates]
    );

    const detailReferenceItemToggle = useCallback(
        function detailReferenceItemToggle(
            spanID: string,
            reference: TraceSpanReference
        ) {
            const old = detailStates.get(spanID);
            if (!old) {
                return;
            }
            const detailState = old.toggleReferenceItem(reference);
            const newDetailStates = new Map(detailStates);
            newDetailStates.set(spanID, detailState);
            return setDetailStates(newDetailStates);
        },
        [detailStates]
    );

    return {
        detailStates,
        toggleDetail,
        detailLogItemToggle,
        detailLogsToggle: useCallback(
            (spanID: string) =>
                makeDetailSubsectionToggle(
                    "logs",
                    detailStates,
                    setDetailStates
                )(spanID),
            [detailStates]
        ),
        detailEventsItemToggle,
        detailEventsToggle: useCallback(
            (spanID: string) => 
            makeDetailSubsectionToggle(
                'events',
                detailStates,
                setDetailStates
            )(spanID),
            [detailStates]
        ),
        detailWarningsToggle: useCallback(
            (spanID: string) =>
                makeDetailSubsectionToggle(
                    "warnings",
                    detailStates,
                    setDetailStates
                )(spanID),
            [detailStates]
        ),
        detailStackTracesToggle: useCallback(
            (spanID: string) =>
                makeDetailSubsectionToggle(
                    "stackTraces",
                    detailStates,
                    setDetailStates
                )(spanID),
            [detailStates]
        ),
        detailReferenceItemToggle,
        detailReferencesToggle: useCallback(
            (spanID: string) =>
                makeDetailSubsectionToggle(
                    "references",
                    detailStates,
                    setDetailStates
                )(spanID),
            [detailStates]
        ),
        detailProcessToggle: useCallback(
            (spanID: string) =>
                makeDetailSubsectionToggle(
                    "process",
                    detailStates,
                    setDetailStates
                )(spanID),
            [detailStates]
        ),
        detailTagsToggle: useCallback(
            (spanID: string) =>
                makeDetailSubsectionToggle(
                    "tags",
                    detailStates,
                    setDetailStates
                )(spanID),
            [detailStates]
        ),
    };
}

function makeDetailSubsectionToggle(
    subSection:
        | "tags"
        | "process"
        | "logs"
        | "events"
        | "warnings"
        | "references"
        | "stackTraces",
    detailStates: Map<string, DetailState>,
    setDetailStates: (detailStates: Map<string, DetailState>) => void
) {
    return (spanID: string) => {
        const old = detailStates.get(spanID);
        if (!old) {
            return;
        }
        let detailState;
        if (subSection === "tags") {
            detailState = old.toggleTags();
        } else if (subSection === "process") {
            detailState = old.toggleProcess();
        }  else if (subSection === "events") {
            detailState = old.toggleEvents();
        } else if (subSection === "warnings") {
            detailState = old.toggleWarnings();
        } else if (subSection === "references") {
            detailState = old.toggleReferences();
        } else if (subSection === "stackTraces") {
            detailState = old.toggleStackTraces();
        } else {
            detailState = old.toggleLogs();
        }
        const newDetailStates = new Map(detailStates);
        newDetailStates.set(spanID, detailState);
        setDetailStates(newDetailStates);
    };
}
