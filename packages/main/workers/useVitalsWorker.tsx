import { useEffect } from "react";
import {reportWebVitals, flushQueue,handleVisibilityChange  } from '../helpers/webVitals'

export const useWebVitals = () => {
    useEffect(() => {
        // Queue Set
        const metricsQueue = new Set();
        reportWebVitals(metricsQueue)
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            flushQueue(metricsQueue);
        };
    }, []);
};
