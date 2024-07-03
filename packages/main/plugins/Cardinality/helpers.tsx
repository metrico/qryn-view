import useCardinalityStore from "./store/CardinalityStore";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { LABEL_VALUE_STORE } from "./consts";
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

const labelsFreq = (arr: string[]) =>
    arr.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

/**
 *
 * @param labelsArray
 * @returns a string with the label / values selected
 */

export const getSeriesArraySelector = (labelsArray: string[]): string => {
    if (labelsArray?.length < 1) {
        return "";
    }

    let LabelsString = "{";
    let labelslength = labelsArray.length;

    let lsarray = [];
    // generate labels array splitting by equals or non equals
    for (let i = 0; i < labelslength; i++) {
        const [label] = labelsArray[i].split(/(=|!=)/);
        lsarray.push(label);
    }
    // check for frequency of same label
    const labelsFrequency = labelsFreq(lsarray);

    for (let i = 0; i < labelslength; i++) {
        let currentLabel = lsarray[i];
        // check if non equals label is hit and another one in the room is present
        if (
            labelsArray[i].includes("!=") &&
            labelsFrequency[currentLabel] > 1
        ) {
            continue;
        }

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
    query?: string;
    focusLabel?: string;
    match?: string;
    isDialog?: boolean;
}

export type QueryUpdater = {
    [key: string]: (args: QueryUpdaterArgs) => string;
};
// rmove localstorage on change when empty the input
export const queryUpdater: QueryUpdater = {
    seriesCountByMetricName: ({ query, match, isDialog }): string => {
        const query_with_label = `__name__=${query}`;

        if (!match) {
           !isDialog && localStorage.setItem(LABEL_VALUE_STORE, query_with_label);
            return getSeriesSelector("__name__", query);
        }

        const prev_match = match.replace(/[{}"]/g, "").replace(/[,]/g, " ");
        const prev_match_splitted = prev_match.split(" ");
        let queryStr = `${prev_match} ${query_with_label}`;
        const name_open_query = "__name__!=";
        const has_name_open_query =
            prev_match_splitted.includes(name_open_query);
        const has_query_with_label =
            prev_match_splitted.includes(query_with_label);

        if (has_name_open_query) {
            queryStr = prev_match_splitted
                .map((value) =>
                    value === name_open_query ? query_with_label : value
                )
                .join(" ");
        }

        if (has_query_with_label) {
            queryStr = prev_match;
        }

        !isDialog && localStorage.setItem(LABEL_VALUE_STORE, queryStr);
        const labelsArray = queryStr.split(" ");
        return getSeriesArraySelector(labelsArray);
    },

    //Labels with the highest number of series
    seriesCountByLabelName: ({ query, match, isDialog }): string => {
        const queryFormatted = `${query}!=`;
        const queryBrackets = `{${queryFormatted}""}`;

        if (queryBrackets === match) {
            return queryBrackets;
        }

        if (!match) {
            !isDialog && localStorage.setItem(LABEL_VALUE_STORE, `${queryFormatted}`);
            return queryBrackets;
        }

        const prev_match = match.replace(/[{}"]/g, "").replace(/[,]/g, " ");

        const previous_label_values_pairs_list = prev_match.split(" ");
        const previous_label_value_pairs_exists =
            previous_label_values_pairs_list.some(
                (value) => value.split("=")[0] === query
            );

        const previous_label_exists = previous_label_values_pairs_list.some(
            (value) => value === queryFormatted
        );

        let queryStr = `${prev_match} ${queryFormatted}`;

        if (previous_label_value_pairs_exists) {
            queryStr = previous_label_values_pairs_list
                .map((value) =>
                    value.split("=")[0] === query ? queryFormatted : value
                )
                .join(" ");
        }

        if (previous_label_exists) {
            queryStr = prev_match;
        }

       !isDialog && localStorage.setItem(LABEL_VALUE_STORE, queryStr);
        let labelsArray = queryStr.split(" ");
        return getSeriesArraySelector(labelsArray);
    },

    // Values for "${str}" label with the highest number of series`
    seriesCountByFocusLabelValue: ({ query, focusLabel }): string => {
        return getSeriesSelector(focusLabel, query);
    },

    //Label=value pairs with the highest number of series
    seriesCountByLabelValuePair: ({ query, match, isDialog }): string => {

        let previous_match;

        try {
            const prev = localStorage.getItem(LABEL_VALUE_STORE);
            
            if (prev) {
                previous_match = prev;
            } else if (match && match !== "") {
                previous_match = match;
            } else {
                previous_match = "";
            }
        } catch (e) {
            previous_match = "";
        }

        let queryStr = "";

        if (previous_match && !previous_match.includes(query)) {
            const striped = previous_match
                .replace(/[{}"]/g, "")
                .replace(/[,]/g, " ");


            const previous_striped_values = striped.split(" ");

            const query_splitted = query.split("=");

            const query_label = query_splitted[0] + "!=";

            if (previous_striped_values.includes(query_label)) {
                queryStr = previous_striped_values
                    .map((value) => (value === query_label ? query : value))
                    .join(" ");

            } else {
                queryStr = `${striped} ${query}`;
            }
    
           !isDialog && localStorage.setItem(LABEL_VALUE_STORE, queryStr);

        } else if (previous_match && previous_match.includes(query)) {

            let prevArray = previous_match.split(" ");
            let filtered = prevArray.filter((f) => f !== query);
            let joint = filtered.join(" ");
            queryStr = isDialog ? previous_match : joint 
            !isDialog && localStorage.setItem(LABEL_VALUE_STORE, joint);

        } else if (previous_match === "") {
            queryStr = query;
            !isDialog && localStorage.setItem(LABEL_VALUE_STORE, queryStr);
        }

        let labelsArray = queryStr.split(" ");
        return getSeriesArraySelector(labelsArray);
    },

    //Labels with the highest number of unique values
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

    let user_pass = { u: "", p: "" };

    if (isAuth) {
        let [user, password] = authData.fields.basicAuth;
        let passwordValue = password.value;
        let userValue = user.value;
        user_pass.u = user?.value;
        user_pass.p = password?.value;

        auth = serializeUserPassword(userValue, passwordValue);
    }

    return { url, auth, user_pass, headers: reqHeaders };
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

export function calcQuotaOverCardinality(cardinality: number, quota: number) {
    if (quota === 0) return 0;

    return (cardinality * 100) / quota;
}

export function isQuotaWarning(quotaOverCardinality: number) {
    if (quotaOverCardinality === 0) return false;
    return quotaOverCardinality > 60;
}
