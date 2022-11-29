const { createProxyMiddleware } = require('http-proxy-middleware');

const root = 'http://localhost:3000'

module.exports = function(app) {
    app.use('/api/traces/d6e9329d67b6146e0000000000000000/json', function (req, res, next) {
        res.json({
            "resourceSpans":[
                {
                    "resource":{
                        "attributes":[
                            {
                                "key":"collector",
                                "value":{
                                    "stringValue":"qryn"
                                }
                            },
                            {
                                "key":"service.name",
                                "value":{
                                    "stringValue":"node script"
                                }
                            }
                        ]
                    },
                    "instrumentationLibrarySpans":[
                        {
                            "instrumentationLibrary":{

                            },
                            "spans":[
                                {
                                    "traceID":"d6e9329d67b6146e0000000000000000",
                                    "traceId":"d6e9329d67b6146e0000000000000000",
                                    "spanID":"1234ef46",
                                    "spanId":"1234ef46",
                                    "name":"span from http",
                                    "startTimeUnixNano":"1669656738000000000",
                                    "endTimeUnixNano":"1669656738001000000",
                                    "serviceName":"node script",
                                    "attributes":[
                                        {
                                            "key":"http.method",
                                            "value":{
                                                "stringValue":"GET"
                                            }
                                        },
                                        {
                                            "key":"http.path",
                                            "value":{
                                                "stringValue":"/tempo/spans"
                                            }
                                        },
                                        {
                                            "key":"name",
                                            "value":{
                                                "stringValue":"node script"
                                            }
                                        },
                                        {
                                            "key":"service.name",
                                            "value":{
                                                "stringValue":"node script"
                                            }
                                        }
                                    ],
                                    "events":[
                                        {
                                            "timeUnixNano":"1669656738000000000",
                                            "name":"32242423"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },{
                    "resource":{
                        "attributes":[
                            {
                                "key":"collector",
                                "value":{
                                    "stringValue":"qryn"
                                }
                            },
                            {
                                "key":"service.name",
                                "value":{
                                    "stringValue":"node script 2"
                                }
                            }
                        ]
                    },
                    "instrumentationLibrarySpans":[
                        {
                            "instrumentationLibrary":{

                            },
                            "spans":[
                                {
                                    "traceID":"d6e9329d67b6146e0000000000000000",
                                    "traceId":"d6e9329d67b6146e0000000000000000",
                                    "spanID":"1234ef47",
                                    "spanId":"1234ef47",
                                    "name":"span from http",
                                    "parentSpanId": "1234ef46",
                                    "startTimeUnixNano":"1669656738001000000",
                                    "endTimeUnixNano":"1669656738002000000",
                                    "serviceName":"node script",
                                    "attributes":[
                                        {
                                            "key":"http.method",
                                            "value":{
                                                "stringValue":"GET"
                                            }
                                        },
                                        {
                                            "key":"http.path",
                                            "value":{
                                                "stringValue":"/tempo/spans"
                                            }
                                        },
                                        {
                                            "key":"name",
                                            "value":{
                                                "stringValue":"node script"
                                            }
                                        },
                                        {
                                            "key":"service.name",
                                            "value":{
                                                "stringValue":"node script"
                                            }
                                        }
                                    ],
                                    "events":[
                                        {
                                            "timeUnixNano":"1669656738001000000",
                                            "name":"32242423"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    })
    app.use('/api/traces/d6e9329d67b6146e0000000000000001/json', function (req, res, next) {
        res.json({
            "resourceSpans":[
                {
                    "resource":{
                        "attributes":[
                            {
                                "key":"collector",
                                "value":{
                                    "stringValue":"qryn"
                                }
                            },
                            {
                                "key":"service.name",
                                "value":{
                                    "stringValue":"node script"
                                }
                            }
                        ]
                    },
                    "instrumentationLibrarySpans":[
                        {
                            "instrumentationLibrary":{

                            },
                            "spans":[
                                {
                                    "traceID":"d6e9329d67b6146e0000000000000001",
                                    "traceId":"d6e9329d67b6146e0000000000000001",
                                    "spanID":"1234ef46",
                                    "spanId":"1234ef46",
                                    "parentSpanId": "0000000000000000",
                                    "name":"span from http",
                                    "startTimeUnixNano":"1669656738000000000",
                                    "endTimeUnixNano":"1669656738001000000",
                                    "serviceName":"node script",
                                    "attributes":[
                                        {
                                            "key":"http.method",
                                            "value":{
                                                "stringValue":"GET"
                                            }
                                        },
                                        {
                                            "key":"http.path",
                                            "value":{
                                                "stringValue":"/tempo/spans"
                                            }
                                        },
                                        {
                                            "key":"name",
                                            "value":{
                                                "stringValue":"node script"
                                            }
                                        },
                                        {
                                            "key":"service.name",
                                            "value":{
                                                "stringValue":"node script"
                                            }
                                        }
                                    ],
                                    "events":[
                                        {
                                            "timeUnixNano":"1669656738000000000",
                                            "name":"32242423"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    })
    app.use(
        '/loki',
        createProxyMiddleware({
            target: root,
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: root,
            changeOrigin: true,
        })
    );
    app.use(
        '/tempo',
        createProxyMiddleware({
            target: root,
            changeOrigin: true,
        })
    );
};