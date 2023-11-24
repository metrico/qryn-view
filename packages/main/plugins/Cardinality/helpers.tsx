import useCardinalityStore from "./store/CardinalityStore";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { CardinalityRequest } from "./api/types";

const getSeriesSelector = (label: string | null, value: string): string => {
    if (!label) {
        return "";
    }
    return "{" + label + "=" + JSON.stringify(value) + "}";
};

export const getValuesArrayToString = (values: string[]): string => {
    if (!values?.length) {
        return '""';
    }

    return values?.map((value) => `\"${value}\"`).join(",");
};

/**
 *
 * @param labelsArray
 * @returns a string with the label / values selected
 */

const getSeriesArraySelector = (labelsArray: string[]): string => {
    if (labelsArray?.length < 1) {
        return "";
    }

    let LabelsString = "{";
    let labelslength = labelsArray.length;
    for (let i = 0; i < labelslength; i++) {
        const [lb, val] = labelsArray[i].split("=");

        LabelsString += `${lb}=\"${val}\"`;

        if (i === labelsArray.length - 1) {
            LabelsString += "}";
        } else {
            LabelsString += ",";
        }
    }
    return LabelsString;
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
        let previous_match;

        try {
            const prev = localStorage.getItem("labelValuePairs");
            if (prev) {
                previous_match = prev;
            } else {
                previous_match = "";
            }
        } catch (e) {
            previous_match = "";
        }

        let queryStr = "";

        if (previous_match && !previous_match.includes(query)) {
            queryStr = `${previous_match} ${query}`;

            localStorage.setItem("labelValuePairs", queryStr);
        } else if (previous_match && previous_match.includes(query)) {
            let prevArray = previous_match.split(" ");

            let filtered = prevArray.filter((f) => f !== query);

            let joint = filtered.join(" ");

            queryStr = joint;

            localStorage.setItem("labelValuePairs", joint);
        } else if (previous_match === "") {
            queryStr = query;

            localStorage.setItem("labelValuePairs", queryStr);
        }

        let labelsArray = queryStr.split(" ");

        return getSeriesArraySelector(labelsArray);
    },
    labelValueCountByLabelName: ({ query, match }): string => {
        if (match === "") {
            return `{${query}!=""}`;
        }
        return `${match.replace(/\}/gm, "")}, ${query}!=""}`;
    },
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

export const toTimeSeconds = (time: Date) => {
    return dayjs(time).unix();
};

export const timeMinusOneDay = (time: Date) => {
    return dayjs(time).subtract(1, "day").unix();
};

export const ConfiguratorBuilder = (
    server: string,
    reqState: CardinalityRequest
) => {
    const match = reqState.match
        ? `&match[]=${encodeURIComponent(reqState.match)}`
        : "";
    const focusLabel = reqState.focusLabel
        ? `&focusLabel=${encodeURIComponent(reqState.focusLabel)}`
        : "";
    return `${server}/api/v1/status/tsdb?topN=${reqState.topN}&date=${reqState.date}${match}${focusLabel}`;
};

function serializeUserPassword(user: string, password: string) {
    return `${btoa(user)}${password && password !== "" ? ":" : ""}${btoa(
        password
    )}`;
}

export const defaultCardinalityStatus = {
    totalSeries: 0,
    totalSeriesPrev: 0,
    totalSeriesByAll: 0,
    totalLabelValuePairs: 0,
    seriesCountByMetricName: [],
    seriesCountByLabelName: [],
    seriesCountByFocusLabelValue: [],
    seriesCountByLabelValuePair: [],
    labelValueCountByLabelName: [],
};

// gets the data from the dataSources
export const useDataSourceData = (type: string) => {
    const datasources = useSelector((store: any) => store.dataSources);

    let auth = ``;

    const {
        auth: authData,
        url,
        headers,
    } = datasources.find((f: any) => f.value === type);

    let reqHeaders = headers?.reduce(
        (obj, item) => Object.assign(obj, { [item.header]: item.value }),
        {}
    );

    const isAuth = authData.basicAuth.value;

    if (isAuth) {
        let [user, password] = authData.fields.basicAuth;
        let passwordValue = password.value;
        let userValue = user.value;

        auth = serializeUserPassword(userValue, passwordValue);
    }

    return { url, auth, headers: reqHeaders };
};

// gets the data from the  CardinalityStore
export const useStoreParams = () => {
    const {
        timeSeriesSelector: match,
        focusLabel,
        timeRange,
        limitEntries: topN,
        setDeletedQueries,
        date,
        reset,
    } = useCardinalityStore();
    return {
        match,
        focusLabel,
        topN,
        date,
        timeRange,
        reset,
        setDeletedQueries,
    };
};

export const sectionsTitles = (str: string | null): Record<string, string> => ({
    seriesCountByMetricName: "Metric names with highest number of series",
    seriesCountByLabelName: " Labels with the highest number of series",
    seriesCountByFocusLabelValue: `Values for "${str}" label with the highest number of series`,
    seriesCountByLabelValuePair:
        "Label=value pairs with the highest number of series", //  this is the one that should have multiple selection
    labelValueCountByLabelName:
        "Labels with the highest number of unique values",
});

export const tableHeaders: any = {
    seriesCountByMetricName: "Metric Name",
    seriesCountByLabelName: "Label name",
    seriesCountByFocusLabelValue: "Label value",
    seriesCountByLabelValuePair: "Label=value pair",
    labelValueCountByLabelName: "Label name",
};

export const getSectionTitle = (series: any, focusLabel?: string) => {
    return sectionsTitles(focusLabel ?? "metric")[Object.keys(series)[0]];
};

export const getHeaderSectionHeaderName = (series: any) => {
    return Object.keys(series)[0] as string;
};

export const getSectionHeader = (series: any) => {
    return tableHeaders[Object.keys(series)[0]];
};

export const getRows = (series: any) => {
    return series[Object.keys(series)[0]];
};

/**
 *
 * @param series
 * @param focusLabel
 * @returns the series props for cardinality groups
 */

export const getSeriesProps = (series: any, focusLabel?: string) => {
    return {
        title: getSectionTitle(series, focusLabel),
        sectionHeaderName: getHeaderSectionHeaderName(series),
        sectionHeader: getSectionHeader(series),
        rows: getRows(series),
    };
};
