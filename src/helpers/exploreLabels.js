export function exploreLabels(labels, possibleLabels, lastFacetted = null) {
    return labels.map((label) => {
        const possibleValues = possibleLabels[label.name];
        if (possibleValues) {
            let existingValues;
            if (label.name === lastFacetted && label.values) {
                // Facetting this label, show all values
                existingValues = label.values;
            } else {
                // Keep selection in other facets
                const selectedValues = new Set(
                    label.values
                        ?.filter((value) => value.selected)
                        .map((value) => value.name) || []
                );
                // Values for this label have not been requested yet, let's use the facetted ones as the initial values
                existingValues = possibleValues.map((value) => ({
                    name: value,
                    selected: selectedValues.has(value),
                }));
            }
            return {
                ...label,
                loading: false,
                values: existingValues,
                facets: existingValues.length,
            };
        }

        // Label is facetted out, hide all values
        return {
            ...label,
            loading: false,
            hidden: !possibleValues,
            values: undefined,
            facets: 0,
        };
    });
}
