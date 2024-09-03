import { onLCP, onINP, onCLS, onFCP, onTTFB } from "web-vitals";

const location = window.location;
const url = location.protocol + "//" + location.host;
export const LOKI_WRITE = url + "/loki/api/v1/push";
export const METRICS_WRITE = url + "/influx/api/v2/write";

const formatWebVitalsMetrics = (queue_array) => {
    return queue_array
        .map(
            (item) =>
                `${item.metric},level=info,rating=${item.rating} value=${item.value} ${item.timestamp}`
        )
        .join("\n");
};

const metrics_push = async (metrics_data: any) => {
    console.log(metrics_data)
    return await fetch(METRICS_WRITE, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: metrics_data,
    })
        .then((data) => {
            console.log(JSON.stringify(data));
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            console.log("sent metrics");
        });
};

const logs_push = async (logs_data: any) => {
    await fetch(LOKI_WRITE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: logs_data,
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e))
        .finally(() => {
            console.log("web vitals sent");
        });
};

const format_logs_queue = (queue: any) => {

    const mapped = Array.from(queue).map((entry: any) => ({
        stream: {
            level: "info",
            job: "webVitals",
            name: entry.name,
            value: entry.value,
            rating: entry.rating,
            delta: entry.delta,
        },
        values: [
            [
                String(Date.now() * 1000000),
                `job=WebVitals name=${entry.name} value=${entry.value} rating=${entry.rating} delta=${entry.delta} entries=${JSON.stringify(entry.entries)}`,
            ],
        ],
    }));
    if(Array.isArray(mapped) && mapped?.length > 0) {
        return JSON.stringify({ streams: [...mapped] });
    }
    return JSON.stringify({ streams: [] });
};

const format_metrics_queue = (queue) => {
    return Array.from(queue).map((entry: any) => ({
        metric: entry.name,
        value: entry.value,
        delta: entry.delta,
        rating: entry.rating,
        timestamp: Date.now() * 1_000_000,
    }));
};

export async function flushQueue(queue) {
    if (queue.size > 0) {
        const logs_body = format_logs_queue(queue);
        const queuearray = format_metrics_queue(queue);
        await metrics_push(formatWebVitalsMetrics(queuearray));
        await logs_push(logs_body);
        queue.clear();
    }
}

export const handleVisibilityChange = async (queue) => {
    if (document.visibilityState === "hidden") {
        await flushQueue(queue);
    }
};

export const reportWebVitals = (queue) => {
    function addToQueue(metric) {
        queue.add(metric);
    }
    onCLS(addToQueue);
    onINP(addToQueue);
    onFCP(addToQueue);
    onTTFB(addToQueue);
    onLCP(addToQueue);

    addEventListener(
        "visibilitychange",
        async () => await handleVisibilityChange(queue)
    );
};
