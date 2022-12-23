export type operator =
    | "equals"
    | "regexequals"
    | "excludeequals"
    | "regexexclude";

// interfaces
export interface Label {
    id: string;
    label: string;
    operator: operator;
    values: string[];
}

export interface LabelValueState {
    label: string;
    operator: string;
    values: Array<any>;
    id: string;
}

export interface operatorsTypes {
    equals: string | any;
    regexequals: string | any;
    excludeequals: string | any;
    regexexclude: string | any;
}
