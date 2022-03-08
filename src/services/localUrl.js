import { nanoid } from "nanoid";
import { _HISTORY_ITEM, _URL_ITEM } from "./consts";
import localService from "./localService";
import {format} from 'date-fns'


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
        console.log(item)
        // TRANSFORM ISSUBMIT TO TRUE
        const {hash} = window.location
        const origin = window.location.origin
        const urlParams = new URLSearchParams(hash.replace("#",""))
        let paramsData = {}
        urlParams.set("isSubmit",true)
        for (let[key,value] of urlParams) {
            paramsData[key] = value
        }
        const fromDate = format(parseInt(paramsData.start) / 1000000,"yyyy-MM-dd HH:mm:ss")  
        const toDate = format(parseInt(paramsData.end) / 1000000,"yyyy-MM-dd HH:mm:ss")  

        try {
            const newItem = {
                id: item.id || nanoid(),
                timestamp: item.timestamp || Date.now(),
                starred: false,
                description: item.description || "",
                params: paramsData || {},
                fromDate,
                toDate,
                data: `${origin}/#${urlParams.toString()}` || "",
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
    const share = (item) => {
        const hash = item.urlParams
        const origin = item.origin
        return `${origin}/#${hash.toString()}`
    }
    
    function getAll() {
        const actualStorage = JSON.parse(localStorage.getItem(_URL_ITEM)) || [];
        console.log(actualStorage)
        return actualStorage;
    }

    return { clean, get, set, update, add, remove, getAll, findById, share };
};

export default localUrl;
