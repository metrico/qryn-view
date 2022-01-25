/**
 * @class {LRUCache}
 * Add LRU (last-recently used cache eviction strategy)
 *
 *
 */

class LRUCache {
    /**
     * @param {Map} values - initializes the cache Map
     */
    values = new Map();
    /**
     *
     * @param {*} maxEntries - max entries for cache Map
     */
    maxEntries = 20;

    constructor(maxEntries) {
        this.maxEntries = maxEntries;
    }

    /**
     *
     * @param {*} key
     * @returns the value of the cache Map
     */

    get(key) {
        const hasKey = this.values.has(key);
        let entry;
        if (hasKey) {
            // peek the entry, re-insert for LRU strategy

            entry = this.values.get(key);
            this.values.delete(key);
            this.values.set(key, entry);
        }
        return entry;
    }
    /**
     *
     * @param {*} key
     * @param {*} value
     * @method put {key,value} - adds a new entry into cache Map
     */
    put(key, value) {
        if (this.values.size >= this.maxEntries) {
            
            //least-recently used cache eviction strategy

            const keyToDelete = this.values.keys().next(value);
            this.values.delete(keyToDelete);
        }
        this.values.set(key.value);
    }
}
