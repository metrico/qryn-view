export function attrValue(value:any):any {
    if (!!value?.stringValue) {
        return value.stringValue;
    }

    if (!!value?.boolValue) {
        return Boolean(value.boolValue);
    }

    if (!!value?.initValue) {
        return parseInt(value.intValue, 10);
    }

    if (!!value?.doubleValue) {
        return parseFloat(value.doubleValue);
    }

    if (!!value?.arrayValue) {
        const arrayValue = [];
        for (let arValue of value.arrayValue.values) {
            arrayValue.push(attrValue(arValue));
        }

        return arrayValue;
    }

    return "";
}

export function mapSpanFields(spans:any) {
    const mappedFields = [
        {
            name: "traceID",
            type: "string",
            typeInfo: {
                frame: "string",
            },
        },
        {
            name: "spanID",
            type: "string",
            typeInfo: {
                frame: "string",
            },
        },
        {
            name: "parentSpanID",
            type: "string",
            typeInfo: {
                frame: "string",
            },
        },
        {
            name: "operationName",
            type: "string",
            typeInfo: {
                frame: "string",
            },
        },
        {
            name: "serviceName",
            type: "string",
            typeInfo: {
                frame: "string",
            },
        },
        {
            name: "serviceTags",
            type: "other",
            typeInfo: {
                frame: "json.RawMessage",
            },
        },
        {
            name: "startTime",
            type: "number",
            typeInfo: {
                frame: "float64",
            },
        },
        {
            name: "duration",
            type: "number",
            typeInfo: {
                frame: "float64",
            },
        },
        {
            name: "logs",
            type: "other",
            typeInfo: {
                frame: "json.RawMessage",
            },
        },
        {
            name: "references",
            type: "other",
            typeInfo: {
                frame: "json.RawMessage",
            },
        },
        {
            name: "tags",
            type: "other",
            typeInfo: {
                frame: "json.RawMessage",
            },
        },
    ];

    return mappedFields.map(({ name, type, typeInfo }) => ({
        name,
        type,
        typeInfo,
        config: {},
        values: spans?.map((sp:any) => sp[name]),
        entities: {},
        state: null,
    }));
}

export const TREE_ROOT_ID = "__root__";

export function countSpanDepth(spans:any, count:number = 0) {
    spans.forEach((span:any) => {
        span.depth = count;
        if (span.children?.length > 0) {
            count += 1;
            span.children.forEach((child:any) => {
                if (span.spanID === child) {
                    countSpanDepth(spans, count);
                }
            });
        }
    });
}

function getSpans(data:any) {
    const mappedSpans = data.resourceSpans?.map((rs:any) => {
        const resource = rs.resource;
        return rs.instrumentationLibrarySpans.map((m:any) =>
            m.spans.map((sp:any) => ({ ...sp, resource }))
        );
    });

    return mappedSpans.flat(2);
}

export function mapTracesResponse(data:any) {
    const allSpans = getSpans(data);

    return data?.resourceSpans?.map((trace:any) => {
        const { instrumentationLibrarySpans } = trace;

        const parent = allSpans.find(
            (m:any) => Object.keys(m).indexOf("parentSpanId") === -1
        );

        const instSpans = [...allSpans];

        const orderedSpans = instSpans?.sort(
            (a, b) =>
                parseInt(a.startTimeUnixNano) - parseInt(b.startTimeUnixNano)
        );

        const firstTs = orderedSpans[0]?.startTimeUnixNano / 1000;
        const lastTimestamps = orderedSpans
            .map((m) => m.endTimeUnixNano)
            ?.sort()
            ?.reverse();

        const lastTs = lastTimestamps[0] / 1000;

        let spans = allSpans?.map((m:any, idx:any) => {
            const tags = m.attributes?.map((attr:any) => ({
                key: attr?.key,
                value: attr?.value?.stringValue,
            }));

            const serviceTags = m?.resource?.attributes?.map((attr:any) => ({
                key: attr?.key,
                value: attr?.value?.stringValue,
            }));

            const duration =
                Math.round(m?.endTimeUnixNano / 1000) -
                Math.round(m?.startTimeUnixNano / 1000);
            const startTime = m?.startTimeUnixNano / 1000;

            const process = {
                serviceName: m?.serviceName,
                tags: serviceTags,
            };

            return {
                traceID: m?.traceID || m?.traceId,
                spanID: m?.spanID || m.spanId,
                parentSpanID: m?.parentSpanID || m?.parentSpanId || "",
                operationName: m?.name,
                serviceName: m?.serviceName,
                serviceTags,
                startTime,
                duration,
                relativeStartTime: 0,
                events:m?.events || [],
                logs: m?.logs || [],
                references: m?.references || [],
                tags,
                processID: m?.spanID,
                flags: 0,
                dataFrameRowIndex: idx,
                process,
                children: m?.children || [],
            };
        });

        if (spans?.length > 0) {
            try {
                spans.forEach((span:any) => {
                    const hasParent = spans?.some(
                        (s:any) => s?.spanID === span?.parentSpanID
                    );

                    if (span?.parentSpanID !== "" && hasParent) {
                        const parent = spans?.find(
                            (f:any) => f.spanID === span.parentSpanID
                        );

                        if (parent)
                            spans = spans
                                ?.map((m:any) => {
                                    if (m.spanID === parent.spanID) {
                                        return {
                                            ...m,
                                            children: [
                                                ...m.children,
                                                span.spanID,
                                            ],
                                        };
                                    }

                                    return m;
                                })
                                ?.map((n:any) => {
                                    if (n?.children?.length > 0) {
                                        return {
                                            ...n,
                                            hasChildren: true,
                                            childSpanCount: n.children.length,
                                            relativeStartTime:
                                                n.startTime -
                                                spans[0].startTime,
                                        };
                                    }

                                    return {
                                        ...n,
                                        relativeStartTime:
                                            n.startTime - spans[0].startTime,
                                    };
                                });

                        span?.references?.push({
                            refType: "CHILD_OF",
                            spanID: parent.spanID,
                            traceID: parent.traceID,
                            span: { ...parent },
                        });
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }

        countSpanDepth(spans);

        let traceObj :any = {
            services: [],
            spans: [],
            traceID: "",
            traceName: "",
            processes: {}, // use processing fn
            duration: 0,
            startTime: 0,
            endTime: 0,
        };

        const firstSpan = spans?.[0];

        if (instrumentationLibrarySpans && lastTs && firstTs) {
            const {
                serviceName: firstServiceName,
                name: firstName,
                traceID: firstTraceID,
            } = firstSpan;

            traceObj = {
                services: spans.map((span:any) => {
                    return {
                        name: span.serviceName,
                        numberOfSpans: spans.length,
                    };
                }),
                spans,
                traceID: parent ? parent?.traceID : firstTraceID,
                traceName: parent
                    ? `${parent?.serviceName}: ${parent?.name}`
                    : `${firstServiceName}: ${firstName}`,
                processes: {}, // use processing fn
                duration: lastTs - firstTs,
                startTime: firstTs,
                endTime: lastTs,
            };
        }
        return traceObj;
    });
}
