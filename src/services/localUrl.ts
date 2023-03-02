import { nanoid } from "nanoid";
import { _URL_ITEM } from "./consts";
import localService from "./localService";
import { format } from "date-fns";

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

    const add = (item: any, maxLength = Infinity) => {
        let previousData = get() || [];
        const { href, url, type, queryInput, queryType, limit, panel } =
            item.data;

        const { hash } = window.location;
        const origin = window.location.origin;
        const urlParams = new URLSearchParams(hash.replace(/#/, ""));
        let paramsData: any = {};
        urlParams.set("isSubmit", "true");
        for (let [key, value] of urlParams) {
            paramsData[key] = value;
        }
        const fromDate = format(
            parseInt(paramsData.start) / 1000000,
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
                params: paramsData || {},
                fromDate,
                toDate,
                data: `${origin}/#${urlParams.toString()}` || "",
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
