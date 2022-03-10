import { nanoid } from "nanoid";
import { _LABELS_ITEM } from "./consts";
import { l_get, l_set, j_string, j_parse, cleanup } from "./localService";

const localLabels = () => {
    const get = () => {
        return l_get(_LABELS_ITEM);
    };
    const set = (item) => {
        l_set(_LABELS_ITEM, item);
    };

    const clean = () => {
        l_set(_LABELS_ITEM, j_string(cleanup));
        return getAll() || [];
    };

    const labelsStorage = get();

    const findById = (item) =>
        labelsStorage.find(({ id }) => item.id === id) || {};
    // add
    const add = (item) => {
        let previousData = get() || [];
        try {
            const newItem = {
                id: item.id || nanoid(),
                timestamp: item.timestamp || Date.now(),
                data: item.data || {},
            };
            let newStorage = [newItem].concat(previousData);
            set(newStorage);
            return getAll();
        } catch (e) {
            console.log(e);
        }
    };
    // update
    const update = (item) => {
        const { id } = item;

        let newStorage = [];

        try {
            newStorage = labelsStorage.map((m) =>
                m.id === id ? { ...m, ...item } : m
            );
            set(newStorage);
            return getAll();
        } catch (e) {
            console.log(e);
        }
    };
    // remove
    function getAll() {
        const actualStorage = j_parse(l_get(_LABELS_ITEM)) || [];
        return actualStorage;
    }
    return { get, set, clean, add, update, findById, getAll };
};

export default localLabels;
