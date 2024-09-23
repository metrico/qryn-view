import { useEffect } from "react";
import {
    flushQueue,
    handleVisibilityChange,
    reportWebVitals,
} from "./helper/webVitals";
import { QueueItem } from "./helper/webVitals";
import { WebVitalsStore } from "./store";

export type WebVitalsProps = {
    page?: string;
};

export const useWebVitals = ({ page }: WebVitalsProps) => {
    const { webVitalsActive } = WebVitalsStore();

    useEffect(() => {
        // Queue Set
        const metricsQueue = new Set<QueueItem>();
        if (webVitalsActive) {
            reportWebVitals(metricsQueue, page);
        }

        return () => {
            if (webVitalsActive) {
                document.removeEventListener("visibilitychange", () =>
                    handleVisibilityChange(metricsQueue)
                );
                flushQueue(metricsQueue);
            }
        };
    }, []);
};
