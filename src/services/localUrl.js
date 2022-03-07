import { nanoid } from "nanoid";
import { _HISTORY_ITEM, _URL_ITEM } from "./consts";
import localService from "./localService";


const localUrl = () => {

    const {l_set, l_get, cleanup, j_parse, j_string} = localService()

    const get = () => {
        return j_parse(l_get(_URL_ITEM));
    };
    const set = (item) => {
        return l_set(_URL_ITEM, j_string(item));
    };
    const clean = () => {
        l_set(_URL_ITEM, j_string(cleanup));
    };
    const urlStorage = get();

    const findById = (item) =>
        urlStorage.find(({ id }) => item.id === id) || {};

    const update = (item) => {
        const { id } = item;
        let newStorage = [];
        try {
            newStorage = urlStorage.map((m) =>
                m.id === id ? { ...m, ...item } : m
            );
            set(newStorage);
            return getAll();
        } catch (e) {
            console.log(e);
        }
    };
    const add = (item) => {
        let previousData = get() || [];
        try {
            const newItem = {
                id: item.id || nanoid(),
                timestamp: item.timestamp || Date.now(),
                description: item.description || "",
                data: item.data || "",
            };
            let newStorage = [newItem].concat(previousData);
            set(newStorage);
            return getAll();
        } catch (e) {
            console.log(e);
        }
    };

    const remove = (item) => {
        const filtered = urlStorage.filter(({ id }) => id !== item.id);
        set(filtered);
        return getAll();
    };

    function getAll() {
        const actualStorage = j_parse(l_get(_HISTORY_ITEM)) || [];
        return actualStorage;
    }

    return { clean, get, set, update, add, remove, getAll, findById };
};

export default localUrl;
