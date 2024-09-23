import axios, { AxiosResponse } from "axios";

import { LOKI_WRITE, METRICS_WRITE, TEMPO_WRITE } from "./helper/webVitals";
import { v4 as uuidv4 } from "uuid";

interface PerformanceEntry {
  id?:string;
  name: string;
  startTime: number;
  duration: number;
  timestamp: number;
  type?:string;
  level?:string;
  method: string;
  url: string;
  status: number;
  value?: any;
  traceId?: string;
}

const performanceQueue: Set<PerformanceEntry> = new Set();

export async function flushPerformanceQueue() {
  if (performanceQueue.size === 0) return;

  const entries = Array.from(performanceQueue);

  // Format metrics
  const metricsData = entries
    .map(
      (entry) =>
        `http_request,method=${entry.method},type=${entry.type},status=${entry.status},level=${entry.level ?? "info"} duration=${Math.round(entry.duration)} ${entry.timestamp * 1000000}`,
    )
    .join("\n");

  // Format logs
  const logsData = JSON.stringify({
    streams: entries.map((entry) => ({
      stream: {
        level: entry.level ?? "info",
        job: "httpRequest",
        metricName:"http_request",
        metricLabel:"type",
        type: entry.type,
        duration: entry.duration,
        method: entry.method,
        url: entry.url,
        status: entry.status.toString(),
        traceId: entry.traceId,
      },
      values: [
        [
          String(String(entry.timestamp * 1000000)),
          `job="httpRequest" type=${entry.type} HTTP ${entry.method} ${entry.url} traceId=${entry.traceId} completed in ${entry.duration}ms with status ${entry.status} and duration ${entry.duration}`,
        ],
      ],
    })),
  });

  // Format traces
  const tracesData = entries.map((entry) => ({
    id: uuidv4().replace(/-/g, ""),
    traceId: entry.traceId,
    name: `HTTP-${entry.type}`,
    timestamp:Math.floor(entry.timestamp * 1000), // microseconds
    duration: Math.floor(entry.duration * 1000) , // microseconds
  
    tags: {
      "http.method": entry.method,
      "http.url": entry.url,
      "http.status_code": entry.status.toString(),
      "http.log_level": entry.level ?? "info",
    },
    localEndpoint: {
      serviceName: "httpClient",
    },
  }));

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



export function requestPerformance(
  config: any,
): Promise<AxiosResponse> {
  const startTime = performance.now();
  const timestamp = Date.now()
 
  return axios(config)
    .then((response) => {
      // filter in here if the interceptor is active
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      const traceId = uuidv4().replace(/-/g, "");

      // add timestamp in here

      console.log(startTime)

      const entry: PerformanceEntry = {
        traceId,
        name: `${config.method} ${config.url}`,
        type:config.type,
        timestamp,
        level:"info",
        startTime,
        duration,
        method: config.method?.toUpperCase() || "GET",
        url: config.url || "",
        status: response.status,
        
      };

      performanceQueue.add(entry);

      return response;
    })
    .catch((error) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      const timestamp = Date.now()
      const traceId = uuidv4().replace(/-/g, "");

      const entry: PerformanceEntry = {
        name: `${config.method} ${config.url} (failed)`,
        startTime,
        duration,
        timestamp,
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
