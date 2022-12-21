import { nanoid } from "nanoid";
import { _LABELS_ITEM } from "./consts";
import localService from "./localService";

const { l_get, l_set, j_string, j_parse, cleanup } = localService();

const localLabels = () => {
    const get = () => {
        return l_get(_LABELS_ITEM);
    };
    const set = (item: any) => {
        l_set(_LABELS_ITEM, item);
    };

    const clean = () => {
        l_set(_LABELS_ITEM, j_string(cleanup));
        return getAll() || [];
    };

    const labelsStorage: any = get();

    const findById = (item: any) =>
        labelsStorage.find(({ id }: any) => item.id === id) || {};
    // add
    const add = (item: any) => {
        let previousData: any = get() || [];
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
    const update = (item: any) => {
        const { id } = item;

        let newStorage = [];

        try {
            newStorage = labelsStorage.map((m: any) =>
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
        const actualStorage = j_parse(l_get(_LABELS_ITEM) || 'null') || [];
        return actualStorage;
    }
    return { get, set, clean, add, update, findById, getAll };
};

export default localLabels;
