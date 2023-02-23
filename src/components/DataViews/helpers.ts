export function toggleActiveStyles({showLabels}: any) {
    return showLabels
        ? "value-tags-container labelsActive"
        : "value-tags-container labelsInactive";
}

export function localTabsState({ id }: { id: string }) {
    try {
        const fromStorage = JSON.parse(
            localStorage.getItem("tabsState") || `{[${id}]:0}`
        );
        return fromStorage;
    } catch (e) {
        return { [id]: 0 };
    }
}