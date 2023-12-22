import { nanoid } from "nanoid";
import {
    setRightPanel,
    setLeftPanel,
    setRightDataView,
    setLeftDataView,
} from "@ui/store/actions";

export const getStoredQueries = (): Array<any> => {
    let stored = [];
    try {
        const fromStore =
            JSON.parse(localStorage.getItem("queryData") || "[]") || [];
        stored = [...fromStore];
        return stored;
    } catch (e) {
        return [];
    }
};

export function filterPanel(panel: any, id: string) {
    if (panel?.length > 1) {
        return panel?.filter((query: any) => query?.id !== id);
    } else {
        return panel;
    }
}

export const setStoredQuery = (queries: Array<any>): void => {
    localStorage.setItem("queryData", JSON.stringify(queries));
};
const filterQuery = (query: any, id: string) => query.queryId !== id;

export const filterLocal = (queries: Array<any>, id: string): Array<any> => {
    return queries.filter((f: any) => filterQuery(f, id));
};

export const deleteStoredQuery = (id: string): void => {
    const prevStored = getStoredQueries();

    if (prevStored?.length > 0) {
        const filtered = filterLocal(prevStored, id);
        setStoredQuery(filtered);
    }
};

const setNewPanel = (lastIdx: any, panel: any, idRef: any, data: any) => {
    const newQuery = {
        ...data,
        id: nanoid(),
        idRef,
        labels: [],
        expr: "",
        lastIdx: lastIdx + 1,
        cp: 0,
    };
    return [...panel, newQuery];
};

const getIdref = (lastIdx: any, idRefs: any[]) => {
    if (lastIdx > idRefs.length - 1) {
        return `${idRefs[0]}${lastIdx}`;
    } else {
        return idRefs[lastIdx];
    }
};

const getLastIndex = (panel: any) => {
    return panel[panel.length - 1].lastIdx;
};

export const setNewPanelData = (panel: any, data: any, idRefs: any[]) => {
    const lastIdx = getLastIndex(panel);
    const idRef = getIdref(lastIdx, idRefs);
    return setNewPanel(lastIdx, panel, idRef, data);
};

export const panelAction = (panel: any, data: any) => {
    if (panel === "left") {
        return setLeftPanel(data);
    } else {
        return setRightPanel(data);
    }
};

export const dataViewAction = (panel: any, data: any) => {
    if (panel === "left") {
        return setLeftDataView(data);
    } else {
        return setRightDataView(data);
    }
};

export const setLocalTabsState = (panel: string, queryId: string, value: number) => {
    try {
        const localTabs = JSON.parse(localStorage.getItem("localTabsState") || "{}");
        const panelState = localTabs[panel] || {};

        panelState[queryId] = value;
        localTabs[panel] = panelState;

        localStorage.setItem("localTabsState", JSON.stringify(localTabs));
    } catch (e) {
        console.log(e);
    }
};

export const getLocalTabsState = (panel: string, queryId: string) => {
    try {
        const tabsState = JSON.parse(localStorage.getItem("localTabsState") || "{}");
        return tabsState[panel]?.[queryId] || 0;
    } catch (e) {
        console.log(e);
        return 0;
    }
};