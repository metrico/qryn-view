import { setQuery } from "../../../actions";
import store from "../../../store/store";

export function queryBuilder(labels) {
    const actualQuery = store.getState().query
    const preTags = actualQuery.split("{")[0]
    const postTags = actualQuery.split("}")[1]
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
            invertedSelectedValues.forEach(value => {
                selectedLabels.push(`${label.name}!="${value}"`)
            });

        }
    }
    return [preTags,"{", selectedLabels.join(","), "}",postTags].join("");
}

export function queryBuilderWithLabels() {
    const labels = store.getState().labels;
   
  const query = queryBuilder(labels)
   store.dispatch(setQuery(query));
}
