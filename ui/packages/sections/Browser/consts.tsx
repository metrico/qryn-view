export const DEFAULT_RESOLUTION = {
    value: 1,
    label: "1/1",
};
let resMap = [2, 3, 4, 5, 10].map((value: any) => ({
    value,
    label: "1/" + value,
}));
export const RESOLUTION_OPTIONS = [DEFAULT_RESOLUTION]?.concat(resMap);

export const SWITCH_OPTIONS = [
    { value: "range", label: "Range" },
    { value: "instant", label: "Instant" },
];

export const DIRECTION_SWITCH_OPTIONS = [
    { value: "forward", label: "Forward" },
    { value: "backwards", label: "Backwards" },
];

export const TRACE_OPTIONS = [
    { value: "traceId", label: "TraceId" },
    { value: "search", label: "Search" },
];