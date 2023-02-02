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

export const UnwrapBuilder: UnwrapFmtFn = () => ({
    result: "",
    setUnwrapFmt() {
        this.result += " | unwrap";
        return this.result;
    },
    build(initial: string) {
        this.result += initial + this.setUnwrapFmt();
        return this.result;
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
    build(initial: string, expression: string) {
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
    build(initial: string, expression: string) {
        this.setLine(initial);
        this.setText();
        return this.result;
    },
});

export const RangeBuilder: RangeFn = (rangeType) => ({
    result: "",

    range: "",

    setFn(initial: string) {
        this.result = `${rangeType}(${initial}`;
    },
    // range should be set before building always!
    setRange(range: string) {
        this.range = range;
    },
    setRate() {
        this.result += ` [${this.range}])`;
    },

    build(initial: string) {
        this.setFn(initial);
        this.setRate();
        return this.result;
    },
});

// * STEPS:

// - iniit      ==> res = RangeBuilder( rageType )

// - set range  ===> res.setRange('[range]')
// - build      ===> res.build()

export const LabelRangeBuilder: LabelRangeFn = (rangeType) => ({
    result: "",
    range: "",
    labels: [],
    labelsString: "",
    setFn(initial: string) {
        this.result = `${rangeType}(${initial}`;
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

