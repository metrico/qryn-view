import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from "web-vitals";
import { v4 as uuidv4 } from "uuid";

const location = window.location;
const url = location.protocol + "//" + location.host;
export const LOKI_WRITE = url + "/loki/api/v1/push";
export const METRICS_WRITE = url + "/influx/api/v2/write";
export const TEMPO_WRITE = url + "/tempo/api/push";

export const MetricDescription = {
    CLS: "Cumulative Layout Shift",
    FID: "First Input Delay",
    FCP: "First Contentful Paint",
    INP: "Interaction to Next Paint",
    LCP: "Largest Contentful Paint",
    TTFB: "Time to First Byte",
};

export interface QueueItem {
    metric: Metric;
    page: string;
    traceId: string;
}

const formatWebVitalsMetrics = (queue_array: QueueItem[]) => {
    return queue_array
        .map(
            (item) =>
                `${item.metric.name},page=${item.page},rating=${item.metric.rating || "unknown"} value=${item.metric.value} ${Date.now() * 1000000}`
        )
        .join("\n");
};

const metrics_push = async (metrics_data: string): Promise<void> => {
    try {
        await fetch(METRICS_WRITE, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: metrics_data,
        });
    } catch (error) {
        console.error("Failed to push metrics:", error);
        throw error;
    }
};

const logs_push = async (logs_data: string) => {
    try {
        await fetch(LOKI_WRITE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: logs_data,
        });
    } catch (error) {
        console.error("Failed to push logs:", error);
        throw error;
    }
};

const format_logs_queue = (queue: QueueItem[]) => {
    const mapped = queue.map(({ metric, page, traceId }) => ({
        stream: {
            level: "info",
            job: "webVitals",
            name: metric.name,
            description:
                MetricDescription[
                    metric.name as keyof typeof MetricDescription
                ],
            value: metric.value.toString(),
            rating: metric.rating || "unknown",
            delta: metric.delta?.toString() || "N/A",
            traceId: traceId,
            page: page,
        },
        values: [
            [
                String(Date.now() * 1000000),
                `job=WebVitals name=${metric.name} description=${MetricDescription[metric.name as keyof typeof MetricDescription]} traceId=${traceId} page=${page} value=${metric.value} rating=${metric.rating || "unknown"} delta=${metric.delta?.toString() || "N/A"} entries=${JSON.stringify(metric.entries || [])}`,
            ],
        ],
    }));
    return JSON.stringify({ streams: mapped });
};

const format_metrics_queue = (queue: QueueItem[]): QueueItem[] => {
    return queue.map(({ metric, page, traceId }) => ({
        metric,
        page,
        traceId,
    }));
};

const createWebVitalSpan = (metric: any, page: string, traceId: string) => {
    const timestamp = Math.floor(Date.now() * 1000); // microseconds
    const parentId = uuidv4().replace(/-/g, "");

    const createChildSpan = (
        name: string,
        duration: number,
        traceId: string,
        parentId: string,
        startOffset: number,
        attributes?: Record<string, string>
    ) => {
        return {
            id: uuidv4().replace(/-/g, ""),
            traceId: traceId,
            parentId: parentId,
            name: name,
            timestamp:
                Math.floor(Date.now() * 1000) + Math.floor(startOffset * 1000),
            duration: Math.floor(duration * 1000),
            tags: {
                "web.vital.event": name,
                "web.vital.page": page,
                "web.vital.name": metric.name,
                "web.vital.description": metric.description,
                ...attributes,
            },
            localEndpoint: {
                serviceName: name,
            },
        };
    };

    const createTTFBParentSpan = (metric: any, page: string) => {
        const timestamp = Math.floor(Date.now() * 1000); // microseconds
        const entry: any = metric.entries?.[0];

        return {
            id: parentId,
            traceId: traceId,
            timestamp: timestamp,
            duration: Math.floor(entry.duration * 1000), // microseconds
            name: "TTFB",
            tags: {
                "http.method": "GET",
                "http.path": page,
                "web.vital.name": "TTFB",
                "web.vital.description": metric.description,
                "web.vital.value": metric.value.toString(),
                "web.vital.rating": metric.rating || "unknown",
                "web.vital.delta": metric.delta?.toString() || "N/A",

                // Additional TTFB-specific attributes
                "ttfb.fetch_time": (
                    entry.fetchStart - entry.navigationStart
                ).toString(),
                "ttfb.dns_time": (
                    entry.domainLookupEnd - entry.domainLookupStart
                ).toString(),
                "ttfb.connect_time": (
                    entry.connectEnd - entry.connectStart
                ).toString(),
                "ttfb.request_time": (
                    entry.responseStart - entry.requestStart
                ).toString(),
                "ttfb.response_time": (
                    entry.responseEnd - entry.responseStart
                ).toString(),

                "http.response_content_length":
                    entry.encodedBodySize.toString(),
                "http.response_transfer_size": entry.transferSize.toString(),
                "http.response_decoded_content_length":
                    entry.decodedBodySize.toString(),
                "http.status_code": entry.responseStatus.toString(),
                "network.protocol.name": entry.nextHopProtocol || "unknown",
                "network.protocol.version": entry.nextHopProtocol
                    ? entry.nextHopProtocol.split("/")[1]
                    : "unknown",
                "ttfb.initiatorType": entry.initiatorType,
                "ttfb.deliveryType": entry.deliveryType,
                "ttfb.renderBlockingStatus": entry.renderBlockingStatus,
                "ttfb.workerStart": entry.workerStart.toString(),
                "ttfb.redirectCount": entry.redirectCount.toString(),

                // Additional performance metrics
                "performance.domInteractive": entry.domInteractive.toString(),
                "performance.domContentLoadedEvent": (
                    entry.domContentLoadedEventEnd -
                    entry.domContentLoadedEventStart
                ).toString(),
                "performance.loadEvent": (
                    entry.loadEventEnd - entry.loadEventStart
                ).toString(),
            },
            localEndpoint: {
                serviceName: "Web Vitals",
            },
        };
    };

    let parentSpan: any = {
        id: parentId,
        traceId: traceId,
        timestamp: timestamp,
        duration: Math.floor(metric.value * 1000), // microseconds
        name: metric.name,
        tags: {
            "http.method": "GET",
            "http.path": page,
            "web.vital.name": metric.name,
            "web.vital.description": metric.description,
            "web.vital.value": metric.value.toString(),
            "web.vital.rating": metric.rating || "unknown",
            "web.vital.delta": metric.delta?.toString() || "N/A",
        },
        localEndpoint: {
            serviceName: "Web Vitals",
        },
    };

    let childSpans = [];

    if (metric.name === "TTFB") {
        parentSpan = createTTFBParentSpan(metric, page);

        const entry: any = metric.entries?.[0];
        if (entry) {
            const baseTime = entry.startTime;

            childSpans = [
                createChildSpan(
                    "Navigation Start",
                    entry.startTime,
                    traceId,
                    parentId,
                    entry.startTime,
                    { "ttfb.startTime": entry.startTime }
                ),
                createChildSpan(
                    "Fetch Start",
                    entry.fetchStart,
                    traceId,
                    parentId,
                    entry.fetchStart,
                    { "ttfb.fetchStart": entry.fetchStart }
                ),
                createChildSpan(
                    "Domain Lookup",
                    entry.domainLookupEnd - entry.domainLookupStart,
                    traceId,
                    parentId,
                    entry.domainLookupStart - baseTime,
                    {
                        "ttfb.domainLookupStart": entry.domainLookupStart,
                        "ttfb.domainLookupEnd": entry.domainLookupEnd,
                    }
                ),
                createChildSpan(
                    "Connect",
                    entry.connectEnd - entry.connectStart,
                    traceId,
                    parentId,
                    entry.connectStart - baseTime,
                    {
                        "ttfb.connectStart": entry.connectStart,
                        "ttfb.connectEnd": entry.connectEnd,
                    }
                ),
                createChildSpan(
                    "Request/Response",
                    entry.responseEnd - entry.requestStart,
                    traceId,
                    parentId,
                    entry.requestStart - baseTime,
                    {
                        "ttfb.requestStart": entry.requestStart,
                        "ttfb.requestEnd": entry.requestEnd,
                    }
                ),
                createChildSpan(
                    "Unload Event",
                    entry.unloadEventEnd - entry.unloadEventStart,
                    traceId,
                    parentId,
                    entry.unloadEventStart - baseTime,
                    {
                        "ttfb.unloadEventStart": entry.unloadEventStart,
                        "ttfb.unloadEventEnd": entry.unloadEventEnd,
                    }
                ),
                createChildSpan(
                    "DOM Interactive",
                    0,
                    traceId,
                    parentId,
                    entry.domInteractive - baseTime,
                    {
                        "ttfb.domInteractive": entry.domInteractive,
                    }
                ),
                createChildSpan(
                    "DOM Content Loaded",
                    entry.domContentLoadedEventEnd -
                        entry.domContentLoadedEventStart,
                    traceId,
                    parentId,
                    entry.domContentLoadedEventStart - baseTime,
                    {
                        "ttfb.domContentLoadedEventStart":
                            entry.domContentLoadedEventStart,
                        "ttfb.domContentLoadedEventEnd":
                            entry.domContentLoadedEventEnd,
                    }
                ),
                createChildSpan(
                    "DOM Complete",
                    0,
                    traceId,
                    parentId,
                    entry.domComplete - baseTime,
                    { "ttfb.domComplete": entry.domComplete }
                ),
                createChildSpan(
                    "Load Event",
                    entry.loadEventEnd - entry.loadEventStart,
                    traceId,
                    parentId,
                    entry.loadEventStart - baseTime,
                    {
                        "ttfb.loadEventStart": entry.loadEventStart,
                        "ttfb.loadEventEnd": entry.loadEventEnd,
                    }
                ),
            ];
        }
    }

    let spans = [parentSpan];

    if (Object.keys(childSpans)?.length > 0) {
        spans = [parentSpan, ...childSpans];
    }

    return spans;
};

const sendTraceData = async (spans: any[]) => {
    try {
        await fetch(TEMPO_WRITE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(spans),
        });
    } catch (error) {
        console.error("Error sending trace data:", error);
    }
};

export async function flushQueue(queue: Set<QueueItem>) {
    if (queue.size === 0) return;

    try {
        const queueArray = Array.from(queue);
        const logs_body = format_logs_queue(queueArray);
        const metricsQueue = format_metrics_queue(queueArray);
        const formattedMetrics = formatWebVitalsMetrics(metricsQueue);
        const allSpans = queueArray.flatMap(({ metric, page, traceId }) =>
            createWebVitalSpan(metric, page, traceId)
        );

        await Promise.all([
            metrics_push(formattedMetrics),
            logs_push(logs_body),
            sendTraceData(allSpans),
        ]);

        queue.clear();
    } catch (error) {
        console.error("Error flushing queue:", error);
    }
}

export const handleVisibilityChange = async (queue: Set<QueueItem>) => {
    if (document.visibilityState === "hidden") {
        await flushQueue(queue);
    }
};

export const reportWebVitals = (queue: Set<QueueItem>, page: string) => {
    const addToQueue = async (metric: any) => {
        const traceId = uuidv4().replace(/-/g, "");

        queue.add({ metric, page, traceId });
    };

    onCLS(addToQueue);
    onFCP(addToQueue);
    onINP(addToQueue);
    onLCP(addToQueue);
    onTTFB(addToQueue);

    addEventListener("visibilitychange", () => handleVisibilityChange(queue));
};
