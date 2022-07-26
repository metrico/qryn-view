import { setPanelsData } from "../../../actions/setPanelsData";
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
            ?.flat() || [], // fix removing from array
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
        if (parseLog.isEqualsQuery(query, keyValue)) {
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

        if (
            !label.includes(key?.trim()) &&
            !label.includes(value?.trim()) &&
            !querySplitted?.some((s) => s.includes(key)) &&
            !querySplitted?.some((s) => s.includes(key) && s.includes(value))
        ) {
            // add new label
            let labelMod = op === "!=" ? keySubtValue : label;
            const parsed = parseLog.addLabel(op, labelMod, keyValue);
            const regs = parseLog.splitLabels(query).concat(parsed);
            return regs.join(",");
        }

        if (
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

        if (
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
            label?.includes("=~") &&
            label?.split("=~")?.[0]?.trim() === key?.trim() &&
            !label?.includes(value?.trim())
        ) {
            // add value to existing values group from label
            return parseLog.addValueToLabel(label, value, false);
        }

        if (
            label?.includes("=") &&
            label?.split("=")?.[0]?.trim() === key?.trim() &&
            label?.split('"')?.[1]?.trim() === value?.trim() &&
            querySplitted?.some((s) => s === label)
        ) {
            // remove label from query
            const filtered = querySplitted?.filter((f) => f !== label);
            return filtered?.join(",");
        }
    }
    return "";
}

export function decodeQuery(query, key, value, op) {
    const { newQuery, editQuery } = parseLog;
    const isQuery = query?.match(STREAM_SELECTOR_REGEX) && query?.length > 7;
    const keyValue = [key, value];
    const tags = query?.split(/[{}]/);

    if (!isQuery) {
        return newQuery(keyValue, op, tags);
    }

    return editQuery(query, keyValue, op, tags);
}

// can we get labels from store?

export function queryBuilder(labels, expr, hasPipe = false, pipeLabels = []) {
    // here we will take labels and values and match them
    // passing labels selected from each query
    // get actual query from props // => expr
    // get values from label

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

    const operator = () => {
        if (isInverted) {
            return "!=";
        }
        return "=";
    };

    const queryStr = decodeQuery(expr, key, val, operator());
    // here will return without braces\
    //
    //   return [preTags, "{", selectedLabels.join(","), "}", postTags].join("");

    const finalPanel = updatePanels(name, ["expr"], [queryStr], id);

    store.dispatch(setPanelsData(finalPanel));
}

const JSONClone = (arr) => {
    const arrToJSON = JSON.stringify(arr);
    const actArr = JSON.parse(arrToJSON);
    return actArr;
};

export function updatePanels(name, keys, vals, id) {
    const { panels } = store.getState();

    const panelName = name;
    const panel = panels[panelName];

    const actPanels = JSONClone(panels);

    let actQueries = JSONClone(panel?.queries);

    for (let query of actQueries) {
        if (query.id === id) {
            for (let key in keys) {
                query[[keys[key]]] = vals[key];
            }
        }
    }

    return {
        ...actPanels,
        [panelName]: {
            queries: [...actQueries],
        },
    };
}
