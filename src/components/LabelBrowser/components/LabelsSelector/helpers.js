// helper for doing deep copy of array
const JSONClone = (arr) => {
    const arrToJSON = JSON.stringify(arr);
    const actArr = JSON.parse(arrToJSON);
    return actArr;
};

// helper for updating labels
const updateLabel = (prev, e) => {
    let newL = [];

    for (let label of prev) {
        if (label.name === e) {
            newL.push({
                ...label,
                selected: label.selected ? false : true,
            });
        } else {
            newL.push(label);
        }
    }

    return newL;
};

// helper for updating list of labels selected
const updateLabelSelected = (prev, e) => {
    if (prev.some((s) => s === e)) {
        return prev.filter((f) => f !== e);
    }
    return prev.concat(e);
};

const labelHelpers = {
    JSONClone,
    updateLabel,
    updateLabelSelected,
};
export default labelHelpers;
