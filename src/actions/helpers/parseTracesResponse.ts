import store from "../../store/store";
import { setLeftDataView } from "../setLeftDataView";
import { setRightDataView } from "../setRightDataView";
import {  TracesResult } from "../types";
import { parseVectorResponse } from "./parseVectorResponse";

function setDataView(panel: string) {
    if (panel === "left") {
        return {
            state: "leftDataView",
            action: setLeftDataView,
        };
    } else {
        return {
            state: "rightDataView",
            action: setRightDataView,
        };
    }
}

export async function parseTracesResponse(props: TracesResult) {
    const { result, debugMode, dispatch, panel, id, type,dsType, queryType, raw } = props;
    if (queryType === "trace-search") {
        await parseVectorResponse(props);
    } else {
        try {
            const panelResult = {
                id,
                type,
                dsType,
                tableData: {},
                data: result,
                raw,
                labels: [],
                total: result?.resourceSpans?.length,
            };

            const dataView = setDataView(panel);
            const { action, state } = dataView;
            const prevDV = store.getState()?.[state];
            if (prevDV.some((dv: any) => dv.id === panelResult.id)) {
                let newPanel = [];
                dispatch(action([]));
                const filtered = prevDV.filter(
                    (dv: any) => dv.id !== panelResult.id
                );
                newPanel = [...filtered, { ...panelResult }];
                dispatch(action(newPanel));
            } else {
                let newPanel = [...prevDV, panelResult];
                dispatch(action(newPanel));
            }
        } catch (e) {
            if (debugMode) {
                console.log(
                    " 🚧 getData / getting an error from rendering Traces type streams",
                    e
                );
            }
            console.log(e);
        }
    }
}
