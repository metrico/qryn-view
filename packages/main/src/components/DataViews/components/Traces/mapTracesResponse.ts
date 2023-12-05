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

export function countSpanDepth(spans:any, count = 0) {

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
    const mapped = data?.resourceSpans?.map((trace) => {
        const { instrumentationLibrarySpans } = trace;
        const parent = allSpans.find((m) => m.parentSpanId === undefined);
        const instSpans = [...allSpans];
        const orderedSpans = instSpans?.sort(
          (a, b) => parseInt(a.startTimeUnixNano) - parseInt(b.startTimeUnixNano)
        );
    
        const firstTs = orderedSpans[0]?.startTimeUnixNano / 1000;
        const lastTimestamps = orderedSpans
          .map((m) => m.endTimeUnixNano)
          ?.sort()
          ?.reverse();
        const lastTs = lastTimestamps[0] / 1000;
        const spans:any = instSpans.map((m, idx) => {
          const tags = m.attributes?.map((attr) => ({
            key: attr?.key,
            value: attr?.value?.stringValue,
          }));
    
          const serviceTags = m?.resource?.attributes?.map((attr) => ({
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
            events: m?.events || [],
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
            const spanMap = Object.create(null); // Use Object.create(null) for better performance
            const rootSpan = spans[0].startTime;
    
            for (const span of spans) {
              const { spanID, parentSpanID, startTime, references, children } = span;
              const hasParent = parentSpanID !== "" && spanMap[parentSpanID];
    
              if (hasParent) {
                spanMap[parentSpanID].children.push(spanID);
                references.push({
                  refType: "CHILD_OF",
                  spanID: parentSpanID,
                  traceID: spanMap[parentSpanID].traceID,
                  span: { ...spanMap[parentSpanID] },
                });
              }
    
              if (children.length > 0) {
                span.hasChildren = true;
                span.childSpanCount = children.length;
                span.relativeStartTime = startTime - rootSpan;
              } else {
                span.relativeStartTime = startTime - rootSpan;
              }
    
              spanMap[spanID] = span;
            }
          } catch (e) {
            console.log(e);
          }
        }
    
        countSpanDepth(spans);
    
        let traceObj = {
          services: [],
          spans: [],
          traceID: "",
          traceName: "",
          processes: {}, // use processing fn
          duration: 0,
          startTime: 0,
          endTime: 0,
        };
    
        const firstSpan:any = spans?.[0];
    
        if (instrumentationLibrarySpans && lastTs && firstTs) {
          const {
            serviceName: firstServiceName,
            name: firstName,
            traceID: firstTraceID,
          } = firstSpan;
    
          traceObj = {
            services: spans.map((span) => {
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

    return mapped
}
