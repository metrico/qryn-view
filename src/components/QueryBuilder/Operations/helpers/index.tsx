// this one should receive a callback with an event

interface CommonFormatProps {
    result: string;
    build(initial: string): string;
}

interface JSONBuilderObjProps extends CommonFormatProps {
    expressions: string[];
    expressionsString: string;
    setJSON(initial: string): string;
    addExpression(expression: string): void;
    removeExpression(expression: string): void;
    setExpressions(): void;
}

type JSONBuilderFn = () => CommonFormatProps;

export const JSONBuilder: JSONBuilderFn = () => ({
    result: "",
    expressions: [],
    expressionsString: "",
    setJSON(this: JSONBuilderObjProps, initial: string) {
        if (initial !== "") {
            this.result += initial + " | json";
        }

        return this.result;
    },
    addExpression(this: JSONBuilderObjProps, expression: string) {
        this.expressions = [...this.expressions, expression];
    },
    removeExpression(this: JSONBuilderObjProps, expression: string) {
        this.expressions = this.expressions.filter((f) => f !== expression);
    },
    setExpressions(this: JSONBuilderObjProps) {
        this.expressionsString = this.expressions.join(" ");
    },

    build(this: JSONBuilderObjProps, initial: string = "") {
        this.setJSON(initial);
        if (this.expressions.length > 0) {
            this.setExpressions();
            return this.result + " " + this.expressionsString;
        }
        return this.result;
    },
});

export interface LogFmtBuilderProps extends CommonFormatProps {
    setLogFmt(): string;
}

export type LogFmtFn = () => LogFmtBuilderProps;
// add each as a prop inside the main builder
//

export const LogFmtBuilder: LogFmtFn = () => ({
    result: "",
    setLogFmt(this: LogFmtBuilderProps) {
        this.result += " | logfmt";
        return this.result;
    },
    build(this: any, initial: string) {
        this.result += initial + this.setLogFmt();
        return this.result;
    },
});

export interface UnPackBuilderProps extends CommonFormatProps {
    setUnPack(): string;
}

export type UnPackFn = () => UnPackBuilderProps;
// add each as a prop inside the main builder
//

export const UnPackBuilder: UnPackFn = () => ({
    result: "",
    setUnPack(this: UnPackBuilderProps) {
        this.result += " | unpack";
        return this.result;
    },
    build(this: any, initial: string) {
        this.result += initial + this.setUnPack();
        return this.result;
    },
});

export interface RegexFmtBuilderProps {
    result: string;
    setRegex(intial: string): void;
    setExpression(expression: string): void;
    buildRegex(initial: string, expression: string): string;
}

export type RegexFmtFn = () => RegexFmtBuilderProps;

export const RegexFmtBuilder: RegexFmtFn = () => ({
    result: "",
    setRegex(this: RegexFmtBuilderProps, initial: string) {
        this.result = initial + " | regex";
    },
    setExpression(this: RegexFmtBuilderProps, expression: string) {
        this.result += " `" + expression + "`";
    },
    buildRegex(
        this: RegexFmtBuilderProps,
        initial: string,
        expression: string
    ) {
        this.setRegex(initial);
        this.setExpression(expression);
        return this.result;
    },
});

export interface PatternFmtBuilderProps {
    result: string;
    setPattern(intial: string): void;
    setExpression(expression: string): void;
    buildPattern(initial: string, expression: string): string;
}

export type PatternFmtFn = () => PatternFmtBuilderProps;

export const PatternFmtBuilder: PatternFmtFn = () => ({
    result: "",
    setPattern(this: PatternFmtBuilderProps, initial: string) {
        this.result = initial + " | pattern";
    },
    setExpression(this: PatternFmtBuilderProps, expression: string) {
        this.result += " `" + expression + "`";
    },
    buildPattern(
        this: PatternFmtBuilderProps,
        initial: string,
        expression: string
    ) {
        this.setPattern(initial);
        this.setExpression(expression);
        return this.result;
    },
});

export interface LineFmtBuilderProps {
    result: string;
    setLine(intial: string): void;
    setExpression(expression: string): void;
    buildLine(initial: string, expression: string): string;
}

export type LineFmtFn = () => LineFmtBuilderProps;

export const LineFmtBuilder: LineFmtFn = () => ({
    result: "",
    setLine(this: LineFmtBuilderProps, initial: string) {
        this.result = initial + " | line_format";
    },
    setExpression(this: LineFmtBuilderProps, expression: string) {
        this.result += " `" + expression + "`";
    },
    buildLine(this: LineFmtBuilderProps, initial: string, expression: string) {
        this.setLine(initial);
        this.setExpression(expression);
        return this.result;
    },
});
