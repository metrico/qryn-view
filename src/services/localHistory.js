import { nanoid } from "nanoid";
import { _HISTORY_ITEM } from "./consts";
import { l_set, l_get, j_parse, j_string, cleanup } from "./localService";

const localHistory = () => {
    const get = () => {
        return j_parse(l_get(_HISTORY_ITEM));
    };

    const set = (data) => {
        l_set(_HISTORY_ITEM, j_string(data));
    };

    const clean = () => {
        l_set(_HISTORY_ITEM, j_string(cleanup));
        return getAll() || [];
    };

    const historyStorage = get();

    const findById = (item) =>
        historyStorage.find(({ id }) => item.id === id) || {};

    const add = (item) => {
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

    const update = (item) => {
        const { id } = item;

        let newStorage = [];

        try {
            newStorage = historyStorage.map((m) =>
                m.id === id ? { ...m, ...item } : m
            );
            set(newStorage);
            return getAll();
        } catch (e) {
            console.log(e);
        }
    };

    function getAll() {
        const actualStorage = j_parse(l_get(_HISTORY_ITEM)) || [];

        return (
            actualStorage?.map((m) => ({
                ...m,
                data: decodeURI(m.data),
            })) || []
        );
    }

    const remove = (item) => {
        const filtered = historyStorage.filter(({ id }) => id !== item.id);

        set(filtered);
        return getAll();
    };

    return { clean, get, set, update, add, remove, getAll, findById };
};

export default localHistory;
