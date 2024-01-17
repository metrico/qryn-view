import { nanoid } from "nanoid";
import { _URL_ITEM } from "./consts";
import localService from "./localService";
import { format } from "date-fns";

export type PanelData = {
    id: string;
    idRef: string;
    lastIdx: number;
    panel: string;
    queryType: string;
    dataSourceType: string;
    dataSourceURL: string;
    dataSourceId: string;
    limit: number;
    step: number;
    tableView: boolean;
    chartView: boolean;
    isShowTs: boolean;
    isBuilder: boolean;
    isLogsVolume: boolean;
    browserOpen: boolean;
    expr: string;
    labels: any[];
    values: any[];
    response: Response;
    open: boolean;
    start: string;
    time: string;
    stop: string;
    label: string;
    pickerOpen: boolean;
};

type UrlParamsData = {
    autoTheme?: string;
    isEmbed?: string;
    isSplit?: string;
    isSubmit?: string;
    left?: string;
    right?: string;
    step?: string;
    start?: string;
    stop?: string;
    theme?: string;
    time?: string;
};

type ItemData = {
    href?: string;
    url?: string;
    type?: string;
    start?: string;
    stop?: string;
    queryInput?: string;
    queryType?: string;
    limit?: number;
    panel?: string;
    id?: string;
};

export type UrlItem = {
    id?: string;
    data: ItemData;
    description: string;
    timestamp?: number;
};

const localUrl = () => {
    const { l_set, l_get, j_parse, j_string } = localService();

    const get = () => {
        return j_parse(l_get(_URL_ITEM) || "null");
    };

    const set = (item: any) => {
        return l_set(_URL_ITEM, j_string(item));
    };

    const clean = () => {
        localStorage.setItem(_URL_ITEM, JSON.stringify([]));
        return getAll() || [];
    };

    const urlStorage = get();

    const findById = (item: any) =>
        urlStorage.find(({ id }: any) => item.id === id) || {};

    const update = (item: any) => {
        const { id } = item;
        let newStorage = [];
        try {
            newStorage = urlStorage.map((m: any) =>
                m.id === id ? { ...m, ...item } : m
            );
            set(newStorage);
            return getAll();
        } catch (e) {
            console.log(e);
        }
    };

    const add = (hash: string, item: any, maxLength = Infinity) => {
        // we should pass the paeams here istead of parsing inside
        let previousData = get() || [];
        const { href, url, type, queryInput, queryType, limit, panel } =
            item.data;

        const origin = window.location.origin;
        const urlParams = new URLSearchParams(hash.replace(/#/, ""));

        let paramsData = {} as UrlParamsData;
        urlParams.set("isSubmit", "true");

        for (let [key, value] of urlParams) {
            paramsData[key] = value;
        }

        const fromDate = format(
            parseInt(paramsData?.start) / 1000000,
            "yyyy-MM-dd HH:mm:ss"
        );
        const toDate = format(
            parseInt(paramsData.stop) / 1000000,
            "yyyy-MM-dd HH:mm:ss"
        );

        try {
            const newItem = {
                url,
                href,
                type,
                queryInput,
                queryType,
                limit,
                panel,
                id: item.id || nanoid(),
                timestamp: item.timestamp || Date.now(),
                starred: false,
                description: item.description || "",
                params: (paramsData as UrlParamsData) || {},
                fromDate,
                toDate,
                data: `${origin}/#/search/#${urlParams.toString()}` || "",
            };
            let newStorage = [newItem].concat(previousData).slice(0, maxLength);
            set(newStorage);
            return getAll();
        } catch (e) {
            console.log(e);
        }
    };

    const remove = (item: any) => {
        const filtered = urlStorage?.filter(({ id }: any) => id !== item.id);
        set(filtered);
        return getAll();
    };
    const share = (item: any) => {
        const hash = item.urlParams;
        const origin = item.origin;
        return `${origin}/#${hash.toString()}`;
    };

    function getAll() {
        const actualStorage =
            JSON.parse(localStorage.getItem(_URL_ITEM) || "null") || [];
        return actualStorage;
    }

    return { clean, get, set, update, add, remove, getAll, findById, share };
};

export default localUrl;
