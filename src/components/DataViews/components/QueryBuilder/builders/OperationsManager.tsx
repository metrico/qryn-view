import {
    FormatOperators,
    RangeOperators,
    RangeFunctionsOperators,
    AggregationOperators,
    LineFilterOperators,
    LabelFilterOperators,
    BinaryOperations,
    TimeFunctionOperators,
    TrigonometricOperators,
    MetricFunctionOperators,
} from "../../../../QueryBuilder/Operations/builders";
import { logsToString } from "../helpers";

export type OperationsManagerType = (
    initial: string,
    operations: any[]
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
const conversionFn = ["duration", "duration_seconds", "bytes", ""];
const ranges = [
    // logs range
    "rate",
    "rate_counter",
    "count_over_time",
    "sum_over_time",
    "bytes_rate",
    "bytes_over_time",
    "absent_over_time",
];

const range_functions = [
    // metrics range
    "changes",
    // "rate_func",
    "irate",
    "increase",
    "idelta",
    "delta",
    "holt winters",
    "predict linear",
    "quantile over time",
    "deriv",
    "resets",
    //"sum_over_time",
    "avg_over_time",
    "min_over_time",
    "max_over_time",
    // "count_over_time",
    "last_over_time",
    "present_over_time",
    // "absent_over_time",
    "stddev_over_time",
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
    "quantile_over_time",
];

const line_filters = [
    "line_contains", // |=
    "line_does_not_contain", // !=
    "line_contains_regex_match", // |~ ``
    "line_does_not_match_regex", // !~ ``
    "line_contains_case_insensitive", // |~ `(?i)`
    "line_does_not_contain_case_insensitive", // !~ `(?i)`
    "ip_line_filter_expression", // |= ip(``)
    "ip_line_not_filter_expression", //  != ip(``)
];

const binary_operations = [
    "add_scalar",
    "subtract_scalar",
    "multiply_by_scalar",
    "divide_by_scalar",
    "modulo_by_scalar",
    "exponent",
    "equal_to",
    "not_equal_to",
    "greater_than",
    "less_than",
    "greater_or_equal_to",
    "less_or_equal_to",
    "binary_operation_with_query",
];

// filter with expression

const label_filters = [
    "no_pipeline_errors", // this one has no input, only filters.
    "ip_label_filter_expression",
    "label_filter_expression",
];

const trigonometric_functions = [
    "acos",
    "acosh",
    "asin",
    "asinh",
    "atan",
    "atanh",
    "cos",
    "cosh",
    "sin",
    "sinh",
    "tan",
    "tanh",
];

const aggregations = [
    "sum",
    "min",
    "max",
    "avg",
    "stddev",
    "stdvar",
    "count",
    "count_values",
];
const aggregations_k = ["topk", "bottomk"];

const time_functions = ["day_of_month", "day_of_week", "days_in_month"];

const metrics_functions = [
    "ln",
    "absent",
    "ceil",
    "deg",
    "exp",
    "floor",
    "group",
    "hour",
    "log10",
    "log2",
    "minute",
    "pi",
    "rad",
    "scalar",
    "sgn",
    "sort",
    "sort_desc",
    "sqrt",
    "stddev",
    "time",
    "timestamp",
    "vector",
    "year",
];

const editable_funcs = [
    "histogram_quantile",
    "label_replace",
    "clamp",
    "clamp_max",
    "clamp_min",
    "label_join",
    "quantile",
    "round",
];

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
    operations: any[]
) => {
 
    let result: any = "";
    if (initial && typeof initial === "string") {
        // it waits for raw labels (not the string itself )
        const logString = logsToString(JSON.parse(initial));
        if (operations?.length > 0) {
            operations.forEach((operation: any) => {
                if (formats.includes(operation.name)) {
                    // if initial data, use previous
                    const resultType = setResultType(result, logString);

                    // initialize operator
                    result = FormatOperators[operation.name]();

                    if (operation.name === "unwrap") {
                        if (
                            operation?.labelValue !== "" &&
                            typeof operation.labelValue === "string"
                        ) {
                            result.setLabelValue(operation.labelValue);
                        }

                        if (
                            operation?.conversion_function !== "" &&
                            typeof operation.conversion_function === "string" &&
                            conversionFn.includes(operation.conversion_function)
                        ) {
                            result.setConversionFn(
                                operation.conversion_function
                            );
                        }
                    }

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

                if (range_functions.includes(operation.name)) {
                    const resultType = setResultType(result, logString);
                    // initialize with operation type
                    result = RangeFunctionsOperators(operation.name)[
                        "range_function"
                    ];
                    result.setRange(operation.range || "$__interval");

                    result = result.build(resultType);
                }

                if (metrics_functions.includes(operation.name)) {
                    const resultType = setResultType(result, logString);
                    result = MetricFunctionOperators(operation.name)[
                        "metric_functions"
                    ];
                    result = result.build(resultType);
                }

                if (editable_funcs.includes(operation.name)) {
                    const resultType = setResultType(result, logString);
                    result = MetricFunctionOperators(operation.name)[
                        "editable_functions"
                    ];
                    result.setEditableParams(operation);
                    result = result.build(resultType);
                }

                if (trigonometric_functions.includes(operation.name)) {
                    const resultType = setResultType(result, logString);
                    result = TrigonometricOperators(operation.name)[
                        "trigonometric"
                    ];
                    result = result.build(resultType);
                }

                if (label_ranges.includes(operation.name)) {
                    const resultType = setResultType(result, logString);
                    result = RangeOperators(operation.name)["label_range"];
                    setRangeLabels(result, operation.labels);
                    result.updRange(operation.range || "$__interval");
                    if (operation.name === "quantile_over_time") {
                        result.setQuantile(operation.quantile);
                    }
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
                    result = LineFilterOperators(operation.name)["line_filter"];
                    result.setFilterText(operation.filterText || "");
                    result = result.build(resultType);
                }

                if (
                    label_filters.includes(operation.name) &&
                    operation?.labelFilter
                ) {
                    const resultType = setResultType(result, logString);
                    result = LabelFilterOperators(operation.name)?.[
                        "label_filter"
                    ];
                    result.setLabel(operation?.labelFilter?.label || "");
                    result.setOperator(
                        operation?.labelFilter?.operator || "equals"
                    );
                    result.setValue(operation?.labelFilter?.value || "");

                    result = result.build(resultType);
                }

                if (time_functions.includes(operation.name)) {
                    const resultType = setResultType(result, logString);
                    result = TimeFunctionOperators(operation.name)?.[
                        "time_function"
                    ];

                    result = result.build(resultType);
                }

                if (
                    binary_operations.includes(operation.name) &&
                    operation?.binaryOperation
                ) {
                    const resultType = setResultType(result, logString);
                    result = BinaryOperations(operation.name)?.[
                        "binary_operation"
                    ];
                    result.setValue(operation?.binaryOperation?.value || 1);
                    result.setBoolean(
                        operation?.binaryOperation?.bool || false
                    );
                    result = result.build(resultType);
                }
            });
        } else {
            result = logString;
        }
    }
    return result;
};


