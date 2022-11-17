export function attrValue(value) {
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

export function mapSpanFields(spans) {
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
        values: spans?.map((sp) => sp[name]),
        entities: {},
        state: null,
    }));
}

export const TREE_ROOT_ID = "__root__";

export function countSpanDepth(spans, count = 0) {
    spans.forEach((span) => {
        span.depth = count;
        if (span.children?.length > 0) {
            count += 1;
            span.children.forEach((child) => {
                if (span.spanID === child) {
                    countSpanDepth(spans, count);
                }
            });
        }
    });
}

export function mapTracesResponse(data) {
    return data?.resourceSpans?.map((trace) => {
        const { instrumentationLibrarySpans, resource } = trace;

        const parent = instrumentationLibrarySpans.map((ils) => {
            return ils?.spans?.find(
                (m) => Object.keys(m).indexOf("parentSpanId") === -1
            );
        })[0];
        const instSpans = [...Array.from(new Set(instrumentationLibrarySpans))];
        const orderedSpans = instSpans?.[0]?.spans.sort(
            (a, b) =>
                parseInt(a.startTimeUnixNano) - parseInt(b.startTimeUnixNano)
        );

        const firstTs = orderedSpans[0]?.startTimeUnixNano / 1000;
        const lastTimestamps = orderedSpans
            .map((m) => m.endTimeUnixNano)
            ?.sort()
            ?.reverse();

        const lastTs = lastTimestamps[0] / 1000;

        let spans = instrumentationLibrarySpans?.map((ils) => {
            return ils.spans?.map((m, idx) => {
                const tags = m.attributes?.map((attr) => ({
                    key: attr?.key,
                    value: attr?.value?.stringValue,
                }));

                const serviceTags = resource?.attributes?.map((attr) => ({
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
                    logs: [],
                    references: [],
                    tags,
                    processID: m?.spanID,
                    flags: 0,
                    dataFrameRowIndex: idx,
                    process,
                    children: [],
                };
            });
        })[0];

        if (spans?.length > 0) {
            try {
                spans.forEach((span) => {
                    if (span?.parentSpanID !== "") {
                        const parent = spans.find(
                            (f) => f.spanID === span.parentSpanID
                        );

                        spans = spans
                            ?.map((m) => {
                                if (m.spanID === parent.spanID) {
                                    return {
                                        ...m,
                                        children: [...m.children, span.spanID],
                                    };
                                }

                                return m;
                            })
                            .map((n) => {
                                if (n.children?.length > 0) {
                                    return {
                                        ...n,
                                        hasChildren: true,
                                        childSpanCount: n.children.length,
                                        relativeStartTime:
                                            n.startTime - spans[0].startTime,
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

        let traceObj = {
            services: instrumentationLibrarySpans.map((ils) => {
                const { spans } = ils;
                return {
                    name: spans[0].serviceName,
                    numberOfSpans: spans.length,
                };
            }),
            spans,
            traceID: parent?.traceID,
            traceName: `${parent?.serviceName}: ${parent.name}`,
            processes: {}, // use processing fn
            duration: lastTs - firstTs,
            startTime: firstTs,
            endTime: lastTs,
        };

        return traceObj;
    });
}
