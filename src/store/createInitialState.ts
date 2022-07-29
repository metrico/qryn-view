import moment, { Moment, MomentInput } from "moment";
import { nanoid } from "nanoid";
import { environment } from "../environment/env.dev";
import stateFromQueryParams from "../helpers/stateFromQueryParams";
import localService from "../services/localService";
import localUrl from "../services/localUrl";

export interface IsDebug {
    isActive: boolean;
}

const debugLocal = (): boolean => {
    const debugFromLocal: IsDebug = (JSON.parse(
        localStorage.getItem("isDebug") || JSON.stringify(false)
    ) as IsDebug) || { isActive: false };

    const isDebugItem: boolean = debugFromLocal.isActive === true;

    if (!isDebugItem) {
        localStorage.setItem("isDebug", JSON.stringify({ isActive: false }));
        return false;
    }

    return true;
};

export interface URLState {
    queryType: string;
    start: string | Date;
    time: string;
    to: string | null;
    stop: string | Date;
    end: string | Date;
    from: string | Date;
    left: any[];
    right: any[];
    label: string;
    limit: string | number;
    step: string | number;
    apiUrl: string;
    isSubmit: boolean;
    isEmbed: boolean;
    theme: string;
    isSplit: boolean;
}

export const initialUrlState = {
    queryType: "range",
    start: "",
    time: "",
    to: "",
    stop: "",
    end: "",
    from: "",
    left: [],
    right: [],
    label: "",
    limit: 100,
    step: 100,
    apiUrl: "",
    isSubmit: false,
    isEmbed: false,
    theme: "",
    isSplit: false,
};

export function date_fm(input: MomentInput): Moment {
    return moment(input);
}

export default function initialState() {
    const urlState: URLState = stateFromQueryParams() || initialUrlState;
    const historyService = localService().historyStore();
    const linkService = localUrl();
    const state = {
        debugMode: debugLocal() || false,
        labels: [],
        labelValues: [],
        queryHistory: historyService.getAll() || [],
        linksHistory: linkService.getAll() || [],
        timeRange: [],
        queryType: urlState.queryType || "range",
        logs: [],
        matrixData: [],
        vectorData: {},
        loading: false,
        queryResolution: 1,
        start:
            urlState.start ||
            new Date(
                moment(Date.now())
                    .subtract(5, "minutes")
                    .format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            ),
        time: urlState.time || "", // for instant queries
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
        // dont mention queries // its obvious
        left: urlState['left']||[
            {
                id: nanoid(),
                idRef: "A",
                lastIdx: 1,
                panel: "left",
                queryType: "instant",
                limit: 100,
                step: 100,
                tableView: false,
                browserOpen: false,
                expr: "",
                labels: [], // name: selected:
                values: [], // label name selected
                //find query by ID and append response
            },
        ],

        right: urlState['right']||[
            {
                id: nanoid(),
                idRef: "A",
                lastIdx: 1,
                panel: "right",
                queryType: "instant",
                limit: 100,
                step: 100,
                tableView: false,
                browserOpen: false,
                expr: "",
                labels: [], // name: selected:
                values: [], // label name selected
                //find query by ID and append response
            },
        ],

        leftDataView: {
            type: "",
            data: [],
        },
        rightDataView: {
            type: "",
            data: [],
        },

        chartType: "line",
        resposeType: "",
        notifications: [],
        tableData: {},
        isTableView: false,
        theme: urlState.theme || "dark",
        isEmptyView: false,
        isSplit: false,
    };

    const debug = state.debugMode;
    if (debug) console.log("🚧 LOGIC/ INITIAL STATE ::: ", state);

    return state;
}
