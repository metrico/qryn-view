import * as moment from "moment";
import { environment } from "../environment/env.dev";
import stateFromQueryParams from "../helpers/stateFromQueryParams";
import localService from "../services/localService";
import localUrl from "../services/localUrl";
const debugLocal = () => {
    let isDebug = JSON.parse(localStorage.getItem("isDebug"));
    if (!isDebug) {
        localStorage.setItem("isDebug", JSON.stringify({ isActive: false }));
        isDebug = {isActive:false}
    } 

    return isDebug;
};

export default function initialState() {
    const urlState = stateFromQueryParams();
    const historyService = localService().historyStore();
    const linkService = localUrl();
    const state = {
        debugMode: debugLocal().isActive|| false,
        labels: [],
        labelValues: [],
        queryHistory: historyService.getAll() || [],
        linksHistory: linkService.getAll() || [],
        timeRange: [],
        query: urlState.query || "",
        queryType: urlState.queryType || 'range',
        logs: [],
        matrixData: [],
        vectorData:{},
        loading: false,
        queryResolution: 1,
        start:
            urlState.start ||
            new Date(
                moment(Date.now())
                    .subtract(5, "minutes")
                    .format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            ),
        time: urlState.time || '',
        stop:
            urlState.end ||
            new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        from: urlState.from || null,
        to: urlState.to || null,
        label: urlState.label || "Last 5 minutes",
        messages: [],
        limitLoad: false,
        limit: urlState.limit || 100,
        step: urlState.step || 100,
        rangeOpen: false,
        labelsBrowserOpen: true,
        settingsMenuOpen: false,
        timePickerOpen: false,
        settingsDialogOpen: false,
        historyOpen: false,
        apiErrors: "",
        urlQueryParams: urlState || {},
        urlLocation: "",
        apiUrl: urlState.apiUrl || environment.apiUrl || "",
        isSubmit: urlState.isSubmit || false,
        isEmbed: urlState.isEmbed || false,
        chartType: "line",
        notifications: [],
        tableData:{},
        theme: urlState.theme || "dark",
        isEmptyView: false,
    };
    const debug = state.debugMode;
    if (debug) console.log("???? LOGIC/ INITIAL STATE ::: ", state);

    return state;
}
