import { FormatOperators, RangeOperators } from "../../../../QueryBuilder/Operations/builders";
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


const isSingleExpression = (expr: string) =>["line_format", "regexp", "pattern"].includes(expr);


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
        });
    }
    return result;
};
