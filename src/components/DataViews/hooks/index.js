import { useMemo } from "react";

export const useViewHeight = ({ type, actualQuery, total }) => {
    const viewHeight = useMemo(() => {
        const isMatrixTable = type === "matrix" && actualQuery?.tableView;
        const isStreamTable = type === "stream" && actualQuery?.tableView;
        let regularCont = "",
            maxCont = "",
            regularView = "",
            maxView = "";
        if (type === "vector" || isMatrixTable || isStreamTable) {
            const regRows = total * 20;
            const regCalc = regRows < 330 ? regRows : 330;

            regularCont = `${regCalc + 20}px`;
            regularView = `${regCalc}px`;
            maxCont = "fit-content";
            maxView = "fit-content";
        }

        if (type === "stream" && !actualQuery?.tableView) {
            const regRows = total * 20;
            const regCalc = regRows < 350 ? "fit-content" : "350px";
            regularCont = regCalc;
            regularView = regCalc;
            maxCont = "fit-content";
            maxView = "fit-content";
        }

        if (type === "matrix" && !actualQuery?.tableView) {
            regularCont = "fit-content";
            regularView = "350px";
            maxCont = "fit-content";
            maxView = "fit-content";
        }
        return { regularCont, regularView, maxCont, maxView };
    }, [total, type, actualQuery?.tableView]);

    return viewHeight;
};

export const useTableHeight = ({ total, panelSize }) => {
    const theight = useMemo(() => {
        const totalRows = total * 20;

        if (panelSize === "max") {
            return totalRows;
        }
        if (panelSize === "min") {
            return 0;
        }
        if (panelSize === "regular") {
            return totalRows < 310 ? totalRows : 310;
        } else {
            return totalRows < 310 ? totalRows : 310;
        }
    }, [panelSize]);

    return theight;
};

export const useActualQuery = ({ panel, dataView }) => {
    const actualQuery = useMemo(() => {
        let found = {};
        if (panel && dataView) {
            found = panel?.find((f) => f.id === dataView.id);
        }
        return found;
    }, [panel, dataView]);
    return actualQuery;
};
