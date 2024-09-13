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
    const { active } = WebVitalsStore();

    useEffect(() => {
        // Queue Set
        const metricsQueue = new Set<QueueItem>();
        if (active) {
            reportWebVitals(metricsQueue, page);
        }

        return () => {
            if (active) {
                document.removeEventListener("visibilitychange", () =>
                    handleVisibilityChange(metricsQueue)
                );
                flushQueue(metricsQueue);
            }
        };
    }, []);
};
