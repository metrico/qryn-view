export function formatLabels(labels, defaultValue = "", withoutBraces = false) {
    if (!labels || Object.keys(labels).length === 0) {
        return defaultValue;
    }
    const labelKeys = Object.keys(labels).sort();
    const cleanSelector = labelKeys
        .map((key) => `${key}="${labels[key]}"`)
        .join(", ");
    if (withoutBraces) {
        return cleanSelector;
    }
    return ["{", cleanSelector, "}"].join("");
}
