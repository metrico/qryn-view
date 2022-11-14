import { SpanStatusCode } from "@opentelemetry/api";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

export default class TreeNode {
    static iterFunction(fn, depth = 0) {
        return (node) => fn(node.value, node, depth);
    }

    static searchFunction(search) {
        if (typeof search === "function") {
            return search;
        }

        return (value, node) =>
            search instanceof TreeNode ? node === search : value === search;
    }

    constructor(value, children = []) {
        this.value = value;
        this.children = children;
    }

    get depth() {
        return this.children.reduce(
            (depth, child) => Math.max(child.depth + 1, depth),
            1
        );
    }

    get size() {
        let i = 0;
        this.walk(() => i++);
        return i;
    }

    addChild(child) {
        this.children.push(
            child instanceof TreeNode ? child : new TreeNode(child)
        );
        return this;
    }

    find(search) {
        const searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search));
        if (searchFn(this)) {
            return this;
        }
        for (let i = 0; i < this.children.length; i++) {
            const result = this.children[i].find(search);
            if (result) {
                return result;
            }
        }
        return null;
    }

    getPath(search) {
        const searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search));

        const findPath = (currentNode, currentPath) => {
            // skip if we already found the result
            const attempt = currentPath.concat([currentNode]);
            // base case: return the array when there is a match
            if (searchFn(currentNode)) {
                return attempt;
            }
            for (let i = 0; i < currentNode.children.length; i++) {
                const child = currentNode.children[i];
                const match = findPath(child, attempt);
                if (match) {
                    return match;
                }
            }
            return null;
        };

        return findPath(this, []);
    }

    walk(fn, depth = 0) {
        const nodeStack = [];
        let actualDepth = depth;
        nodeStack.push({ node: this, depth: actualDepth });
        while (nodeStack.length) {
            const { node, depth: nodeDepth } = nodeStack.pop();
            fn(node.value, node, nodeDepth);
            actualDepth = nodeDepth + 1;
            let i = node.children.length - 1;
            while (i >= 0) {
                nodeStack.push({ node: node.children[i], depth: actualDepth });
                i--;
            }
        }
    }
}

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

function resourceToProcess(resource) {
    const serviceTags = [];
    let serviceName = "OTLPResourceNoServiceName";
    if (!resource) {
        return { serviceName, serviceTags };
    }
    for (let attr of resource.attributes) {
        if (attr.key === SemanticResourceAttributes.SERVICE_NAME) {
            serviceName = attr.value.stringValue || serviceName;
        }
        serviceTags.push({ key: attr.key, value: attrValue(attr.value) });
    }
    return { serviceName, serviceTags };
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

function getSpanTags(span, instrumentationLibrary) {
    const spanTags = [];

    if (!!instrumentationLibrary) {
        if (!!instrumentationLibrary?.name) {
            spanTags.push({
                key: "otel.library.name",
                value: instrumentationLibrary.name,
            });
        }
        if (instrumentationLibrary.version) {
            spanTags.push({
                key: "otel.library.version",
                value: instrumentationLibrary.version,
            });
        }
    }

    if (!!span?.attributes) {
        for (let attribute of span.attributes) {
            spanTags.push({
                key: attribute.key,
                value: attrValue(attribute.value),
            });
        }
    }

    if (!!span?.status) {
        if (span?.status?.code && span.status.code !== SpanStatusCode.UNSET) {
            spanTags.push({
                key: "otel.status_code",
                value: SpanStatusCode[span.status.code],
            });
            if (span.status.message) {
                spanTags.push({
                    key: "otel.status_description",
                    value: span.status.message,
                });
            }
        }
        if (span.status.code === SpanStatusCode.ERROR) {
            spanTags.push({ key: "error", value: true });
        }
    }
    if (!!span?.kind) {
        const split = span.kind.toString().toLowerCase().split("_");
        spanTags.push({
            key: "span.kind",
            value: split.length
                ? split[split.length - 1]
                : span.kind.toString(),
        });

        return spanTags;
    }
}
export const TREE_ROOT_ID = "__root__";

export function getTraceSpancsIdsAsTree(trace) {
    const nodesById = new Map(
        trace.spans.map((span) => [span.spanID, new TreeNode(span.spanID)])
    );
    const spansById = new Map(trace.spans.map((span) => [span.spanID, span]));
    const root = new TreeNode(TREE_ROOT_ID);
    trace.spans.forEach((span) => {
        const node = nodesById.get(span.spanID);
        if (Array.isArray(span.references) && span.references.length) {
            const { refType, spanID: parentID } = span.references[0];
            if (refType === "CHILD_OF" || refType === "FOLLOWS_FROM") {
                const parent = nodesById.get(parentID) || root;
                parent.children.push(node);
            } else {
                throw new Error(`Unrecognized ref type: ${refType}`);
            }
        } else {
            root.children.push(node);
        }
    });
    const comparator = (nodeA, nodeB) => {
        const a = spansById.get(nodeA.value);
        const b = spansById.get(nodeB.value);
        return (
            +(a.startTime > b.startTime) || +(a.startTime === b.startTime) - 1
        );
    };
    trace.spans.forEach((span) => {
        const node = nodesById.get(span.spanID);
        if (node.children.length > 1) {
            node.children.sort(comparator);
        }
    });
    root.children.sort(comparator);
    return root;
}

function addDepth(arr, depth = 0) {
    arr.forEach((obj) => {
        obj.depth = depth;
        addDepth(obj.children, depth + 1);
    });
}

// find children inside spans 
export function findChildren(spans,child,count) {

}




export function countSpanDepth(spans, count = 0) {

    spans.forEach((span) => {
        span.depth = count
        if (span.children?.length > 0) {
            count += 1
            span.children.forEach((child) => {
                
                if(span.spanID === child) {
                    countSpanDepth(spans,count)
                }
            });
        } 
    });

    // if (count > 0) {
    //     // console.log(count)
    //     count += count;
    //     console.log(count)
    // }

    // while(span?.references?.length > 0) {
    //     count ++

    //     let refs = span.references[0].span

    //    countSpanDepth(refs, count)
    // }

    // if (span?.references?.length > 0) {
    //     count += 1;
    //     // console.log(span)
    //     console.log(span.references)
    //     let refs = span.references[0].span

    //     // console.log(count, "COUNT")
    //     // console.log(ref)
    //     // refs.map((n) => countSpanDepth(n, count));

    //         countSpanDepth(refs, count);
    //         // count += innerDepth

    // }
    //  return count
}

export function mapTracesResponse(data) {
    return data?.resourceSpans?.map((trace) => {
        const { instrumentationLibrarySpans, resource } = trace;

        const parent = instrumentationLibrarySpans.map((ils) => {
            //     console.log(ils);
            return ils?.spans?.find(
                (m) => Object.keys(m).indexOf("parentSpanId") === -1
            );
        })[0];
        //   console.log(parent);
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
                        //    console.log(parent);

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

            //console.log(spans);
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

        console.log(traceObj)

        //  const mappedSpansTest = mapSpanFields(traceObj.spans);
        //  console.log(mappedSpansTest);
        return traceObj;
    });
}
