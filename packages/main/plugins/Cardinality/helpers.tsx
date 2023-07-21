import useCardinalityStore from "./store/CardinalityStore";

const getSeriesSelector = (label: string | null, value: string): string => {
    if (!label) {
        return "";
    }
    return "{" + label + "=" + JSON.stringify(value) + "}";
};

interface QueryUpdaterArgs {
    query: string;
    focusLabel: string;
    match: string;
}

export type QueryUpdater = {
    [key: string]: (args: QueryUpdaterArgs) => string;
};

export const queryUpdater: QueryUpdater = {
    seriesCountByMetricName: ({ query }): string => {
        return getSeriesSelector("__name__", query);
    },
    seriesCountByLabelName: ({ query }): string => {
        return `{${query}!=""}`;
    },
    seriesCountByFocusLabelValue: ({ query, focusLabel }): string => {
        return getSeriesSelector(focusLabel, query);
    },
    seriesCountByLabelValuePair: ({ query }): string => {
        const a = query.split("=");
        const label = a[0];
        const value = a.slice(1).join("=");
        return getSeriesSelector(label, value);
    },
    labelValueCountByLabelName: ({ query, match }): string => {
        if (match === "") {
            return `{${query}!=""}`;
        }
        return `${match.replace("}", "")}, ${query}!=""}`;
    },
};

export const handleFilterClick = (key: string, query: string) => {
    const {
        focusLabel,
        timeSeriesSelector: match,
        setFocusLabel,
        setTimeSeriesSelector,
    } = useCardinalityStore();

    const value = queryUpdater[key]({ query, focusLabel, match });

    setTimeSeriesSelector(value); 
    if (
        key === "labelValueCountByLabelName" ||
        key == "seriesCountByLabelName"
    ) {
        setFocusLabel(query);
    }
    if (key == "seriesCountByFocusLabelValue") {
        setFocusLabel("");
    }
};


function sortAsc(rows: any[]) {
    const mess = rows?.sort((a, b) => a.value - b.value);

    return mess;
}

function sortDesc(rows: any[]) {
    const mess = rows?.sort((a, b) => b.value - a.value);

    return mess;
}

function sortAscString(rows: any[]) {
    return rows.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
}

function sortDescString(rows: any[]) {
    return rows.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameB < nameA) {
            return -1;
        }
        if (nameB > nameA) {
            return 1;
        }

        // names must be equal
        return 0;
    });
}

export function sortByCol(rows, col, order) {
    const cb = {
        name: {
            asc: () => sortAscString(rows),
            desc: () => sortDescString(rows),
        },
        value: {
            asc: () => sortAsc(rows),
            desc: () => sortDesc(rows),
        },
    };
    return cb[col][order]();
}