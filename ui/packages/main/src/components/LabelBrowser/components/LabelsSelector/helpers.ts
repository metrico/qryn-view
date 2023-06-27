// helper for doing deep copy of array
const JSONClone = (arr: any) => {
    const arrToJSON = JSON.stringify(arr);
    const actArr = JSON.parse(arrToJSON);
    return actArr;
};

// helper for updating labels
const updateLabel = (prev: any, e: any) => {
    let newL = [];

    for (let label of prev) {
        if (label.name === e) {
            newL.push({
                ...label,
                selected: label.selected ? false : true,
            });
        } else {
            newL.push(label);
        }
    }

    return newL;
};

// helper for updating list of labels selected
const updateLabelSelected = (prev: any, e: any) => {
    if (prev.some((s: any) => s === e)) {
        return prev.filter((f: any) => f !== e);
    }
    return prev.concat(e);
};

const labelHelpers = {
    JSONClone,
    updateLabel,
    updateLabelSelected,
};
export default labelHelpers;

// takes the data stored referring datasourceid and query id
const getLocalQueryItem = (dataSourceId: string, id: string) => {
    let exprQuery = { expr: "", dataSourceId, queryId: id };
    try {
        const localData =
            JSON.parse(localStorage.getItem("queryData") || "[]") || [];
        if (localData && localData?.length > 0) {
            const fromLocal = localData?.find(
                (f: any) => f.dataSourceId === dataSourceId && f.queryId === id
            );
            if (fromLocal) {
                exprQuery = { ...fromLocal };
            }
            return exprQuery;
        } else {
            return exprQuery;
        }
    } catch (e) {
        console.error(e);
        return exprQuery;
    }
};

const getLocalQueryData = () => {
    try {
        const prevQuery = JSON.parse(localStorage.getItem("queryData") || "[]");
        return prevQuery;
    } catch (e) {
        return [];
    }
};

const getLocalDataSources = (dataSourceId: string) => {
    try {
        const localData = JSON.parse(
            localStorage.getItem("dataSources") || "[]"
        );
        return localData?.find((f: any) => f.id === dataSourceId);
    } catch (e) {
        return {};
    }
};

const setLocalQueryData = (expr: string, id: string, dataSourceId: string) => {
    const queryData = {
        expr,
        queryId: id,
        dataSourceId: dataSourceId,
    };

    const prevData = getLocalQueryData();
    let newData = [];

    if (
        prevData &&
        prevData.length > 0 &&
        Array.isArray(prevData) &&
        prevData.some(
            (s) => s.dataSourceId === dataSourceId && s.queryId === id
        )
    ) {
        newData = prevData.map((m) => {
            if (m.queryId === id && m.dataSourceId === dataSourceId) {
                return { ...queryData };
            } else {
                return m;
            }
        });
    } else {
        newData = [...prevData, queryData];
    }
    localStorage.setItem("queryData", JSON.stringify(newData));
};

export const QueryLocalService = {
    getLocalQueryItem,
    getLocalDataSources,
    setLocalQueryData,
};
