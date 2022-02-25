import { nanoid } from "nanoid";

export class LocalStorageService {

     APP = "cloki-query";
     HISTORY_ITEM = this.APP + "-history";

    getStorageItem(item) {
        return localStorage.getItem(item);
    }

    setStorageItem(item, value) {
        localStorage.setItem(item, value);
    }

    setHistoryItem(item) {
        const queryList = JSON.parse(this.getStorageItem(this.HISTORY_ITEM)) || [];
        /**
         * history item: 
         *  - starred <Boolean>
         *  - data <Query>
         *  - note ?
         */
        const queryEntry = {
            id: nanoid(),
            date: Date.now(),
            starred: item?.starred || false,
            data: item?.data || '',
        };
        console.log(queryList)
        queryList.push(queryEntry)
        this.setStorageItem(this.HISTORY_ITEM, JSON.stringify(queryList));
    }

    removeHistoryItem(id) {
        const queryList = this.getStorageItem(this.HISTORY_ITEM) || [];
        if (queryList?.length > 0) {
            let filteredList = queryList.filter((f) => f.id !== id);
            this.setStorageItem(this.HISTORY_ITEM, JSON.stringify(filteredList));
        }
    }

    clearHistory() {
        const cleanup = [];
        this.setStorageItem(this.HISTORY_ITEM, JSON.stringify(cleanup));
    }

    setStarred(id) {
        const queryList = this.getStorageItem(this.HISTORY_ITEM) || [];
        let found = queryList.find((f) => f.id === id);
        if (queryList.length > 0 && found) {
            const cleanup = [];
            queryList.forEach((query) => {
                if (query.id === id) {
                    query.starred = !query.starred;
                }
            });
            this.setStorageItem(this.HISTORY_ITEM, JSON.stringify(cleanup));
            this.setStorageItem(this.HISTORY_ITEM, JSON.stringify(queryList));
        }
    }

   
}

export default LocalStorageService;
