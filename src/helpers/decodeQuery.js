import { setLabels } from "../actions";
import loadLabelValues from "../actions/loadLabelValues";
import store from "../store/store";

export function decodeQuery(query, apiUrl, labels = []) {

   if(typeof query !== 'string'){
    return
   }
    const queryArr = query
        ?.match(/[^{\}]+(?=})/g, "$1")
        ?.map((m) => m.split(","))
        ?.flat();

    const labelsFromQuery = [];

    queryArr?.forEach((label) => {
        const regexQuery = label.match(/([^{}=,~!]+)/gm);
        if (!regexQuery) {
            return;
        }
        if (label.includes("!=")) {
            const labelObj = {
                name: regexQuery[0],
                values: [],
            };
            const valueObj = {
                name: regexQuery[1]?.replaceAll('"', ""),
                selected: true,
                inverted: true,
            };

            labelObj.values.push(valueObj);
            labelsFromQuery.push(labelObj);
        } else if (label.includes("=~")) {
            const values = regexQuery[1]?.split("|");
            const labelObj = {
                name: regexQuery[0],
                values: [],
            };

            values.forEach((value) => {
                const valueObj = {
                    name: value?.replaceAll('"', ""),
                    selected: true,
                    inverted: false,
                };

                labelObj.values.push(valueObj);
            });

            labelsFromQuery.push(labelObj);
        } else {
            const labelObj = {
                name: regexQuery[0],
                values: [],
            };
            const valueObj = {
                name: regexQuery[1]?.replaceAll('"', ""),
                selected: true,
                inverted: false,
            };
            labelObj.values.push(valueObj);
            labelsFromQuery.push(labelObj);
        }
    });

    const newLabels = [...labels] || [];

    newLabels?.forEach((label) => {
        if (label.selected && label.values.length > 0) {
            label.selected = false;
            label.values.forEach((value) => {
                if (value.selected) {
                    value.selected = false;
                }
            });
        }
    });

    if (labelsFromQuery.length > 0) {
        let labelsWithValues = [];

        labelsFromQuery.forEach(async (label) => {
            const cleanLabel = newLabels?.find(
                (item) => item?.name === label?.name
            );
            if (!cleanLabel) {
                return;
            }

            // should load values into query label

            await store.dispatch(
                loadLabelValues(cleanLabel, newLabels, apiUrl)
            );

            const labelsWithValues = labels;
            const labelWithValues = labelsWithValues.find(
                (item) => item?.name === label?.name
            );
            let values = labelWithValues?.values;

            values = label?.values?.concat(values);

            values = values
                .sort((a, b) => a.name.localeCompare(b.name))
                .filter((value, index, arr) => {
                    return value?.name !== arr?.[index - 1]?.name;
                })
                .filter((value) => !!value);

            labelWithValues.values = values;
            labelWithValues.selected = true;
        });

        /// here we should update the labels from actual query

        store.dispatch(setLabels(labelsWithValues));
    }
}

/// key label separator group

// it returns the labels to update at query state
export function decodeExpr(expr) {

    let labelsFromQuery = [];

    if (expr.length > 7) {
            const exprArr = expr
        ?.match(/[^{\}]+(?=})/g, "$1")
        ?.map((m) => m.split(","))
            ?.flat();
        
    exprArr?.forEach((label) => {
        const regexQuery = label.match(/([^{}=,~!]+)/gm);

        if (!regexQuery) {
            return;
        }

        if (label.includes("!=")) {
            const labelObj = {
                name: regexQuery[0].trim(),
                selected: false,
                values: [],
            };

            const valueObj = {
                name: regexQuery[1]?.replaceAll('"', ""),
                selected: true,
                inverted: true,
            };

            labelObj.values.push(valueObj);
            labelsFromQuery.push(labelObj);
        } else if (label.includes("=~")) {
            const values = regexQuery[1]?.trim().split("|");
            const labelObj = {
                name: regexQuery[0].trim(),
                selected: true,
                values: [],
            };

            values.forEach((value) => {
                const valueObj = {
                    name: value?.replaceAll('"', ""),
                    selected: true,
                    inverted: false,
                };

                labelObj.values.push(valueObj);
            });

            labelsFromQuery.push(labelObj);
        } else {
            const labelObj = {
                name: regexQuery[0].trim(),
                selected: true,
                values: [],
            };

            const valueObj = {
                name: regexQuery[1]?.replaceAll('"', ""),
                selected: true,
                inverted: false,
            };
            labelObj.values.push(valueObj);
            labelsFromQuery.push(labelObj);
        }
    });
    }


    return labelsFromQuery;
}
