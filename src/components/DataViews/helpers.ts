export function toggleActiveStyles({showLabels}: any) {
    return showLabels
        ? "value-tags-container labelsActive"
        : "value-tags-container labelsInactive";
}

