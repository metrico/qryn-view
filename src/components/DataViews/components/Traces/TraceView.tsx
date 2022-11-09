import React, { RefObject, useCallback, useMemo, useState } from "react";

import {
    SpanBarOptionsData,
    Trace,
    TracePageHeader,
    TraceTimelineViewer,
    TTraceTimeline,
} from "./Jaeger-ui/src";
import { useDetailState } from "./useDetailState";
import { useViewRange } from './useViewRange';
import { useChildrenState } from './useChildrenState'
import { useHoverIndentGuide } from './useHoverIntentGuide'

function noop()/* : {} */ {
    return {};
}

export function TraceView(props: any) {
    console.log(props)
    const {
        traceProp,
    } = {
        traceProp: {
            "services": [
                {
                    "name": "dummy-server",
                    "numberOfSpans": 7
                }
            ],
            "spans": [
                {
                    "traceID": "35786c06eca0b8628799f6bc446aac5e",
                    "spanID": "def3f867e8dc85aa",
                    "parentSpanID": "",
                    "operationName": "request_received",
                    "serviceName": "dummy-server",
                    "serviceTags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ],
                    "startTime": 1667358877656393,
                    "duration": 200694,
                    "logs": [],
                    "references": [],
                    "tags": [
                        {
                            "value": "Dooku_salmon",
                            "key": "entity"
                        },
                        {
                            "value": "200",
                            "key": "http.status_code"
                        },
                        {
                            "value": "dummy-server",
                            "key": "job"
                        },
                        {
                            "value": "dummy-server",
                            "key": "name"
                        },
                        {
                            "value": "OK",
                            "key": "otel.status_code"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        },
                        {
                            "value": 0,
                            "key": "status.code"
                        },
                        {
                            "value": "nodejs",
                            "key": "telemetry.sdk.language"
                        },
                        {
                            "value": "opentelemetry",
                            "key": "telemetry.sdk.name"
                        },
                        {
                            "value": "1.5.0",
                            "key": "telemetry.sdk.version"
                        }
                    ],
                    "processID": "def3f867e8dc85aa",
                    "flags": 0,
                    "dataFrameRowIndex": 0,
                    "process": {
                        "serviceName": "dummy-server",
                        "tags": [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ]
                    },
                    "relativeStartTime": 0,
                    "depth": 0,
                    "hasChildren": true,
                    "childSpanCount": 4,
                    "warnings": []
                },
                {
                    "traceID": "35786c06eca0b8628799f6bc446aac5e",
                    "spanID": "4b1475833dcf1179",
                    "parentSpanID": "def3f867e8dc85aa",
                    "operationName": "log_to_loki",
                    "serviceName": "dummy-server",
                    "serviceTags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ],
                    "startTime": 1667358877656509,
                    "duration": 266519,
                    "logs": [],
                    "references": [
                        {
                            "refType": "CHILD_OF",
                            "spanID": "def3f867e8dc85aa",
                            "traceID": "35786c06eca0b8628799f6bc446aac5e",
                            "span": {
                                "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                "spanID": "def3f867e8dc85aa",
                                "parentSpanID": "",
                                "operationName": "request_received",
                                "serviceName": "dummy-server",
                                "serviceTags": [
                                    {
                                        "value": "qryn",
                                        "key": "collector"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    }
                                ],
                                "startTime": 1667358877656393,
                                "duration": 200694,
                                "logs": [],
                                "references": [],
                                "tags": [
                                    {
                                        "value": "Dooku_salmon",
                                        "key": "entity"
                                    },
                                    {
                                        "value": "200",
                                        "key": "http.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "job"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "name"
                                    },
                                    {
                                        "value": "OK",
                                        "key": "otel.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    },
                                    {
                                        "value": 0,
                                        "key": "status.code"
                                    },
                                    {
                                        "value": "nodejs",
                                        "key": "telemetry.sdk.language"
                                    },
                                    {
                                        "value": "opentelemetry",
                                        "key": "telemetry.sdk.name"
                                    },
                                    {
                                        "value": "1.5.0",
                                        "key": "telemetry.sdk.version"
                                    }
                                ],
                                "processID": "def3f867e8dc85aa",
                                "flags": 0,
                                "dataFrameRowIndex": 0,
                                "process": {
                                    "serviceName": "dummy-server",
                                    "tags": [
                                        {
                                            "value": "qryn",
                                            "key": "collector"
                                        },
                                        {
                                            "value": "dummy-server",
                                            "key": "service.name"
                                        }
                                    ]
                                },
                                "relativeStartTime": 0,
                                "depth": 0,
                                "hasChildren": true,
                                "childSpanCount": 4,
                                "warnings": []
                            }
                        }
                    ],
                    "tags": [
                        {
                            "value": "dummy-server",
                            "key": "name"
                        },
                        {
                            "value": "OK",
                            "key": "otel.status_code"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        },
                        {
                            "value": 0,
                            "key": "status.code"
                        },
                        {
                            "value": "nodejs",
                            "key": "telemetry.sdk.language"
                        },
                        {
                            "value": "opentelemetry",
                            "key": "telemetry.sdk.name"
                        },
                        {
                            "value": "1.5.0",
                            "key": "telemetry.sdk.version"
                        }
                    ],
                    "processID": "4b1475833dcf1179",
                    "flags": 0,
                    "dataFrameRowIndex": 1,
                    "process": {
                        "serviceName": "dummy-server",
                        "tags": [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ]
                    },
                    "relativeStartTime": 116,
                    "depth": 1,
                    "hasChildren": false,
                    "childSpanCount": 0,
                    "warnings": []
                },
                {
                    "traceID": "35786c06eca0b8628799f6bc446aac5e",
                    "spanID": "e35b9b2b1d644387",
                    "parentSpanID": "def3f867e8dc85aa",
                    "operationName": "request_processed",
                    "serviceName": "dummy-server",
                    "serviceTags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ],
                    "startTime": 1667358877656775,
                    "duration": 7641,
                    "logs": [],
                    "references": [
                        {
                            "refType": "CHILD_OF",
                            "spanID": "def3f867e8dc85aa",
                            "traceID": "35786c06eca0b8628799f6bc446aac5e",
                            "span": {
                                "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                "spanID": "def3f867e8dc85aa",
                                "parentSpanID": "",
                                "operationName": "request_received",
                                "serviceName": "dummy-server",
                                "serviceTags": [
                                    {
                                        "value": "qryn",
                                        "key": "collector"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    }
                                ],
                                "startTime": 1667358877656393,
                                "duration": 200694,
                                "logs": [],
                                "references": [],
                                "tags": [
                                    {
                                        "value": "Dooku_salmon",
                                        "key": "entity"
                                    },
                                    {
                                        "value": "200",
                                        "key": "http.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "job"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "name"
                                    },
                                    {
                                        "value": "OK",
                                        "key": "otel.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    },
                                    {
                                        "value": 0,
                                        "key": "status.code"
                                    },
                                    {
                                        "value": "nodejs",
                                        "key": "telemetry.sdk.language"
                                    },
                                    {
                                        "value": "opentelemetry",
                                        "key": "telemetry.sdk.name"
                                    },
                                    {
                                        "value": "1.5.0",
                                        "key": "telemetry.sdk.version"
                                    }
                                ],
                                "processID": "def3f867e8dc85aa",
                                "flags": 0,
                                "dataFrameRowIndex": 0,
                                "process": {
                                    "serviceName": "dummy-server",
                                    "tags": [
                                        {
                                            "value": "qryn",
                                            "key": "collector"
                                        },
                                        {
                                            "value": "dummy-server",
                                            "key": "service.name"
                                        }
                                    ]
                                },
                                "relativeStartTime": 0,
                                "depth": 0,
                                "hasChildren": true,
                                "childSpanCount": 4,
                                "warnings": []
                            }
                        }
                    ],
                    "tags": [
                        {
                            "value": "GET",
                            "key": "http.method"
                        },
                        {
                            "value": "/login",
                            "key": "http.target"
                        },
                        {
                            "value": "dummy-server",
                            "key": "job"
                        },
                        {
                            "value": "dummy-server",
                            "key": "name"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        },
                        {
                            "value": 0,
                            "key": "status.code"
                        },
                        {
                            "value": "nodejs",
                            "key": "telemetry.sdk.language"
                        },
                        {
                            "value": "opentelemetry",
                            "key": "telemetry.sdk.name"
                        },
                        {
                            "value": "1.5.0",
                            "key": "telemetry.sdk.version"
                        }
                    ],
                    "processID": "e35b9b2b1d644387",
                    "flags": 0,
                    "dataFrameRowIndex": 2,
                    "process": {
                        "serviceName": "dummy-server",
                        "tags": [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ]
                    },
                    "relativeStartTime": 382,
                    "depth": 1,
                    "hasChildren": false,
                    "childSpanCount": 0,
                    "warnings": []
                },
                {
                    "traceID": "35786c06eca0b8628799f6bc446aac5e",
                    "spanID": "7a5193116c2980ff",
                    "parentSpanID": "def3f867e8dc85aa",
                    "operationName": "data_request",
                    "serviceName": "dummy-server",
                    "serviceTags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ],
                    "startTime": 1667358877664779,
                    "duration": 170545,
                    "logs": [],
                    "references": [
                        {
                            "refType": "CHILD_OF",
                            "spanID": "def3f867e8dc85aa",
                            "traceID": "35786c06eca0b8628799f6bc446aac5e",
                            "span": {
                                "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                "spanID": "def3f867e8dc85aa",
                                "parentSpanID": "",
                                "operationName": "request_received",
                                "serviceName": "dummy-server",
                                "serviceTags": [
                                    {
                                        "value": "qryn",
                                        "key": "collector"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    }
                                ],
                                "startTime": 1667358877656393,
                                "duration": 200694,
                                "logs": [],
                                "references": [],
                                "tags": [
                                    {
                                        "value": "Dooku_salmon",
                                        "key": "entity"
                                    },
                                    {
                                        "value": "200",
                                        "key": "http.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "job"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "name"
                                    },
                                    {
                                        "value": "OK",
                                        "key": "otel.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    },
                                    {
                                        "value": 0,
                                        "key": "status.code"
                                    },
                                    {
                                        "value": "nodejs",
                                        "key": "telemetry.sdk.language"
                                    },
                                    {
                                        "value": "opentelemetry",
                                        "key": "telemetry.sdk.name"
                                    },
                                    {
                                        "value": "1.5.0",
                                        "key": "telemetry.sdk.version"
                                    }
                                ],
                                "processID": "def3f867e8dc85aa",
                                "flags": 0,
                                "dataFrameRowIndex": 0,
                                "process": {
                                    "serviceName": "dummy-server",
                                    "tags": [
                                        {
                                            "value": "qryn",
                                            "key": "collector"
                                        },
                                        {
                                            "value": "dummy-server",
                                            "key": "service.name"
                                        }
                                    ]
                                },
                                "relativeStartTime": 0,
                                "depth": 0,
                                "hasChildren": true,
                                "childSpanCount": 4,
                                "warnings": []
                            }
                        }
                    ],
                    "tags": [
                        {
                            "value": "GET",
                            "key": "http.method"
                        },
                        {
                            "value": "/login",
                            "key": "http.target"
                        },
                        {
                            "value": "dummy-server",
                            "key": "job"
                        },
                        {
                            "value": "dummy-server",
                            "key": "name"
                        },
                        {
                            "value": "OK",
                            "key": "otel.status_code"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        },
                        {
                            "value": 0,
                            "key": "status.code"
                        },
                        {
                            "value": "nodejs",
                            "key": "telemetry.sdk.language"
                        },
                        {
                            "value": "opentelemetry",
                            "key": "telemetry.sdk.name"
                        },
                        {
                            "value": "1.5.0",
                            "key": "telemetry.sdk.version"
                        }
                    ],
                    "processID": "7a5193116c2980ff",
                    "flags": 0,
                    "dataFrameRowIndex": 3,
                    "process": {
                        "serviceName": "dummy-server",
                        "tags": [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ]
                    },
                    "relativeStartTime": 8386,
                    "depth": 1,
                    "hasChildren": true,
                    "childSpanCount": 2,
                    "warnings": []
                },
                {
                    "traceID": "35786c06eca0b8628799f6bc446aac5e",
                    "spanID": "1b7f8a1afffc9311",
                    "parentSpanID": "7a5193116c2980ff",
                    "operationName": "cache_lookup",
                    "serviceName": "dummy-server",
                    "serviceTags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ],
                    "startTime": 1667358877664800,
                    "duration": 34151,
                    "logs": [],
                    "references": [
                        {
                            "refType": "CHILD_OF",
                            "spanID": "7a5193116c2980ff",
                            "traceID": "35786c06eca0b8628799f6bc446aac5e",
                            "span": {
                                "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                "spanID": "7a5193116c2980ff",
                                "parentSpanID": "def3f867e8dc85aa",
                                "operationName": "data_request",
                                "serviceName": "dummy-server",
                                "serviceTags": [
                                    {
                                        "value": "qryn",
                                        "key": "collector"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    }
                                ],
                                "startTime": 1667358877664779,
                                "duration": 170545,
                                "logs": [],
                                "references": [
                                    {
                                        "refType": "CHILD_OF",
                                        "spanID": "def3f867e8dc85aa",
                                        "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                        "span": {
                                            "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                            "spanID": "def3f867e8dc85aa",
                                            "parentSpanID": "",
                                            "operationName": "request_received",
                                            "serviceName": "dummy-server",
                                            "serviceTags": [
                                                {
                                                    "value": "qryn",
                                                    "key": "collector"
                                                },
                                                {
                                                    "value": "dummy-server",
                                                    "key": "service.name"
                                                }
                                            ],
                                            "startTime": 1667358877656393,
                                            "duration": 200694,
                                            "logs": [],
                                            "references": [],
                                            "tags": [
                                                {
                                                    "value": "Dooku_salmon",
                                                    "key": "entity"
                                                },
                                                {
                                                    "value": "200",
                                                    "key": "http.status_code"
                                                },
                                                {
                                                    "value": "dummy-server",
                                                    "key": "job"
                                                },
                                                {
                                                    "value": "dummy-server",
                                                    "key": "name"
                                                },
                                                {
                                                    "value": "OK",
                                                    "key": "otel.status_code"
                                                },
                                                {
                                                    "value": "dummy-server",
                                                    "key": "service.name"
                                                },
                                                {
                                                    "value": 0,
                                                    "key": "status.code"
                                                },
                                                {
                                                    "value": "nodejs",
                                                    "key": "telemetry.sdk.language"
                                                },
                                                {
                                                    "value": "opentelemetry",
                                                    "key": "telemetry.sdk.name"
                                                },
                                                {
                                                    "value": "1.5.0",
                                                    "key": "telemetry.sdk.version"
                                                }
                                            ],
                                            "processID": "def3f867e8dc85aa",
                                            "flags": 0,
                                            "dataFrameRowIndex": 0,
                                            "process": {
                                                "serviceName": "dummy-server",
                                                "tags": [
                                                    {
                                                        "value": "qryn",
                                                        "key": "collector"
                                                    },
                                                    {
                                                        "value": "dummy-server",
                                                        "key": "service.name"
                                                    }
                                                ]
                                            },
                                            "relativeStartTime": 0,
                                            "depth": 0,
                                            "hasChildren": true,
                                            "childSpanCount": 4,
                                            "warnings": []
                                        }
                                    }
                                ],
                                "tags": [
                                    {
                                        "value": "GET",
                                        "key": "http.method"
                                    },
                                    {
                                        "value": "/login",
                                        "key": "http.target"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "job"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "name"
                                    },
                                    {
                                        "value": "OK",
                                        "key": "otel.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    },
                                    {
                                        "value": 0,
                                        "key": "status.code"
                                    },
                                    {
                                        "value": "nodejs",
                                        "key": "telemetry.sdk.language"
                                    },
                                    {
                                        "value": "opentelemetry",
                                        "key": "telemetry.sdk.name"
                                    },
                                    {
                                        "value": "1.5.0",
                                        "key": "telemetry.sdk.version"
                                    }
                                ],
                                "processID": "7a5193116c2980ff",
                                "flags": 0,
                                "dataFrameRowIndex": 3,
                                "process": {
                                    "serviceName": "dummy-server",
                                    "tags": [
                                        {
                                            "value": "qryn",
                                            "key": "collector"
                                        },
                                        {
                                            "value": "dummy-server",
                                            "key": "service.name"
                                        }
                                    ]
                                },
                                "relativeStartTime": 8386,
                                "depth": 1,
                                "hasChildren": true,
                                "childSpanCount": 2,
                                "warnings": []
                            }
                        }
                    ],
                    "tags": [
                        {
                            "value": "false",
                            "key": "cache.hit"
                        },
                        {
                            "value": "Dooku_salmon",
                            "key": "entity"
                        },
                        {
                            "value": "GET",
                            "key": "http.method"
                        },
                        {
                            "value": "/login",
                            "key": "http.target"
                        },
                        {
                            "value": "dummy-server",
                            "key": "job"
                        },
                        {
                            "value": "dummy-server",
                            "key": "name"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        },
                        {
                            "value": 0,
                            "key": "status.code"
                        },
                        {
                            "value": "nodejs",
                            "key": "telemetry.sdk.language"
                        },
                        {
                            "value": "opentelemetry",
                            "key": "telemetry.sdk.name"
                        },
                        {
                            "value": "1.5.0",
                            "key": "telemetry.sdk.version"
                        }
                    ],
                    "processID": "1b7f8a1afffc9311",
                    "flags": 0,
                    "dataFrameRowIndex": 4,
                    "process": {
                        "serviceName": "dummy-server",
                        "tags": [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ]
                    },
                    "relativeStartTime": 8407,
                    "depth": 2,
                    "hasChildren": false,
                    "childSpanCount": 0,
                    "warnings": []
                },
                {
                    "traceID": "35786c06eca0b8628799f6bc446aac5e",
                    "spanID": "4b614b3e777314c0",
                    "parentSpanID": "7a5193116c2980ff",
                    "operationName": "request_processed",
                    "serviceName": "dummy-server",
                    "serviceTags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ],
                    "startTime": 1667358877699435,
                    "duration": 135473,
                    "logs": [],
                    "references": [
                        {
                            "refType": "CHILD_OF",
                            "spanID": "7a5193116c2980ff",
                            "traceID": "35786c06eca0b8628799f6bc446aac5e",
                            "span": {
                                "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                "spanID": "7a5193116c2980ff",
                                "parentSpanID": "def3f867e8dc85aa",
                                "operationName": "data_request",
                                "serviceName": "dummy-server",
                                "serviceTags": [
                                    {
                                        "value": "qryn",
                                        "key": "collector"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    }
                                ],
                                "startTime": 1667358877664779,
                                "duration": 170545,
                                "logs": [],
                                "references": [
                                    {
                                        "refType": "CHILD_OF",
                                        "spanID": "def3f867e8dc85aa",
                                        "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                        "span": {
                                            "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                            "spanID": "def3f867e8dc85aa",
                                            "parentSpanID": "",
                                            "operationName": "request_received",
                                            "serviceName": "dummy-server",
                                            "serviceTags": [
                                                {
                                                    "value": "qryn",
                                                    "key": "collector"
                                                },
                                                {
                                                    "value": "dummy-server",
                                                    "key": "service.name"
                                                }
                                            ],
                                            "startTime": 1667358877656393,
                                            "duration": 200694,
                                            "logs": [],
                                            "references": [],
                                            "tags": [
                                                {
                                                    "value": "Dooku_salmon",
                                                    "key": "entity"
                                                },
                                                {
                                                    "value": "200",
                                                    "key": "http.status_code"
                                                },
                                                {
                                                    "value": "dummy-server",
                                                    "key": "job"
                                                },
                                                {
                                                    "value": "dummy-server",
                                                    "key": "name"
                                                },
                                                {
                                                    "value": "OK",
                                                    "key": "otel.status_code"
                                                },
                                                {
                                                    "value": "dummy-server",
                                                    "key": "service.name"
                                                },
                                                {
                                                    "value": 0,
                                                    "key": "status.code"
                                                },
                                                {
                                                    "value": "nodejs",
                                                    "key": "telemetry.sdk.language"
                                                },
                                                {
                                                    "value": "opentelemetry",
                                                    "key": "telemetry.sdk.name"
                                                },
                                                {
                                                    "value": "1.5.0",
                                                    "key": "telemetry.sdk.version"
                                                }
                                            ],
                                            "processID": "def3f867e8dc85aa",
                                            "flags": 0,
                                            "dataFrameRowIndex": 0,
                                            "process": {
                                                "serviceName": "dummy-server",
                                                "tags": [
                                                    {
                                                        "value": "qryn",
                                                        "key": "collector"
                                                    },
                                                    {
                                                        "value": "dummy-server",
                                                        "key": "service.name"
                                                    }
                                                ]
                                            },
                                            "relativeStartTime": 0,
                                            "depth": 0,
                                            "hasChildren": true,
                                            "childSpanCount": 4,
                                            "warnings": []
                                        }
                                    }
                                ],
                                "tags": [
                                    {
                                        "value": "GET",
                                        "key": "http.method"
                                    },
                                    {
                                        "value": "/login",
                                        "key": "http.target"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "job"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "name"
                                    },
                                    {
                                        "value": "OK",
                                        "key": "otel.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    },
                                    {
                                        "value": 0,
                                        "key": "status.code"
                                    },
                                    {
                                        "value": "nodejs",
                                        "key": "telemetry.sdk.language"
                                    },
                                    {
                                        "value": "opentelemetry",
                                        "key": "telemetry.sdk.name"
                                    },
                                    {
                                        "value": "1.5.0",
                                        "key": "telemetry.sdk.version"
                                    }
                                ],
                                "processID": "7a5193116c2980ff",
                                "flags": 0,
                                "dataFrameRowIndex": 3,
                                "process": {
                                    "serviceName": "dummy-server",
                                    "tags": [
                                        {
                                            "value": "qryn",
                                            "key": "collector"
                                        },
                                        {
                                            "value": "dummy-server",
                                            "key": "service.name"
                                        }
                                    ]
                                },
                                "relativeStartTime": 8386,
                                "depth": 1,
                                "hasChildren": true,
                                "childSpanCount": 2,
                                "warnings": []
                            }
                        }
                    ],
                    "tags": [
                        {
                            "value": "dummy-server",
                            "key": "job"
                        },
                        {
                            "value": "dummy-server",
                            "key": "name"
                        },
                        {
                            "value": "OK",
                            "key": "otel.status_code"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        },
                        {
                            "value": 0,
                            "key": "status.code"
                        },
                        {
                            "value": "nodejs",
                            "key": "telemetry.sdk.language"
                        },
                        {
                            "value": "opentelemetry",
                            "key": "telemetry.sdk.name"
                        },
                        {
                            "value": "1.5.0",
                            "key": "telemetry.sdk.version"
                        }
                    ],
                    "processID": "4b614b3e777314c0",
                    "flags": 0,
                    "dataFrameRowIndex": 5,
                    "process": {
                        "serviceName": "dummy-server",
                        "tags": [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ]
                    },
                    "relativeStartTime": 43042,
                    "depth": 2,
                    "hasChildren": false,
                    "childSpanCount": 0,
                    "warnings": []
                },
                {
                    "traceID": "35786c06eca0b8628799f6bc446aac5e",
                    "spanID": "a12f0135dad9bea0",
                    "parentSpanID": "def3f867e8dc85aa",
                    "operationName": "request_response",
                    "serviceName": "dummy-server",
                    "serviceTags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ],
                    "startTime": 1667358877835671.2,
                    "duration": 21051,
                    "logs": [],
                    "references": [
                        {
                            "refType": "CHILD_OF",
                            "spanID": "def3f867e8dc85aa",
                            "traceID": "35786c06eca0b8628799f6bc446aac5e",
                            "span": {
                                "traceID": "35786c06eca0b8628799f6bc446aac5e",
                                "spanID": "def3f867e8dc85aa",
                                "parentSpanID": "",
                                "operationName": "request_received",
                                "serviceName": "dummy-server",
                                "serviceTags": [
                                    {
                                        "value": "qryn",
                                        "key": "collector"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    }
                                ],
                                "startTime": 1667358877656393,
                                "duration": 200694,
                                "logs": [],
                                "references": [],
                                "tags": [
                                    {
                                        "value": "Dooku_salmon",
                                        "key": "entity"
                                    },
                                    {
                                        "value": "200",
                                        "key": "http.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "job"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "name"
                                    },
                                    {
                                        "value": "OK",
                                        "key": "otel.status_code"
                                    },
                                    {
                                        "value": "dummy-server",
                                        "key": "service.name"
                                    },
                                    {
                                        "value": 0,
                                        "key": "status.code"
                                    },
                                    {
                                        "value": "nodejs",
                                        "key": "telemetry.sdk.language"
                                    },
                                    {
                                        "value": "opentelemetry",
                                        "key": "telemetry.sdk.name"
                                    },
                                    {
                                        "value": "1.5.0",
                                        "key": "telemetry.sdk.version"
                                    }
                                ],
                                "processID": "def3f867e8dc85aa",
                                "flags": 0,
                                "dataFrameRowIndex": 0,
                                "process": {
                                    "serviceName": "dummy-server",
                                    "tags": [
                                        {
                                            "value": "qryn",
                                            "key": "collector"
                                        },
                                        {
                                            "value": "dummy-server",
                                            "key": "service.name"
                                        }
                                    ]
                                },
                                "relativeStartTime": 0,
                                "depth": 0,
                                "hasChildren": true,
                                "childSpanCount": 4,
                                "warnings": []
                            }
                        }
                    ],
                    "tags": [
                        {
                            "value": "200",
                            "key": "http.status_code"
                        },
                        {
                            "value": "dummy-server",
                            "key": "name"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        },
                        {
                            "value": 0,
                            "key": "status.code"
                        },
                        {
                            "value": "nodejs",
                            "key": "telemetry.sdk.language"
                        },
                        {
                            "value": "opentelemetry",
                            "key": "telemetry.sdk.name"
                        },
                        {
                            "value": "1.5.0",
                            "key": "telemetry.sdk.version"
                        }
                    ],
                    "processID": "a12f0135dad9bea0",
                    "flags": 0,
                    "dataFrameRowIndex": 6,
                    "process": {
                        "serviceName": "dummy-server",
                        "tags": [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ]
                    },
                    "relativeStartTime": 179278.25,
                    "depth": 1,
                    "hasChildren": false,
                    "childSpanCount": 0,
                    "warnings": []
                }
            ],
            "traceID": "35786c06eca0b8628799f6bc446aac5e",
            "traceName": "dummy-server: request_received",
            "processes": {
                "def3f867e8dc85aa": {
                    "serviceName": "dummy-server",
                    "tags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ]
                },
                "4b1475833dcf1179": {
                    "serviceName": "dummy-server",
                    "tags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ]
                },
                "e35b9b2b1d644387": {
                    "serviceName": "dummy-server",
                    "tags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ]
                },
                "7a5193116c2980ff": {
                    "serviceName": "dummy-server",
                    "tags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ]
                },
                "1b7f8a1afffc9311": {
                    "serviceName": "dummy-server",
                    "tags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ]
                },
                "4b614b3e777314c0": {
                    "serviceName": "dummy-server",
                    "tags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ]
                },
                "a12f0135dad9bea0": {
                    "serviceName": "dummy-server",
                    "tags": [
                        {
                            "value": "qryn",
                            "key": "collector"
                        },
                        {
                            "value": "dummy-server",
                            "key": "service.name"
                        }
                    ]
                }
            },
            "duration": 266635,
            "startTime": 1667358877656393,
            "endTime": 1667358877923028
        }

    }
    const { removeHoverIndentGuideId, addHoverIndentGuideId, hoverIndentGuideIds } = useHoverIndentGuide();
    const { viewRange, updateViewRangeTime, updateNextViewRangeTime } = useViewRange();
    const { expandOne, collapseOne, childrenToggle, collapseAll, childrenHiddenIDs, expandAll } = useChildrenState();
    const {
        detailStates,
        toggleDetail,
        detailLogItemToggle,
        detailLogsToggle,
        detailProcessToggle,
        detailReferencesToggle,
        detailReferenceItemToggle,
        detailTagsToggle,
        detailWarningsToggle,
        detailStackTracesToggle,
      } = useDetailState([
        {
            "name": "Trace",
            "refId": "A",
            "meta": {
                "preferredVisualisationType": "trace"
            },
            "fields": [
                {
                    "name": "traceID",
                    "type": "string",
                    "typeInfo": {
                        "frame": "string"
                    },
                    "config": {},
                    "values": [
                        "35786c06eca0b8628799f6bc446aac5e",
                        "35786c06eca0b8628799f6bc446aac5e",
                        "35786c06eca0b8628799f6bc446aac5e",
                        "35786c06eca0b8628799f6bc446aac5e",
                        "35786c06eca0b8628799f6bc446aac5e",
                        "35786c06eca0b8628799f6bc446aac5e",
                        "35786c06eca0b8628799f6bc446aac5e"
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "spanID",
                    "type": "string",
                    "typeInfo": {
                        "frame": "string"
                    },
                    "config": {},
                    "values": [
                        "def3f867e8dc85aa",
                        "4b1475833dcf1179",
                        "e35b9b2b1d644387",
                        "7a5193116c2980ff",
                        "1b7f8a1afffc9311",
                        "4b614b3e777314c0",
                        "a12f0135dad9bea0"
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "parentSpanID",
                    "type": "string",
                    "typeInfo": {
                        "frame": "string"
                    },
                    "config": {},
                    "values": [
                        "",
                        "def3f867e8dc85aa",
                        "def3f867e8dc85aa",
                        "def3f867e8dc85aa",
                        "7a5193116c2980ff",
                        "7a5193116c2980ff",
                        "def3f867e8dc85aa"
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "operationName",
                    "type": "string",
                    "typeInfo": {
                        "frame": "string"
                    },
                    "config": {},
                    "values": [
                        "request_received",
                        "log_to_loki",
                        "request_processed",
                        "data_request",
                        "cache_lookup",
                        "request_processed",
                        "request_response"
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "serviceName",
                    "type": "string",
                    "typeInfo": {
                        "frame": "string"
                    },
                    "config": {},
                    "values": [
                        "dummy-server",
                        "dummy-server",
                        "dummy-server",
                        "dummy-server",
                        "dummy-server",
                        "dummy-server",
                        "dummy-server"
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "serviceTags",
                    "type": "other",
                    "typeInfo": {
                        "frame": "json.RawMessage"
                    },
                    "config": {},
                    "values": [
                        [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ],
                        [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ],
                        [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ],
                        [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ],
                        [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ],
                        [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ],
                        [
                            {
                                "value": "qryn",
                                "key": "collector"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            }
                        ]
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "startTime",
                    "type": "number",
                    "typeInfo": {
                        "frame": "float64"
                    },
                    "config": {},
                    "values": [
                        1667358877656.393,
                        1667358877656.509,
                        1667358877656.775,
                        1667358877664.779,
                        1667358877664.8,
                        1667358877699.435,
                        1667358877835.6711
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "duration",
                    "type": "number",
                    "typeInfo": {
                        "frame": "float64"
                    },
                    "config": {},
                    "values": [
                        200.694,
                        266.519,
                        7.641,
                        170.545,
                        34.151,
                        135.473,
                        21.051
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "logs",
                    "type": "other",
                    "typeInfo": {
                        "frame": "json.RawMessage"
                    },
                    "config": {},
                    "values": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "references",
                    "type": "other",
                    "typeInfo": {
                        "frame": "json.RawMessage"
                    },
                    "config": {},
                    "values": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                    ],
                    "entities": {},
                    "state": null
                },
                {
                    "name": "tags",
                    "type": "other",
                    "typeInfo": {
                        "frame": "json.RawMessage"
                    },
                    "config": {},
                    "values": [
                        [
                            {
                                "value": "dummy-server",
                                "key": "job"
                            },
                            {
                                "value": "Dooku_salmon",
                                "key": "entity"
                            },
                            {
                                "value": "200",
                                "key": "http.status_code"
                            },
                            {
                                "value": "OK",
                                "key": "otel.status_code"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            },
                            {
                                "value": "nodejs",
                                "key": "telemetry.sdk.language"
                            },
                            {
                                "value": "opentelemetry",
                                "key": "telemetry.sdk.name"
                            },
                            {
                                "value": "1.5.0",
                                "key": "telemetry.sdk.version"
                            },
                            {
                                "value": "dummy-server",
                                "key": "name"
                            },
                            {
                                "value": 0,
                                "key": "status.code"
                            }
                        ],
                        [
                            {
                                "value": "OK",
                                "key": "otel.status_code"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            },
                            {
                                "value": "nodejs",
                                "key": "telemetry.sdk.language"
                            },
                            {
                                "value": "opentelemetry",
                                "key": "telemetry.sdk.name"
                            },
                            {
                                "value": "1.5.0",
                                "key": "telemetry.sdk.version"
                            },
                            {
                                "value": "dummy-server",
                                "key": "name"
                            },
                            {
                                "value": 0,
                                "key": "status.code"
                            }
                        ],
                        [
                            {
                                "value": "/login",
                                "key": "http.target"
                            },
                            {
                                "value": "GET",
                                "key": "http.method"
                            },
                            {
                                "value": "dummy-server",
                                "key": "job"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            },
                            {
                                "value": "nodejs",
                                "key": "telemetry.sdk.language"
                            },
                            {
                                "value": "opentelemetry",
                                "key": "telemetry.sdk.name"
                            },
                            {
                                "value": "1.5.0",
                                "key": "telemetry.sdk.version"
                            },
                            {
                                "value": "dummy-server",
                                "key": "name"
                            },
                            {
                                "value": 0,
                                "key": "status.code"
                            }
                        ],
                        [
                            {
                                "value": "/login",
                                "key": "http.target"
                            },
                            {
                                "value": "GET",
                                "key": "http.method"
                            },
                            {
                                "value": "dummy-server",
                                "key": "job"
                            },
                            {
                                "value": "OK",
                                "key": "otel.status_code"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            },
                            {
                                "value": "nodejs",
                                "key": "telemetry.sdk.language"
                            },
                            {
                                "value": "opentelemetry",
                                "key": "telemetry.sdk.name"
                            },
                            {
                                "value": "1.5.0",
                                "key": "telemetry.sdk.version"
                            },
                            {
                                "value": "dummy-server",
                                "key": "name"
                            },
                            {
                                "value": 0,
                                "key": "status.code"
                            }
                        ],
                        [
                            {
                                "value": "/login",
                                "key": "http.target"
                            },
                            {
                                "value": "GET",
                                "key": "http.method"
                            },
                            {
                                "value": "dummy-server",
                                "key": "job"
                            },
                            {
                                "value": "Dooku_salmon",
                                "key": "entity"
                            },
                            {
                                "value": "false",
                                "key": "cache.hit"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            },
                            {
                                "value": "nodejs",
                                "key": "telemetry.sdk.language"
                            },
                            {
                                "value": "opentelemetry",
                                "key": "telemetry.sdk.name"
                            },
                            {
                                "value": "1.5.0",
                                "key": "telemetry.sdk.version"
                            },
                            {
                                "value": "dummy-server",
                                "key": "name"
                            },
                            {
                                "value": 0,
                                "key": "status.code"
                            }
                        ],
                        [
                            {
                                "value": "dummy-server",
                                "key": "job"
                            },
                            {
                                "value": "OK",
                                "key": "otel.status_code"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            },
                            {
                                "value": "nodejs",
                                "key": "telemetry.sdk.language"
                            },
                            {
                                "value": "opentelemetry",
                                "key": "telemetry.sdk.name"
                            },
                            {
                                "value": "1.5.0",
                                "key": "telemetry.sdk.version"
                            },
                            {
                                "value": "dummy-server",
                                "key": "name"
                            },
                            {
                                "value": 0,
                                "key": "status.code"
                            }
                        ],
                        [
                            {
                                "value": "200",
                                "key": "http.status_code"
                            },
                            {
                                "value": "dummy-server",
                                "key": "service.name"
                            },
                            {
                                "value": "nodejs",
                                "key": "telemetry.sdk.language"
                            },
                            {
                                "value": "opentelemetry",
                                "key": "telemetry.sdk.name"
                            },
                            {
                                "value": "1.5.0",
                                "key": "telemetry.sdk.version"
                            },
                            {
                                "value": "dummy-server",
                                "key": "name"
                            },
                            {
                                "value": 0,
                                "key": "status.code"
                            }
                        ]
                    ],
                    "entities": {},
                    "state": null
                }
            ],
            "length": 7
        }
    ][0]);
    const [slim, setSlim] = useState(false);
    const [spanNameColumnWidth, setSpanNameColumnWidth] = useState(0.25);
    const traceTimeline/* : TTraceTimeline  */= useMemo(
        () => ({
            childrenHiddenIDs,
            detailStates,
            hoverIndentGuideIds,
            shouldScrollToFirstUiFindMatch: false,
            spanNameColumnWidth,
            traceID: props.traceProp?.traceID,
        }),
        [
            childrenHiddenIDs,
            detailStates,
            hoverIndentGuideIds,
            spanNameColumnWidth,
            props.traceProp?.traceID,
        ]
    );
    const onSlimViewClicked = useCallback(() => setSlim(!slim), [slim]);
    return (
        <>
            <TracePageHeader
                canCollapse={false}
                hideMap={false}
                hideSummary={false}
                onSlimViewClicked={onSlimViewClicked}
                onTraceGraphViewClicked={noop}
                slimView={slim}
                trace={traceProp}
                updateNextViewRangeTime={updateNextViewRangeTime}
                updateViewRangeTime={updateViewRangeTime}
                viewRange={viewRange}
                {...props}
                // timeZone={timeZone}
            />
            <TraceTimelineViewer
                registerAccessors={noop}
                scrollToFirstVisibleSpan={noop}
                // findMatchesIDs={spanFindMatches}
                trace={traceProp}
                // datasourceType={datasourceType}
                // spanBarOptions={spanBarOptions?.spanBar}
                traceTimeline={traceTimeline}
                updateNextViewRangeTime={updateNextViewRangeTime}
                updateViewRangeTime={updateViewRangeTime}
                viewRange={viewRange}
                // timeZone={timeZone}
                setSpanNameColumnWidth={setSpanNameColumnWidth}
                collapseAll={collapseAll}
                collapseOne={collapseOne}
                expandAll={expandAll}
                expandOne={expandOne}
                childrenToggle={childrenToggle}
                clearShouldScrollToFirstUiFindMatch={noop}
                detailLogItemToggle={detailLogItemToggle}
                detailLogsToggle={detailLogsToggle}
                detailWarningsToggle={detailWarningsToggle}
                detailStackTracesToggle={detailStackTracesToggle}
                detailReferencesToggle={detailReferencesToggle}
                detailReferenceItemToggle={detailReferenceItemToggle}
                detailProcessToggle={detailProcessToggle}
                detailTagsToggle={detailTagsToggle}
                detailToggle={toggleDetail}
                setTrace={noop}
                addHoverIndentGuideId={addHoverIndentGuideId}
                removeHoverIndentGuideId={removeHoverIndentGuideId}
                linksGetter={noop}
                uiFind={props.search}
                // createSpanLink={createSpanLink}
                scrollElement={props.scrollElement}
                // focusedSpanId={focusedSpanId}
                // focusedSpanIdForSearch={props.focusedSpanIdForSearch!}
                // createFocusSpanLink={createFocusSpanLink}
                // topOfViewRef={topOfViewRef}
                // topOfViewRefType={topOfViewRefType}
                {...props}
            />
        </>
    );
}