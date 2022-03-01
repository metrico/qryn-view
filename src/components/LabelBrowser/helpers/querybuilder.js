
export function queryBuilder(labels) {
    const selectedLabels = [];
    for (const label of labels) {
        if (label.selected && label.values && label.values.length > 0) {
            const selectedValues = label.values
                .filter((value) => value.selected)
                .map((value) => value.name);
            if (selectedValues.length > 1) {
                selectedLabels.push(
                    `${label.name}=~"${selectedValues.join("|")}"`
                );
            } else if (selectedValues.length === 1) {
                selectedLabels.push(`${label.name}="${selectedValues[0]}"`);
            }
        }
    }
    return ["{", selectedLabels.join(","), "}"].join("");
}
