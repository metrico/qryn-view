import { setQuery } from "../../../actions";
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

export function queryBuilder(labels, hasPipe = false, pipeLabels = []) {
    const actualQuery = store.getState().query;
    const preTags = actualQuery.split("{")[0];
    let postTags = "";

    if (hasPipe) {
        postTags = actualQuery.split("}")[1];
        const json = /[|json]/
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

export function queryBuilderWithLabels(hasPipe = false, pipeLabels = []) {

    const labels = store.getState().labels;
console.log(labels)
    const query = queryBuilder(labels, hasPipe, pipeLabels);

    store.dispatch(setQuery(query));
}
