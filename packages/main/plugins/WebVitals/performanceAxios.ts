import axios, { AxiosResponse } from "axios";

import { LOKI_WRITE, METRICS_WRITE, TEMPO_WRITE } from "./helper/webVitals";
import { v4 as uuidv4 } from "uuid";

interface PerformanceEntry {
  name: string;
  startTime: number;
  duration: number;
  type?:string;
  level?:string;
  method: string;
  url: string;
  status: number;
  traceId: string;
}

const performanceQueue: Set<PerformanceEntry> = new Set();

export async function flushPerformanceQueue() {
  if (performanceQueue.size === 0) return;

  const entries = Array.from(performanceQueue);

  // Format metrics
  const metricsData = entries
    .map(
      (entry) =>
        `http_request,method=${entry.method},type=${entry.type},status=${entry.status} duration=${Math.round(entry.duration)} ${Date.now() * 1000000}`,
    )
    .join("\n");

    console.log(metricsData)

  // Format logs
  const logsData = JSON.stringify({
    streams: entries.map((entry) => ({
      stream: {
        level: entry.level ?? "info",
        job: "httpRequest",
        metricName:"http_request",
        metricLabel:"type",
        type: entry.type,
        method: entry.method,
        url: entry.url,
        status: entry.status.toString(),
        traceId: entry.traceId,
      },
      values: [
        [
          String(Date.now() * 1000000),
          `HTTP ${entry.method} ${entry.url} completed in ${entry.duration}ms with status ${entry.status}`,
        ],
      ],
    })),
  });

  // Format traces
  const tracesData = entries.map((entry) => ({
    id: uuidv4().replace(/-/g, ""),
    traceId: entry.traceId,
    name: `HTTP ${entry.type}`,
    
    timestamp:Math.floor(Date.now() * 1000), // microseconds
    duration: Math.floor(entry.duration * 1000) , // microseconds
    tags: {
      "http.method": entry.method,
      "http.url": entry.url,
      "http.status_code": entry.status.toString(),
    },
    localEndpoint: {
      serviceName: "httpClient",
    },
  }));

  console.log(tracesData)

  try {
    await Promise.all([
      fetch(METRICS_WRITE, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: metricsData,
      }),
      fetch(LOKI_WRITE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: logsData,
      }),
      fetch(TEMPO_WRITE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tracesData),
      }),
    ]);
  } catch (error) {
    console.error("Error flushing performance queue:", error);
    
  }

  performanceQueue.clear();
}



export function performanceAxios(
  config: any,
): Promise<AxiosResponse> {
  const startTime = performance.now();
  const traceId = uuidv4().replace(/-/g, "");
console.log(config)
  return axios(config)
    .then((response) => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      const entry: PerformanceEntry = {
        name: `${config.method} ${config.url}`,
        type:config.type,
        level:"info",
        startTime,
        duration,
        method: config.method?.toUpperCase() || "GET",
        url: config.url || "",
        status: response.status,
        traceId,
      };

      performanceQueue.add(entry);

      return response;
    })
    .catch((error) => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      const entry: PerformanceEntry = {
        name: `${config.method} ${config.url} (failed)`,
        startTime,
        duration,
        type: config.type,
        level:'error',
        method: config.method?.toUpperCase() || "GET",
        url: config.url || "",
        status: error.response?.status || 0,
        traceId,
      };

      performanceQueue.add(entry);

      throw error;
    });
}
