import moment, { Moment, MomentInput } from "moment";
import { environment } from "../environment/env.dev";
import stateFromQueryParams from "../helpers/stateFromQueryParams";
import localService from "../services/localService";
import localUrl from "../services/localUrl";
import {
    defaultDataSources,
    defaultDatasourcesFieldTypes,
    defaultLinkedFieldTypes,
} from "../views/DataSources/store/defaults";

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
    autoTheme: boolean;
    isSplit: boolean;
}

export const initialUrlState: URLState = {
    queryType: "range",
    start: "",
    time: "",
    to: "",
    stop: "",
    from: "",
    left: [],
    right: [],
    label: "",
    limit: 100,
    step: 100,
    apiUrl: "",
    isSubmit: false,
    isEmbed: false,
    autoTheme: true,
    theme: "",
    isSplit: false,
};

export function date_fm(input: MomentInput): Moment {
    return moment(input);
}

export default function initialState() {
    const settingsState = () => {
        const dsSettings = localStorage.getItem("dataSources") || undefined;
        const lfSettings = localStorage.getItem("linkedFields") || undefined;
        let hasDsSettings = false;
        let hasLfSettings = false;
        let dataSourceSettings = [];
        let linkedFieldsSettings = [];
        if (dsSettings !== undefined) {
            hasDsSettings = true;
            try {
                dataSourceSettings = JSON.parse(dsSettings);
            } catch (e) {
                hasDsSettings = false;
                dataSourceSettings = [];
            }
        }

        if (lfSettings !== undefined) {
            hasLfSettings = true;
            try {
                linkedFieldsSettings = JSON.parse(lfSettings);
            } catch (e) {
                hasLfSettings = false;
                linkedFieldsSettings = [];
            }
        }

        return {
            hasDsSettings,
            hasLfSettings,
            dataSourceSettings,
            linkedFieldsSettings,
        };
    };
    const getDatasourceURL = (id:string) => {
        const localDatasources = JSON.parse(localStorage.getItem('dataSources')||'')
        return(localDatasources?.find((f:any) => f.id === 'id'))
    }

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
            urlState.stop ||
            new Date(moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSZ")),
        from: urlState.from || null,
        to: urlState.to || null,
        label: urlState.label,
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

        left: urlState["left"] || [
            {
                id: "widYlu_fXweET5D4",
                idRef: "L-A",
                lastIdx: 1,
                panel: "left",
                queryType: "range",
                dataSourceType: "logs",
                dataSourceId:'cHI2SqPzH_kxYRXj',
                dataSourceURL:getDatasourceURL('cHI2SqPzH_kxYRXj'),
                limit: 100,
                step: 100,
                tableView: false,
                chartView: false,
                isShowTs: true,
                hasStats:false,
                statsData:{},
                browserOpen: false,
                expr: "",
                labels: [], // name: selected:
                values: [], // label name selected
                direction: "forward",
                loading:false
            },
        ],

        right: urlState["right"] || [
            {
                id: "ndFM1zV-aow5hJ0P",
                idRef: "R-A",
                lastIdx: 1,
                panel: "right",
                queryType: "range",
                dataSourceType: "traces",
                dataSourceId:"32D16h5uYBqUUzhD",
                dataSourceURL:getDatasourceURL("32D16h5uYBqUUzhD"),
                limit: 100,
                step: 100,
                tableView: false,
                chartView: false,
                isShowTs: true,
                browserOpen: false,
                expr: "",
                labels: [], // name: selected:
                values: [], // label name selected
                direction: "forward",
                loading: false,
            },
        ],

        leftDataView: [],
        rightDataView: [],
        dataSources: settingsState()["hasDsSettings"]
            ? settingsState()["dataSourceSettings"]
            : defaultDataSources,
        linkedFieldTypes: defaultLinkedFieldTypes,
        dataSourcesFieldTypes: defaultDatasourcesFieldTypes,
        linkTypes: ["logs", "traces", "metrics", "flux"],
        visTypes: ["chart", "logs", "table", "trace", "graph"],
        chartType: "line",
        resposeType: "",
        notifications: [],
        tableData: {},
        isTableView: false,
        autoTheme: urlState.autoTheme || true,
        theme: urlState.theme || "light",
        isEmptyView: false,
        isSplit: false,
        showDataSourceSetting: true,
    };
    
    const debug = state.debugMode;
    if (debug) console.log("🚧 LOGIC/ INITIAL STATE ::: ", state);

    return state;
}
