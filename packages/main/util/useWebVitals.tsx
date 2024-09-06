import { useEffect } from "react";
import {reportWebVitals, flushQueue,handleVisibilityChange  } from './webVitals'

export type WebVitalsProps = {
  page?: string;
}

export const useWebVitals = ({page}:WebVitalsProps)  => {
    useEffect(() => {
        // Queue Set
        const metricsQueue = new Set();
        reportWebVitals(metricsQueue, page)
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            flushQueue(metricsQueue);
        };
    }, []);
};
