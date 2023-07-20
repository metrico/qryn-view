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
