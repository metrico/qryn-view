import {
    RangeBody,
    AggregationsBody,
    LabelRangeBody,
    HistogramQuantileBody,
    ClampBody,
    ClampMaxBody,
    ClampMinBody,
    QuantileBody,
    RoundBody,
    LabelReplaceBody,
    LabelJoinBody,
    JSONFormatBody,
    PatternFormatBody,
    RegexpFormatBody,
    LineFormatBody,
    UnwrapFormatBody,
    DefaultFormatBody,
    LineFilterBody,
    LabelFilterBody,
    BinaryOperationsBody,
} from "./body";

import { label_ranges, ranges, aggregations, aggregations_k } from "../consts";
export const rangeRenderer = (op: string, props: any) => {
    if (ranges.includes(op)) {
        return <RangeBody {...props} />;
    }

    if (label_ranges.includes(op)) {
        return <LabelRangeBody {...props} />;
    }
    return null;
};

export const aggregationRenderer = (op: string, props: any) => {
    if (aggregations.includes(op)) {
        return <AggregationsBody {...props} aggrType={op} />;
    }

    if (aggregations_k.includes(op)) {
        return <AggregationsBody {...props} aggrType={op} />;
    }
};

export const functionsRenderer = (op: string, props: any) => {
    if (op === "histogram_quantile") {
        return <HistogramQuantileBody {...props} />;
    }
    if (op === "clamp") {
        return <ClampBody {...props} />;
    }

    if (op === "clamp_max") {
        return <ClampMaxBody {...props} />;
    }

    if (op === "clamp_min") {
        return <ClampMinBody {...props} />;
    }
    if (op === "quantile") {
        return <QuantileBody {...props} />;
    }

    if (op === "round") {
        return <RoundBody {...props} />;
    }
    if (op === "label_replace") {
        return <LabelReplaceBody {...props} />;
    }

    if (op === "label_join") {
        return <LabelJoinBody {...props} />;
    }
    return rangeRenderer(op, props);
};

export const formatsRenderer = (op: string, props: any) => {
    switch (op) {
        case "json":
            return <JSONFormatBody {...props} />;
        case "pattern":
            return <PatternFormatBody {...props} />;
        case "regexp":
            return <RegexpFormatBody {...props} />;
        case "line_format":
            return <LineFormatBody {...props} />;
        case "unwrap":
            return <UnwrapFormatBody {...props} />;
        default:
            return <DefaultFormatBody {...props} />;
    }
};

export const opTypeSwitch = (opType: string, op: string, props: any) => {
    switch (opType) {
        case "formats":
            return formatsRenderer(op, props);
        case "range_functions":
            return rangeRenderer(op, props);
        case "aggregations":
            return aggregationRenderer(op, props);
        case "line_filters":
            return <LineFilterBody {...props} />;
        case "label_filters":
            return <LabelFilterBody {...props} />;
        case "binary_operations":
            return <BinaryOperationsBody {...props} />;
        case "functions":
            return functionsRenderer(op, props);
        default:
            return rangeRenderer(op, props);
    }
};
