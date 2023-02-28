// types
import {
    JSONBuilderFn,
    LogFmtFn,
    UnwrapFmtFn,
    UnPackFn,
    RegexFmtFn,
    PatternFmtFn,
    LineFmtFn,
    RangeFn,
    LabelRangeFn,
    AggregationsFn,
    AggregationsBTKFn,
    LineFilterFn,
    LabelFilterFn,
    BinaryOperationFn,
    TimeFunctionFn,
    TrigonometricFn,
    AggregationsOp,
    BTKAggregationsOp,
    AggrType,
    LineFilter,
    LabelFilter,
    BinaryOperation,
    TimeFunction,
    Trigonometric,
    RangeFunctionsFn,
} from "../types";

export const JSONBuilder: JSONBuilderFn = () => ({
    result: "",
    expressions: [],
    expressionsString: "",
    setJSON(initial: string) {
        if (initial !== "") {
            this.result += initial + " | json";
        }

        return this.result;
    },
    addExpression(expression: string) {
        this.expressions = [...this.expressions, expression];
    },

    setExpressions() {
        this.expressionsString = this.expressions.join(" ");
    },

    build(initial: string = "") {
        this.setJSON(initial);
        if (this.expressions.length > 0) {
            this.setExpressions();
            return this.result + " " + this.expressionsString;
        }
        return this.result;
    },
});

export const LogFmtBuilder: LogFmtFn = () => ({
    result: "",
    setLogFmt() {
        this.result += " | logfmt";
        return this.result;
    },
    build(initial: string) {
        this.result += initial + this.setLogFmt();
        return this.result;
    },
});

//

export const UnwrapBuilder: UnwrapFmtFn = () => ({
    result: "",
    labelValue: "",
    conversion_function: "",
    setLabelValue(labelValue) {
        this.labelValue = labelValue;
    },
    setConversionFn(conversion_function) {
        this.conversion_function = conversion_function;
    },

    setConversionFnString() {
        this.labelValue =
            this.conversion_function + "(" + this.labelValue + ")";
    },

    setUnwrapFmt() {
        this.result = " | unwrap ";
        if (this.labelValue !== "" && this.conversion_function === "") {
            this.result += ` ${this.labelValue}`;
        }
        if (this.conversion_function !== "") {
            this.setConversionFnString();
            this.result += `${this.labelValue}`;
        }
    },
    build(initial: string) {
        this.setUnwrapFmt();

        return initial + this.result;
    },
});

export const UnPackBuilder: UnPackFn = () => ({
    result: "",
    setUnPack() {
        this.result += " | unpack";
        return this.result;
    },
    build(initial: string) {
        this.result += initial + this.setUnPack();
        return this.result;
    },
});

export const RegexFmtBuilder: RegexFmtFn = () => ({
    result: "",
    expression: "",
    setRegex(initial: string) {
        this.result = initial + " | regexp";
    },
    setExpression(expression: string) {
        this.expression = expression || "";
    },
    setText() {
        this.result += " `" + this.expression + "`";
    },
    build(initial: string) {
        this.setRegex(initial);
        this.setText();
        return this.result;
    },
});

export const PatternFmtBuilder: PatternFmtFn = () => ({
    result: "",
    expression: "",
    setPattern(initial: string) {
        this.result = initial + " | pattern";
    },
    setExpression(expression: string) {
        this.expression = expression || "";
    },
    setText() {
        this.result += " `" + this.expression + "`";
    },
    build(initial: string) {
        this.setPattern(initial);
        this.setText();
        return this.result;
    },
});

export const LineFmtBuilder: LineFmtFn = () => ({
    result: "",
    expression: "",
    setLine(initial: string) {
        this.result = initial + " | line_format";
    },
    setExpression(expression: string) {
        this.expression = expression || "";
    },
    setText() {
        this.result += " `" + this.expression + "`";
    },
    build(initial: string) {
        this.setLine(initial);
        this.setText();
        return this.result;
    },
});

export const RangeBuilder: RangeFn = (rangeType) => ({
    result: "",
    range: "",
    setRange(range: string) {
        this.range = range;
    },
    setRate() {
        this.result += ` [${this.range}])`;
    },

    setFn(initial: string) {
        this.result = `${rangeType}(${initial}`;
    },
    build(initial: string) {
        this.setFn(initial);
        this.setRate();
        return this.result;
    },
});
export const RangeFunctionsBuilder: RangeFunctionsFn = (rangeType) => ({
    result: "",
    range: "",
    setRange(range: string) {
        this.range = range;
    },
    setRate() {
        this.result += ` [${this.range}])`;
    },

    setFn(initial: string) {
        this.result = `${rangeType}(${initial}`;
    },
    build(initial: string) {
        this.setFn(initial);
        this.setRate();
        return this.result;
    },
});
export const LabelRangeBuilder: LabelRangeFn = (rangeType) => ({
    result: "",
    range: "",
    labels: [],
    labelsString: "",
    quantile: 0.95,
    setFn(initial: string) {
        if (rangeType !== "quantile_over_time") {
            this.result = `${rangeType}(${initial}`;
        } else {
            this.result = `${rangeType}(${this.quantile}, ${initial}`;
        }
    },
    updRange(range: string) {
        this.range = range;
    },
    setRange() {
        this.result += `[${this.range}])`;
    },
    addLabel(label: string) {
        this.labels = [...this.labels, label];
    },

    setQuantile(quantile: number | string) {
        this.quantile = quantile;
    },

    setLabels() {
        this.labelsString = this.labels.join(",");
    },

    build(initial: string) {
        this.setFn(initial);
        this.setRange();
        if (this.labels.length > 0) {
            this.setLabels();
            return (this.result += ` by(${this.labelsString})`);
        }

        return this.result;
    },
});

export const AggregationsBuilder: AggregationsFn = (
    aggregationType: AggregationsOp
) => ({
    result: "",
    labels: [],
    labelString: "",
    aggrType: "by",
    aggrTypeString: "",
    setAggrType(type) {
        this.aggrType = type;
    },
    addLabel(label) {
        this.labels = [...this.labels, label];
    },
    setLabels() {
        this.labelString = this.labels.join(",");
    },
    setAggrTypeString() {
        this.aggrTypeString = `${this.aggrType}(${this.labelString})`;
    },
    setFn(initial) {
        this.result = `${aggregationType}(${initial})`;
    },
    build(initial) {
        this.setFn(initial);
        if (this.labels.length > 0) {
            this.setLabels();
            this.setAggrTypeString();
            this.result = `${aggregationType} ${this.aggrTypeString} (${initial})`;
        }
        return this.result;
    },
});

export const AggregationsBTKBuilder: AggregationsBTKFn = (
    aggregationType: BTKAggregationsOp
) => ({
    result: "",
    labels: [],
    labelString: "",
    kvalue: 5,
    aggrType: "by",
    aggrTypeString: "",

    setAggrType(type: AggrType) {
        this.aggrType = type;
    },
    setAggrTypeString() {
        this.aggrTypeString = `${this.aggrType}(${this.labelString})`;
    },
    addLabel(label) {
        this.labels = [...this.labels, label];
    },
    setLabels() {
        this.labelString = this.labels.join(",");
    },
    setKValue(kvalue: number) {
        this.kvalue = kvalue;
    },

    setFn(initial) {
        this.result = `${aggregationType} (${this.kvalue}, ${initial})`;
    },
    build(initial) {
        this.setFn(initial);

        if (this.labels.length > 0) {
            this.setLabels();
            this.setAggrTypeString();
            this.result = `${aggregationType} ${this.aggrTypeString} (${this.kvalue}, ${initial})`;
        }
        return this.result;
    },
});

// should add a selector by type

const line_filters: any = {
    line_contains: "|= `",
    line_does_not_contain: "!= `",
    line_contains_regex_match: "|~ `",
    line_does_not_match_regex: "!~ `",
    line_contains_case_insensitive: "|~ `(?i)",
    line_does_not_contain_case_insensitive: "!~ `(?i)",
    ip_line_filter_expression: "|= ip(`",
    ip_line_not_filter_expression: "!= ip(`",
};

const isIP = (txt: string) => txt.includes("ip_");

export const LineFilterBuilder: LineFilterFn = (linefilter: string) => ({
    result: "",
    filterText: "",
    lineFilter: line_filters[linefilter],
    setFilterText(filterText) {
        this.filterText = filterText;
    },
    setFn(initial) {
        this.result = `${initial} ${this.lineFilter}${this.filterText}`;
    },
    closeFn() {
        const closeType = isIP(linefilter) ? "`)" : "`";
        this.result += `${closeType}`;
    },
    build(initial) {
        this.setFn(initial);
        this.closeFn();
        return this.result;
    },
});

const label_filter: any = {
    equals: "=",
    not_equals: "!=",
    regex_equals: "=~",
    regex_not_equals: "!~",
    more: ">",
    less: "<",
    more_equals: ">=",
    less_equals: "<=",
};
const isNoErrors = (labelFilter: string) =>
    labelFilter === "no_pipeline_errors";
export const LabelFilterBuilder: LabelFilterFn = (labelfilter: string) => ({
    result: "",
    label: "",
    operator: "=",
    value: "",
    labelValueString: "",
    setLabel(label) {
        this.label = label;
    },
    setOperator(operator) {
        this.operator = label_filter[operator];
    },
    setValue(value) {
        this.value = value;
    },
    setFilterType(content) {
        return isIP(labelfilter)
            ? "ip(`" + content + "`)"
            : "`" + content + "`";
    },
    setLabelValueString() {
        this.labelValueString =
            " " +
            this.label +
            " " +
            this.operator +
            this.setFilterType(this.value);
    },
    setFn(initial) {
        if (!isNoErrors(labelfilter)) {
            this.setLabelValueString();
            this.result = `${initial} |${this.labelValueString}`;
        } else {
            this.result = initial + " | __error__=``";
        }
    },

    build(initial) {
        this.setFn(initial);
        return this.result;
    },
});

const binary_operation: any = {
    add_scalar: "+",
    subtract_scalar: "-",
    multiply_by_scalar: "*",
    divide_by_scalar: "/",
    modulo_by_scalar: "%",
    exponent: "^",
    equal_to: "==",
    not_equal_to: "!=",
    greater_than: ">",
    less_than: "<",
    greater_or_equal_to: ">=",
    less_or_equal_to: "<=",
    binary_operation_with_query: "",
};

export const BinaryOperationBuilder: BinaryOperationFn = (
    binaryOperation: string
) => ({
    result: "",
    value: "",
    bool: false,
    boolString: "",
    setValue(value) {
        this.value = value;
    },
    setBoolean(bool) {
        this.bool = bool;
    },
    setBooleanString() {
        this.boolString = this.bool ? "bool " : "";
    },
    setFn(initial) {
        this.result = `${initial} ${binary_operation[binaryOperation]} ${this.boolString}${this.value}`;
    },
    build(initial) {
        this.setBooleanString();
        this.setFn(initial);
        return this.result;
    },
});

export const TimeFunctionOperationBuilder: TimeFunctionFn = (timeFunction) => ({
    result: "",
    setFn(initial) {
        this.result = `${timeFunction}(${initial})`;
    },
    build(initial) {
        this.setFn(initial);
        return this.result;
    },
});
export const TrigonometricFunctionOperationBuilder: TrigonometricFn = (
    trigonometric
) => ({
    result: "",
    setFn(initial) {
        this.result = `${trigonometric}(${initial})`;
    },
    build(initial) {
        this.setFn(initial);
        return this.result;
    },
});
export const FormatOperators: any = {
    json: JSONBuilder,
    logfmt: LogFmtBuilder,
    unpack: UnPackBuilder,
    regexp: RegexFmtBuilder,
    pattern: PatternFmtBuilder,
    line_format: LineFmtBuilder,
    unwrap: UnwrapBuilder,
};

export const RangeOperators: any = (rangeType: any) => ({
    range: RangeBuilder(rangeType),
    label_range: LabelRangeBuilder(rangeType),
});

export const RangeFunctionsOperators: any = (rangeType: any) => ({
    range_function: RangeFunctionsBuilder(rangeType),
});

export const AggregationOperators: any = (
    aggregationType: AggregationsOp & BTKAggregationsOp
) => ({
    aggr: AggregationsBuilder(aggregationType),
    aggr_btk: AggregationsBTKBuilder(aggregationType),
});

export const LineFilterOperators: any = (linefilter: LineFilter) => ({
    line_filter: LineFilterBuilder(linefilter),
});

export const LabelFilterOperators: any = (labelfilter: LabelFilter) => ({
    label_filter: LabelFilterBuilder(labelfilter),
});

export const BinaryOperations: any = (binaryOperation: BinaryOperation) => ({
    binary_operation: BinaryOperationBuilder(binaryOperation),
});

export const TimeFunctionOperators: any = (timeFunction: TimeFunction) => ({
    time_function: TimeFunctionOperationBuilder(timeFunction),
});
export const TrigonometricOperators: any = (
    trigonometricOperation: Trigonometric
) => ({
    trigonometric: TrigonometricFunctionOperationBuilder(
        trigonometricOperation
    ),
});
