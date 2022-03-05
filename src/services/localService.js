import { nanoid } from "nanoid";
function localService(item = null) {

    const _APP = "cloki-query";
    const _HISTORY_ITEM = _APP + "-history-item";
    const _TIMERANGE_ITEM = _APP + "-time-range-item";
    const _CHART_ITEM = _APP + "-chart-item";
    const _LABELS_ITEM = _APP + '-labels-item';
    const cleanup = [];


    const getStorageItem = (name) => {
        return localStorage.getItem(name);
    };

    const setStorageItem = (name, data) => {
        localStorage.setItem(name, data);
    };
    const j_parse = (item) => JSON.parse(item)
    const j_string = (item) => JSON.stringify(item)
    const l_set = (item,value) => { localStorage.set(item,value) }
    const l_get = (item) => localStorage.get(item)
    const historyStore = () => {
        const get = () => {
            return JSON.parse(getStorageItem(_HISTORY_ITEM));
        };

        const set = (data) => {
            setStorageItem(_HISTORY_ITEM, JSON.stringify(data));
        };

        const clean = () => {
            setStorageItem(_HISTORY_ITEM, JSON.stringify(cleanup));
            return getAll()||[]
        };

        const historyStorage = get();

        const findById = () => historyStorage.find(({ id }) => item.id === id);

        const getById = () => {
            const historyItem = findById();
            return historyItem || {};
        };

        const update = (item) => {
            const { id } = item;

            let newStorage = [];

            try {
                newStorage = historyStorage.map((m) =>
                    m.id === id ? { ...m, ...item } : m
                );
                set(newStorage);
                return getAll()
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
                    starred: item.starred || false,
                    data: encodeURI(item.data) || "",
                };
                let newStorage = [newItem].concat(previousData);

                set(newStorage);
                return getAll()
            } catch (e) {
                console.log("error on add", e);
            }
        };

       function getAll() {
           const actualStorage = JSON.parse(localStorage.getItem(_HISTORY_ITEM))||[]

            return (
                actualStorage?.map((m) => ({
                    ...m,
                    data: decodeURI(m.data),
                })) || []
            );
        };

        const remove = (item) => {
            const filtered = historyStorage.filter(({ id }) => id !== item.id);

            set(filtered);
            return getAll()
        };

        return { clean, get, set, getById, update, add, remove, getAll };
    };

    const labelsStore = () => {
        const get = () => {
            return localStorage.getItem(_LABELS_ITEM);
        }
        const set = (item) => {
            localStorage.setItem(_LABELS_ITEM,item)
        }

        const clean = () => {
            setStorageItem(_LABELS_ITEM, JSON.stringify(cleanup));
            return getAll()||[]
        };

        function getAll(){
            const actualStorage = JSON.parse(localStorage.getItem(_LABELS_ITEM))||[]
            return actualStorage;
        }

    }
    return {
        historyStore,
        labelsStore,
        setStorageItem,
        getStorageItem,
        cleanup,
        j_parse,
        j_string,
        l_set,
        l_get
    };
}

export default localService;
