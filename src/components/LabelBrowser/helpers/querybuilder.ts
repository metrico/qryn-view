import { setLeftPanel } from "../../../actions/setLeftPanel";
import { setRightPanel } from "../../../actions/setRightPanel";
import { useQueryParams } from "../../../helpers/useQueryParams";
import store from "../../../store/store";

export const PIPE_PARSE = [
    {
        label: "json",
    },
    {
        label: "regexp",
        text: 'regexp ""',
    },
    {
        label: "logfmt",
    },
    {
        label: "pattern",
    },
];

const pipeParseOpts = ["json", "regexp", "logfmt", "pattern", "~", "="];

const STREAM_SELECTOR_REGEX = /{[^}]*}/;

const parseLog = {
    newQuery: (keyValue: any[], op: any, tags: any[]) => {
        const [key, value] = keyValue;
        return `${tags[0] || ""}{${key}${op}"${value}"}${tags[2] || ""}`;
    },
    equalLabels: (keyValue: any[], op: any, tags: any[]) => {
        if (op === "!=") {
            return parseLog.newQuery(keyValue, op, tags);
        }

        return "{}";
    },
    formatQuery: (queryString: any, tags: any) => {
        return `${tags[0] || ""}{${queryString || ""}}${tags[2] || ""}`;
    },
    splitLabels: (query: string) =>
        query
            ?.match(/[^{}]+(?=})/g)
            ?.map((m) => m.split(","))
            ?.flat() || [],
    addLabel: (op: any, keySubtValue: any, keyValue: any) =>
        op === "!=" ? keySubtValue : keyValue,
    rmValueFromLabel: (label: any, value: any) => {
        const [lb, val] = label?.split("=~");
        let lvalue = val?.split(/[""]/)[1];
        let values = lvalue?.split("|");
        let filtered = values?.filter((f: any) => f.trim() !== value?.trim());

        if (filtered?.length > 1) {
            const lvalues = filtered?.join("|")?.trim();
            return lb?.trim() + "=~" + '"' + lvalues + '"';
        }
        const lvalues = filtered?.join("")?.trim();
        return lb?.trim() + "=" + '"' + lvalues + '"';
    },
    rmNonEqValueFromLabel: (label: any, value: any) => {
        const [lb, val] = label?.split("!~");
        let lvalue = val?.split(/[""]/)[1];
        let values = lvalue?.split("|");
        let filtered = values?.filter((f: any) => f.trim() !== value?.trim());

        if (filtered?.length > 1) {
            const lvalues = filtered?.join("|")?.trim();
            return lb?.trim() + "!~" + '"' + lvalues + '"';
        }
        const lvalues = filtered?.join("")?.trim();
        return lb?.trim() + "!=" + '"' + lvalues + '"';
    },
    addValueToLabel: (label: string, value: string, isEquals: boolean) => {
        let sign = isEquals ? "=" : "=~";
        const [lb, val] = label?.split(sign);
        const values = val?.split(/[""]/)[1];
        const labelmod = `${lb}=~"${values?.trim()}|${value?.trim()}"`;
        return labelmod;
    },
    addNonEqValueToLabel: (label: string, value: string, isEquals: boolean) => {
        let sign = isEquals ? "!=" : "!~";
        const [lb, val] = label?.split(sign);
        const values = val?.split(/[""]/)[1];
        const labelmod = `${lb}!~"${values?.trim()}|${value?.trim()}"`;
        return labelmod;
    },
    isEqualsQuery: (query: string, keyValue: any[]) => {
        const [key, value] = keyValue;
        return query === `{${key}="${value}"}`;
    },
    editQuery: (query: string, keyValue: any[], op: string, tags: any[]) => {
        if (parseLog.isEqualsQuery(query, keyValue) && keyValue !== null) {
            return parseLog.equalLabels(keyValue, op, tags);
        }
        return parseQuery.fromLabels(query, keyValue, op, tags);
    },
};
const parseQuery = {
    fromLabels: (query: string, keyVal: any[], op: string, tags: any[]) => {
        const queryString = parseQueryLabels(keyVal, query, op);

        return parseLog.formatQuery(queryString, tags);
    },
};

function parseQueryLabels(keyVal: any[], query: string, op: string) {
    const [key, value] = keyVal;
    const keyValue = `${key}="${value}"`;
    const keySubtValue = `${key}!="${value}"`;
    let queryArr = parseLog.splitLabels(query);

    if (!queryArr) {
        return "";
    }

    for (let label of queryArr) {
        const regexQuery = label.match(/([^{}=,~!]+)/gm);

        const querySplitted = parseLog.splitLabels(query);

        if (!regexQuery) {
            return "";
        }

        if (
            value !== null &&
            !label.includes(key?.trim()) &&
            !querySplitted?.some((s) => s.includes(key))
        ) {
            // add new label

            let labelMod = op === "!=" ? keySubtValue : label;

            const parsed = parseLog.addLabel(op, labelMod, keyValue);

            const regs = parseLog.splitLabels(query).concat(parsed);
            return regs.join(",");
        }

        if (
            value !== null &&
            label?.includes("=") &&
            label?.split("=")?.[0]?.trim() === key?.trim() &&
            !label?.includes(value)
        ) {
            // values group from existing label
            let labelMod = parseLog.addValueToLabel(label, value, true); // use this one for !=
            return parseLog
                .splitLabels(query)
                ?.join(",")
                ?.replace(`${label}`, labelMod);
        }

        if (
            value !== null &&
            label?.includes("=~") &&
            label?.split("=~")?.[0]?.trim() === key?.trim() &&
            label?.includes(value)
        ) {
            // filter value from existing values group from label
            const labelMod = parseLog.rmValueFromLabel(label, value);
            return parseLog
                .splitLabels(query)
                .join(",")
                .replace(`${label}`, labelMod);
        }

        if (
            value !== null &&
            label?.includes("=~") &&
            label?.split("=~")?.[0]?.trim() === key?.trim() &&
            !label?.includes(value?.trim())
        ) {
            // add value to existing values group from label
            return parseLog.addValueToLabel(label, value, false);
        }

        // value === null is used for clear
        if (
            label?.includes("=") &&
            label?.split("=")?.[0]?.trim() === key?.trim() &&
            (label?.split('"')?.[1]?.trim() === value?.trim() ||
                value === null) &&
            querySplitted?.some((s) => s === label)
        ) {
            // remove label from query
            const filtered = querySplitted?.filter((f) => f !== label);
            return filtered?.join(",");
        }
        if (
            label?.includes("!=") &&
            label?.split("!=")?.[0]?.trim() === key?.trim() &&
            (label?.split('"')?.[1]?.trim() === value?.trim() ||
                value === null) &&
            querySplitted?.some((s) => s === label)
        ) {
            // remove label from query
            const filtered = querySplitted?.filter((f) => f !== label);
            return filtered?.join(",");
        }

        if (
            label?.includes("!=") && // left all negative cases
            label?.split("!=")[0]?.trim() === key?.trim()
        ) {
            // values group from existing label
            let labelMod = parseLog.addNonEqValueToLabel(label, value, true); // use this one for !=
            return parseLog
                .splitLabels(query)
                ?.join(",")
                ?.replace(`${label}`, labelMod);
        }
        if (
            value !== null &&
            label?.includes("!~") &&
            label?.split("!~")?.[0]?.trim() === key?.trim() &&
            label?.includes(value)
        ) {
            // filter value from existing values group from label
            const labelMod = parseLog.rmNonEqValueFromLabel(label, value);
            return parseLog
                .splitLabels(query)
                .join(",")
                .replace(`${label}`, labelMod);
        }
        if (
            label?.includes("!=") &&
            label?.split("!=")?.[0]?.trim() === key?.trim() &&
            (label?.split('"')?.[1]?.trim() === value?.trim() ||
                value === null) &&
            querySplitted?.some((s) => s === label)
        ) {
            // remove label from query
            const filtered = querySplitted?.filter((f) => f !== label);
            return filtered?.join(",");
        }
    }

    return "";
}

export function decodeQuery(
    query: any,
    key: any,
    value: any,
    op: any,
    type: any
) {
    const { newQuery, editQuery } = parseLog;

    let keyValue = [key, value];

    let tags = query?.split(/[{}]/);
    const isQuery = query?.match(STREAM_SELECTOR_REGEX) && tags[1].length > 7;
    //
    if (tags[1]?.length < 1 && type === "metrics") {
        return `${value}{}`;
    }

    if (tags[1]?.length > 1 && type === "metrics") {
        return `${value}{${tags[1]}}`;
    }

    if (!isQuery && key !== "__name__") {
        return newQuery(keyValue, op, tags);
    }

    return editQuery(query, keyValue, op, tags);
}
export function queryBuilder(
    labels: any,
    expr: any,
    hasPipe = false,
    pipeLabels = []
) {
    const actualQuery = expr;
    const preTags = actualQuery.split("{")[0];
    let postTags = "";

  
    if (hasPipe) {
        postTags = actualQuery.split("}")[1];
        const json = /[|json]/;
        const expParse = actualQuery.split(json);
        if (pipeParseOpts.some((s) => expParse[1].includes(s))) {
            const pipeTags = ` | ${pipeLabels}`;
            postTags = postTags.toString().concat(pipeTags.toString());
        }
    } else {
        postTags = actualQuery.split("}")[1];
    }

    const selectedLabels = [];

    for (const label of labels) {
        if (label.selected && label.values && label.values.length > 0) {
            const selectedValues = label.values
                .filter((value: any) => value.selected && !value.inverted)
                .map((value: any) => value.name);

            const invertedSelectedValues = label.values
                .filter((value: any) => value.selected && value.inverted)
                .map((value: any) => value.name);

            if (selectedValues.length > 1) {
                selectedLabels.push(
                    `${label.name}=~"${selectedValues.join("|")}"`
                );
            } else if (selectedValues.length === 1) {
                selectedLabels.push(`${label.name}="${selectedValues[0]}"`);
            }
            invertedSelectedValues.forEach((value: any) => {
                selectedLabels.push(`${label.name}!="${value}"`);
            });
        }
    }
    return [preTags, "{", selectedLabels.join(","), "}", postTags].join("");
}

export function queryBuilderWithLabels(
    expr: any, // query expression
    name: any, // panel name
    id: any, // query id
    keyVal: any, // key / value
    isInverted = false,
    dataSourceType = "logs",
    hasPipe = false,
    pipeLabels = []
) {
    const [key, val] = keyVal;
    const dispatch = store.dispatch;
    const operator = () => {
        if (isInverted) {
            return "!=";
        }
        return "=";
    };
    const op = operator();
    const { left, right } = store.getState();


    const queryStr = decodeQuery(expr, key, val, op, dataSourceType); // this one should be the problem
    // here will return without braces

    if (name === "left") {
        const leftC = [...left];
        leftC.forEach((query) => {
            if (query.id === id) {
                query.expr = queryStr;
            }
        });
        dispatch(setLeftPanel(leftC));
    }

    if (name === "right") {
        const rightC = [...right];
        rightC.forEach((query) => {
            if (query.id === id) {
                query.expr = queryStr;
            }
        });
        dispatch(setRightPanel(rightC));
    }
}
