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
        return `${match.replace(/\}/gm, "")}, ${query}!=""}`;
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
        date,
    } = useCardinalityStore();
    return { match, focusLabel, topN, date, timeRange };
};
