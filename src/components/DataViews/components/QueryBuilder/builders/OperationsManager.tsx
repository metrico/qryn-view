import {
    FormatOperators,
    RangeOperators,
    AggregationOperators,
} from "../../../../QueryBuilder/Operations/builders";
import { logsToString } from "../helpers";

export type OperationsManagerType = (
    initial: string,
    operations: any[],
    value: any
) => string;

const formats = [
    "json",
    "logfmt",
    "regexp",
    "pattern",
    "unpack",
    "line_format",
    "label_format",
    "unwrap",
];

const ranges = [
    "rate",
    "rate_counter",
    "count_over_time",
    "sum_over_time",
    "bytes_rate",
    "bytes_over_time",
    "absent_over_time",
];

// unwrapped expressions
// should add unwrap function to the formats for it to work

const label_ranges = [
    "avg_over_time",
    "max_over_time",
    "min_over_time",
    "first_over_time",
    "last_over_time",
    "stdvar_over_time",
    "stddev_over_time",
];

const line_filters = [
    "line_contains", // |=
    "line_does_not_contain", // !=
    "line_contains_regex_match", // |~ ``
    "line_does_not_match_regex", // !~ ``
];

// only filter

const line_expression_filters = [
    "line_contains_case_insensitive", // |~ `(?i)`
    "line_does_not_contain_case_insensitive", // !~ `(?i)`
    "ip_line_filter_expression", // |= ip(``)
    "ip_line_not_filter_expression", //  != ip(``)
];

// filter with expression

const label_filters = [
    "no_pipeline_errors",
    "ip_label_filter_expression",
    "label_filter_expression",
];

const aggregations = ["sum", "min", "max", "avg", "stddev", "stdvar", "count"];
const aggregations_k = ["topk", "bottomk"];

const isSingleExpression = (expr: string) =>
    ["line_format", "regexp", "pattern"].includes(expr);

const setResultType = (result: string, logString: string) =>
    result === ""
        ? JSON.parse(JSON.stringify(logString))
        : JSON.parse(JSON.stringify(result));

const setExpressions = (result: any, expressions: string[]) => {
    if (Array.isArray(expressions) && expressions.length > 0) {
        expressions.forEach((expr) => {
            result.addExpression(expr);
        });
    }
};

const setRangeLabels = (result: any, labels: string[]) => {
    if (Array.isArray(labels) && labels?.length > 0) {
        labels.forEach((label) => {
            result.addLabel(label);
        });
    }
};

const setKeyVal = (result: any, kval: number) => {
    result.setKValue(kval);
};

export const OperationsManager: OperationsManagerType = (
    initial: string,
    operations: any[],
    value: any
) => {
    let result: any = "";
    if (initial && typeof initial === "string") {
        const logString = logsToString(value, JSON.parse(initial));

        operations.forEach((operation: any) => {
            if (formats.includes(operation.name)) {
                // if initial data, use previous
                const resultType = setResultType(result, logString);

                // initialize operator
                result = FormatOperators[operation.name]();

                // json case, multiple expressions
                if (operation.name === "json") {
                    // at json format we could have multiple expressions
                    setExpressions(result, operation.expressions);

                    // single expression cases
                } else if (isSingleExpression(operation.name)) {
                    const [expression] = operation.expressions;
                    // single expression at this types
                    if (expression !== "") {
                        result.setExpression(operation.expressions[0]);
                    }
                }

                // build operator
                result = result.build(resultType);
            }

            if (ranges.includes(operation.name)) {
                const resultType = setResultType(result, logString);
                // initialize with operation type
                result = RangeOperators(operation.name)["range"];
                result.setRange(operation.range || "$__interval");
                result = result.build(resultType);
            }

            if (label_ranges.includes(operation.name)) {
                const resultType = setResultType(result, logString);
                result = RangeOperators(operation.name)["label_range"];
                setRangeLabels(result, operation.labels);
                result.updRange(operation.range || "$__interval");

                result = result.build(resultType);
            }

            if (aggregations.includes(operation.name)) {
                const resultType = setResultType(result, logString);

                result = AggregationOperators(operation.name)["aggr"];
                setRangeLabels(result, operation.labels);
                result = result.build(resultType);
            }

            if (aggregations_k.includes(operation.name)) {
                const resultType = setResultType(result, logString);
                result = AggregationOperators(operation.name)["aggr_btk"];
                setRangeLabels(result, operation.labels);
                setKeyVal(result, operation.kValue);
                result = result.build(resultType);
            }

            if (line_filters.includes(operation.name)) {
                const resultType = setResultType(result, logString);
                result = AggregationOperators(operation.name)["line_filter"];
                setRangeLabels(result, operation.labels);
                setKeyVal(result, operation.kValue);
                result = result.build(resultType);
            }

            if (label_filters.includes(operation.name)) {
                const resultType = setResultType(result, logString);
                result = AggregationOperators(operation.name)["label_filters"];
                setRangeLabels(result, operation.labels);
                setKeyVal(result, operation.kValue);
                result = result.build(resultType);
            }
        });
    }
    return result;
};
