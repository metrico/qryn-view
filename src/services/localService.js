import { nanoid } from "nanoid";
import LocalStorageService from "./localStorage";

function localService(item = null) {
    /**
     * identify item type by name
     * identify data type by name
     * ITEM :  {
     *        name,
     *        data,
     *              }
     */
    const _APP = "cloki-query";
    const _HISTORY_ITEM = _APP + "-history-item";
    const _TIMERANGE_ITEM = _APP + "-time-range-item";
    const _CHART_ITEM = _APP + "-chart-item";
    const cleanup = [];

   // const itemType = item.name;
   // const itemData = item.data;

    function toBinary(string) {
        const codeUnits = new Uint16Array(string.length);
        console.log(codeUnits)
        for (let i = 0; i < codeUnits.length; i++) {
            codeUnits[i] = string.charCodeAt(i);
        }
        const charCodes = new Uint8Array(codeUnits.buffer);
        let result = "";
        for (let i = 0; i < charCodes.byteLength; i++) {
            result += String.fromCharCode(charCodes[i]);
        }
        return result;
    }

    function fromBinary(binary) {
        console.log(binary)
        const bytes = new Uint8Array(binary.length);
        console.log(bytes)
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const charCodes = new Uint16Array(bytes.buffer);
        let result = "";
        for (let i = 0; i < charCodes.length; i++) {
            result += String.fromCharCode(charCodes[i]);
        }
        return result;
    }

    function localEncode(string) {
        return btoa(toBinary(string));
    }

    function localDecode(string) {
        return atob(fromBinary(string));
    }

    const getStorageItem = (name) => {
        return localStorage.getItem(name);
    };

    const setStorageItem = (name,data) => {
        localStorage.setItem(name, data);
    };

    const historyStore = () => {
        const get = () => {
            return JSON.parse(getStorageItem(_HISTORY_ITEM));
        };

        const set = (data) => {
            setStorageItem(_HISTORY_ITEM, JSON.stringify(data));
        };

        const clean = () => {
            setStorageItem(_HISTORY_ITEM, JSON.stringify(cleanup));
        };

        const historyStorage = get();

        const findById = () => historyStorage.find(({ id }) => item.id === id);

        const getById = () => {
            const historyItem = findById();
            return historyItem || {};
        };

        const update = () => {
            const historyItem = findById();
            const updated = { ...historyItem, item };
            const newStorage = [...historyStorage];
            try {
                newStorage.forEach((itemStorage) => {
                    if (itemStorage.id === updated.id) {
                        itemStorage = { ...updated };
                    }
                });
                clean();
                set(newStorage);
            } catch (e) {
                console.log(e);
            }
        };

        const add = (item) => {
            let previousData = get() || []
            console.log(previousData)
            let previousStorage = historyStorage || []
            console.log(previousStorage)
            try {
                const newItem = {
                    id: item.id || nanoid(),
                    timestamp: item.timestamp || Date.now(),
                    starred: item.starred || false,
                    data: encodeURI(item.data) || "",
                };
                let newStorage = previousData.concat(newItem)
                
                
                set(newStorage);


            } catch(e) {
                console.log("error on add",e)
            }
    
        };

        const getAll = () => {
            return historyStorage.map((m) => ({
                ...m,
                data: decodeURI(m.data),
            })) || [];
        };

        const remove = (item) => {
            const filtered = [
                historyStorage.filter(({ id }) => id !== item.id),
            ];
            
            set(filtered);
        };

        return { clean, get, set, getById, update, add, remove, getAll };
    };

    return {
        historyStore,
    };
}

export default localService;