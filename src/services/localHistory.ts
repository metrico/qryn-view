import { nanoid } from "nanoid";
import { _HISTORY_ITEM } from "./consts";
import localService from "./localService";

const { l_set, l_get, j_parse, j_string, cleanup } = localService();

const localHistory = () => {
    const get = () => {
        return j_parse(l_get(_HISTORY_ITEM) || 'null');
    };

    const set = (data: any) => {
        l_set(_HISTORY_ITEM, j_string(data));
    };

    const clean = () => {
        l_set(_HISTORY_ITEM, j_string(cleanup));
        return getAll() || [];
    };

    const historyStorage = get();

    const findById = (item: any) =>
        historyStorage.find(({ id }: any) => item.id === id) || {};

    const add = (item: any) => {
        let previousData = get() || [];
        try {
            const newItem = {
                id: item.id || nanoid(),
                timestamp: item.timestamp || Date.now(),
                starred: item.starred || false,
                data: encodeURI(item.data) || "",
            };
            let newStorage = [newItem].concat(previousData);

            set(newStorage);
            return getAll();
        } catch (e) {
            console.log("error on add", e);
        }
    };

    const update = (item: any) => {
        const { id } = item;

        let newStorage = [];

        try {
            newStorage = historyStorage.map((m: any) =>
                m.id === id ? { ...m, ...item } : m
            );
            set(newStorage);
            return getAll();
        } catch (e) {
            console.log(e);
        }
    };

    function getAll() {
        const actualStorage = j_parse(l_get(_HISTORY_ITEM) || 'null') || [];

        return (
            actualStorage?.map((m: any) => ({
                ...m,
                data: decodeURI(m.data),
            })) || []
        );
    }

    const remove = (item: any) => {
        const filtered = historyStorage.filter(({ id }: any) => id !== item.id);

        set(filtered);
        return getAll();
    };

    return { clean, get, set, update, add, remove, getAll, findById };
};

export default localHistory;
