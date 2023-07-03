import { useMemo } from "react";

export const useViewHeight = ({ type, actualQuery, total, dataView }: any) => {
    const viewHeight = useMemo(() => {
        const isMatrixTable = (type === "matrix" || type === "flux") && actualQuery?.tableView;
        const isStreamTable = type === "stream" && actualQuery?.tableView;
        let regularCont = "",
            maxCont = "",
            regularView = "",
            maxView = "";
        if (isMatrixTable) {
            const regRows = dataView?.tableData?.total * 25;
            const regCalc = regRows < 330 ? regRows : 330;

            regularCont = `${regCalc + 25}px`;
            regularView = `${regCalc}px`;
            maxCont = "fit-content";
            maxView = "fit-content";
        }

        if (type === "vector" || isStreamTable) {
            const regRows = total * 25;
            const regCalc = regRows < 330 ? regRows : 330;

            regularCont = `${regCalc + 25}px`;
            regularView = `${regCalc}px`;
            maxCont = "fit-content";
            maxView = "fit-content";
        }

        if (type === "stream" && !actualQuery?.tableView) {
            const regRows = total * 25;
            const regCalc = regRows < 350 ? "fit-content" : "inherit";
            regularCont = regCalc;
            regularView = regCalc;
            maxCont = "fit-content";
            maxView = "fit-content";
        }

        if ((type === "matrix" || type === "flux") && !actualQuery?.tableView) {
            regularCont = "fit-content";
            regularView = "400px";
            maxCont = "fit-content";
            maxView = "fit-content";
        }
        return { regularCont, regularView, maxCont, maxView };
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, type, actualQuery?.tableView]);

    return viewHeight;
};

export const useTableHeight = ({ total, panelSize, dataView }: any) => {
    let tableTotal = 0;
    if (dataView.type === "matrix") {
        tableTotal = dataView?.tableData?.total;
    } else {
        tableTotal = total;
    }
    const theight = useMemo(() => {
        const totalRows = tableTotal * 25;

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
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelSize]);

    return theight;
};

export const useActualQuery = ({ panel, dataView }: any) => {
    const actualQuery = useMemo(() => {
        let found = {};
        if (panel && dataView) {
            found = panel?.find((f: any) => f.id === dataView.id);
        }
        return found;
    }, [panel, dataView]);
    return actualQuery;
};
