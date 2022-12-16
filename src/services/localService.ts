import { nanoid } from "nanoid";

function localService(item: any = null) {

    const _APP = "qryn-query";
    const _HISTORY_ITEM = _APP + "-history-item";
    const _LABELS_ITEM = _APP + '-labels-item';
    const cleanup: any[] = [];


    const getStorageItem = (name: string): string => {
        return localStorage.getItem(name) || 'null';
    };

    const setStorageItem = (name: string, data: string) => {
        localStorage.setItem(name, data);
    };
    
    const j_parse = (item: string) => JSON.parse(item)
    const j_string = (item: any) => JSON.stringify(item)
    const l_set = (item: string, value: string) => { localStorage.setItem(item,value) }
    const l_get = (item: string) =>  localStorage.getItem(item)
    const historyStore = () => {
        const get = () => {
            return JSON.parse(getStorageItem(_HISTORY_ITEM));
        };

        const set = (data: any) => {
            setStorageItem(_HISTORY_ITEM, JSON.stringify(data));
        };

        const clean = () => {
            setStorageItem(_HISTORY_ITEM, JSON.stringify(cleanup));
            return getAll()||[]
        };

        const historyStorage = get();

        const findById = () => historyStorage.find(({ id }: any) => item.id === id);

        const getById = () => {
            const historyItem = findById();
            return historyItem || {};
        };

        const update = (item: any) => {
            const { id } = item;

            let newStorage = [];

            try {
                newStorage = historyStorage.map((m: any) =>
                    m.id === id ? { ...m, ...item } : m
                );
                set(newStorage);
                return getAll()
            } catch (e) {
                console.log(e);
            }
        };

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
                return getAll()
            } catch (e) {
                console.log("error on add", e);
            }
        };

       function getAll() {
           const actualStorage = JSON.parse(localStorage.getItem(_HISTORY_ITEM) || 'null')||[]

            return (
                actualStorage?.map((m: any) => ({
                    ...m,
                    data: decodeURI(m.data),
                })) || []
            );
        };

        const remove = (item: any) => {
            const filtered = historyStorage.filter(({ id }: any) => id !== item.id);

            set(filtered);
            return getAll()
        };

        return { clean, get, set, getById, update, add, remove, getAll };
    };

    const labelsStore = () => {
        return function getAll(){
            const actualStorage = JSON.parse(localStorage.getItem(_LABELS_ITEM) || 'null')||[]
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
