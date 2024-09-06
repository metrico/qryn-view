import { onLCP, onINP, onCLS, onFCP, onTTFB } from "web-vitals";

const location = window.location;
const url = location.protocol + "//" + location.host;
export const LOKI_WRITE = url + "/loki/api/v1/push";
export const METRICS_WRITE = url + "/influx/api/v2/write";

const formatWebVitalsMetrics = (queue_array) => {
    return queue_array
        .map(
            (item) =>
                `${item.metric},level=info,page=${item.page},rating=${item.rating} value=${item.value} ${item.timestamp}`
        )
        .join("\n");
};

const metrics_push = async (metrics_data: any) => {
    console.log(metrics_data);
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
// add page name to entry
const format_logs_queue = (queue: any) => {
    const mapped = Array.from(queue).map(({ metric, page }: any) => ({
        stream: {
            level: "info",
            job: "webVitals",
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            page: page ?? "",
        },
        values: [
            [
                String(Date.now() * 1000000),
                `job=WebVitals name=${metric.name} page=${page ?? ""} value=${metric.value} rating=${metric.rating} delta=${metric.delta} entries=${JSON.stringify(metric.entries)}`,
            ],
        ],
    }));
    if (Array.isArray(mapped) && mapped?.length > 0) {
        return JSON.stringify({ streams: [...mapped] });
    }
    return JSON.stringify({ streams: [] });
};
// add page name to entry
const format_metrics_queue = (queue) => {
    return Array.from(queue).map(({ metric, page }: any) => ({
        metric: metric.name,
        page: page ?? "",
        value: metric.value,
        delta: metric.delta,
        rating: metric.rating,
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
    console.log(queue);
    if (document.visibilityState === "hidden") {
        await flushQueue(queue);
    }
};

export const reportWebVitals = (queue, page) => {
    console.log(queue, page);
    function addToQueue(metric) {
        queue.add(metric);
    }
    onCLS((metric) => addToQueue({ metric, page }));
    onINP((metric) => addToQueue({ metric, page }));
    onFCP((metric) => addToQueue({ metric, page }));
    onTTFB((metric) => addToQueue({ metric, page }));
    onLCP((metric) => addToQueue({ metric, page }));

    addEventListener(
        "visibilitychange",
        async () => await handleVisibilityChange(queue)
    );
};
