export function getInitialState(initialSortBy, columns) {

    const state = {};

    if (initialSortBy) {
        state.sortBy = [];
        for (const sortBy of initialSortBy) {
            for (const col of columns) {
                if (col.Header === sortBy.displayName) {
                    state.sortBy.push({ id: col.id, desc: sortBy.desc });
                }
            }
        }
    }
    return state;
}