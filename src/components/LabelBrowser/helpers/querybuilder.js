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
    newQuery: (keyValue, op, tags) => {
        const [key, value] = keyValue;
        return `${tags[0] || ""}{${key}${op}"${value}"}${tags[2] || ""}`;
    },
    equalLabels: (keyValue, op, tags) => {
        if (op === "!=") {
            return parseLog.newQuery(keyValue, op, tags);
        }

        return "{}";
    },
    formatQuery: (queryString, tags) => {
        return `${tags[0] || ""}{${queryString || ""}}${tags[2] || ""}`;
    },
    splitLabels: (query) =>
        query
            ?.match(/[^{}]+(?=})/g)
            ?.map((m) => m.split(","))
            ?.flat() || [],
    addLabel: (op, keySubtValue, keyValue) => {
        if (op === "!=") {
            return keySubtValue;
        }
        return keyValue;
    },
    rmValueFromLabel: (label, value) => {
        const [lb, val] = label?.split("=~");
        let lvalue = val?.split(/[""]/)[1];
        let values = lvalue?.split("|");
        let filtered = values?.filter((f) => f.trim() !== value?.trim());

        if (filtered?.length > 1) {
            const lvalues = filtered?.join("|")?.trim();
            return lb?.trim() + "=~" + '"' + lvalues + '"';
        }
        const lvalues = filtered?.join("")?.trim();
        return lb?.trim() + "=" + '"' + lvalues + '"';
    },
    addValueToLabel: (label, value, isEquals) => {
        const sign = isEquals ? "=" : "=~";
        const [lb, val] = label?.split(sign);
        const values = val?.split(/[""]/)[1];
        const labelmod = `${lb}=~"${values?.trim()}|${value?.trim()}"`;
        return labelmod;
    },
    isEqualsQuery: (query, keyValue) => {
        const [key, value] = keyValue;
        return query === `{${key}="${value}"}`;
    },
    editQuery: (query, keyValue, op, tags) => {
        if (parseLog.isEqualsQuery(query, keyValue) && keyValue !== null) {
            return parseLog.equalLabels(keyValue, op, tags);
        }

        return parseQuery.fromLabels(query, keyValue, op, tags);
    },
};
const parseQuery = {
    fromLabels: (query, keyVal, op, tags) => {
        const queryString = parseQueryLabels(keyVal, query, op);
        return parseLog.formatQuery(queryString, tags);
    },
};

function parseQueryLabels(keyVal, query, op) {
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

        if ( value !== null &&
            !label.includes(key?.trim()) &&
            !querySplitted?.some((s) => s.includes(key))
        ) {
            // add new label
            let labelMod = op === "!=" ? keySubtValue : label;
            const parsed = parseLog.addLabel(op, labelMod, keyValue);
            const regs = parseLog.splitLabels(query).concat(parsed);
            return regs.join(",");
        }

        if ( value !== null &&
            label?.includes("=") &&
            label?.split("=")?.[0]?.trim() === key?.trim() &&
            !label?.includes(value)
        ) {
            // values group from existing label
            let labelMod = parseLog.addValueToLabel(label, value, true);
            return parseLog
                .splitLabels(query)
                ?.join(",")
                ?.replace(`${label}`, labelMod);
        }

        if ( value !== null &&
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

        if ( value !== null &&
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
            (label?.split('"')?.[1]?.trim() === value?.trim() || value === null) &&
            querySplitted?.some((s) => s === label)
        ) {
            // remove label from query
            const filtered = querySplitted?.filter((f) => f !== label);
            return filtered?.join(",");
        }
    }
    return "";
}

export function decodeQuery(query, key, value, op, type) {
    const { newQuery, editQuery } = parseLog;

    let keyValue = [key, value];
    let tags = query?.split(/[{}]/);
    const isQuery = query?.match(STREAM_SELECTOR_REGEX) && tags[1].length > 7;

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
export function queryBuilder(labels, expr, hasPipe = false, pipeLabels = []) {
    const actualQuery = expr;
    const preTags = actualQuery.split("{")[0];
    let postTags = "";

    const isRate = expr.startsWith('rate(') && expr.endsWith('[$__interval])')
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
                .filter((value) => value.selected && !value.inverted)
                .map((value) => value.name);

            const invertedSelectedValues = label.values
                .filter((value) => value.selected && value.inverted)
                .map((value) => value.name);

            if (selectedValues.length > 1) {
                selectedLabels.push(
                    `${label.name}=~"${selectedValues.join("|")}"`
                );
            } else if (selectedValues.length === 1) {
                selectedLabels.push(`${label.name}="${selectedValues[0]}"`);
            }
            invertedSelectedValues.forEach((value) => {
                selectedLabels.push(`${label.name}!="${value}"`);
            });
        }
    }
    return [preTags, "{", selectedLabels.join(","), "}", postTags].join("");
}

export function queryBuilderWithLabels(
    expr, // query expression
    name, // panel name
    id, // query id
    keyVal, // key / value
    isInverted = false,
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
    const { left, right } = store.getState();
    const queryStr = decodeQuery(expr, key, val, operator());
    // here will return without braces\
    //
    //   return [preTags, "{", selectedLabels.join(","), "}", postTags].join("");

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
