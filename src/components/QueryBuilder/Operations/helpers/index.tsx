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


export interface UnwrapBuilderProps extends CommonFormatProps {
    setUnwrapFmt(): string;
}



export type UnwrapFmtFn = () => UnwrapBuilderProps;
// add each as a prop inside the main builder
//

export const UnwrapBuilder: UnwrapFmtFn = () => ({
    result: "",
    setUnwrapFmt(this: UnwrapBuilderProps) {
        this.result += " | unwrap";
        return this.result;
    },
    build(this: any, initial: string) {
        this.result += initial + this.setUnwrapFmt();
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
    expression:string;
    setRegex(intial: string): void;
    setExpression(expression: string): void;
    setText():void;
    build(initial: string): string;
}

export type RegexFmtFn = () => RegexFmtBuilderProps;

export const RegexFmtBuilder: RegexFmtFn = () => ({
    result: "",
    expression: "",
    setRegex(this: RegexFmtBuilderProps, initial: string) {
        this.result = initial + " | regexp";
    },
    setExpression(this: RegexFmtBuilderProps, expression: string) {
        this.expression = expression || ''
       
    },
    setText(this:RegexFmtBuilderProps) {
        this.result += " `" + this.expression + "`";
    },
    build(
        this: RegexFmtBuilderProps,
        initial: string,
    ) {
        this.setRegex(initial);
        this.setText()
        return this.result;
    },
});

export interface PatternFmtBuilderProps {
    result: string;
    expression: string;
    setPattern(intial: string): void;
    setExpression(expression: string): void;
    setText():void
    build(initial: string, expression: string): string;
}

export type PatternFmtFn = () => PatternFmtBuilderProps;

export const PatternFmtBuilder: PatternFmtFn = () => ({
    result: "",
    expression: "",
    setPattern(this: PatternFmtBuilderProps, initial: string) {
        this.result = initial + " | pattern";
    },
    setExpression(this: PatternFmtBuilderProps, expression: string) {
        this.expression = expression || '';
    },
    setText(this:PatternFmtBuilderProps ) {
        this.result += " `" + this.expression + "`";
    },
    build(
        this: PatternFmtBuilderProps,
        initial: string,
        expression: string
    ) {
        this.setPattern(initial);
        this.setText()
        return this.result;
    },
});

export interface LineFmtBuilderProps {
    result: string;
    expression: string;
    setLine(intial: string): void;
    setText():void;
    setExpression(expression: string): void;
    build(initial: string, expression: string): string;
}

export type LineFmtFn = () => LineFmtBuilderProps;

export const LineFmtBuilder: LineFmtFn = () => ({
    result: "",
    expression: "",
    setLine(this: LineFmtBuilderProps, initial: string) {
        this.result = initial + " | line_format";
    },
    setExpression(this: LineFmtBuilderProps, expression: string) {
        this.expression = expression || '';
    },
    setText(this:LineFmtBuilderProps ) {
        this.result += " `" + this.expression + "`";
    },
    build(this: LineFmtBuilderProps, initial: string, expression: string) {
        this.setLine(initial);
        this.setText()
        return this.result;
    },
});

export const FormatOperators:any = {
    json:JSONBuilder,
    logfmt: LogFmtBuilder,
    unpack: UnPackBuilder,
    regexp: RegexFmtBuilder,
    pattern: PatternFmtBuilder,
    line_format: LineFmtBuilder,
    unwrap: UnwrapBuilder

}