export interface TraceResponse {
    resourceSpans: ResourceSpan[];
}

export interface ResourceSpan {
    resource:                    Resource;
    instrumentationLibrarySpans: InstrumentationLibrarySpan[];
}

export interface InstrumentationLibrarySpan {
    instrumentationLibrary: InstrumentationLibrary;
    spans:                  Span[];
}

export interface InstrumentationLibrary {
}

export interface Span {
    traceID:           string;
    traceId:           string;
    spanID:            string;
    spanId:            string;
    name:              string;
    startTimeUnixNano: string;
    endTimeUnixNano:   string;
    serviceName:       string;
    attributes:        Attribute[];
    events:            any[];
    parentSpanId?:     string;
}

export interface Attribute {
    key:   string;
    value: Value;
}

export interface Value {
    stringValue: string;
}

export interface Resource {
    attributes: Attribute[];
}

// Trace object for Trace Viewer

export interface TraceProp {
    services:  Service[];
    spans:     Span[];
    traceID:   TraceID;
    traceName: string;
    processes: { [key: string]: Process };
    duration:  number;
    startTime: number;
    endTime:   number;
}

export interface Process {
    serviceName: ServiceName;
    tags:        ServiceTagElement[];
}

export enum ServiceName {
    DummyServer = "dummy-server",
    Qryn = "qryn",
}

export interface ServiceTagElement {
    value: ServiceName;
    key:   Key;
}

export enum Key {
    Collector = "collector",
    ServiceName = "service.name",
}

export interface Service {
    name:          ServiceName;
    numberOfSpans: number;
}

export interface Reference {
    refType: string;
    spanID:  SpanID;
    traceID: TraceID;
    span:    Span;
}

export interface SpanProp {
    traceID:           TraceID;
    spanID:            string;
    parentSpanID:      SpanID;
    operationName:     string;
    serviceName:       ServiceName;
    serviceTags:       ServiceTagElement[];
    startTime:         number;
    duration:          number;
    logs:              any[];
    references:        Reference[];
    tags:              PurpleTag[];
    processID:         string;
    flags:             number;
    dataFrameRowIndex: number;
    process:           Process;
    relativeStartTime: number;
    depth:             number;
    hasChildren:       boolean;
    childSpanCount:    number;
    warnings:          any[];
}

export enum SpanID {
    Def3F867E8Dc85Aa = "def3f867e8dc85aa",
    Empty = "",
    The7A5193116C2980Ff = "7a5193116c2980ff",
}

export enum TraceID {
    The35786C06Eca0B8628799F6Bc446Aac5E = "35786c06eca0b8628799f6bc446aac5e",
}

export interface PurpleTag {
    value: number | string;
    key:   string;
}









