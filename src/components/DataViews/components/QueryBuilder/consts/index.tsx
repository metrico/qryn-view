import { nanoid } from "nanoid";
import { operatorsTypes, Label } from "../types";
import {useMemo} from 'react'
export const OPERATOR_OPTIONS = [
    { label: "=", value: "equals" },
    { label: "=~", value: "regexequals" },
    { label: "!=", value: "excludeequals" },
    { label: "!~", value: "regexexclude" },
];

export const OPERATORS: operatorsTypes | any = {
    equals: "=",
    regexequals: "=~",
    excludeequals: "!=",
    regexexclude: "!~",
};

export const InitialLabelValueState: Label[] = [
    { label: "", operator: "equals", values: [], id: nanoid() },
];
export const NewLabel: Label = {
    label: "",
    operator: "equals",
    values: [],
    id: nanoid(),
};

export const EmptyOption = { label: "", value: "" };

export const useInitialOperation =() => useMemo(()=>({
    id: 0,
    name: "none",
    header: <div>{"Container Header"}</div>,
}),[]);