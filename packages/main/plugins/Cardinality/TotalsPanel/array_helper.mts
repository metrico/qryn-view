export {};

declare global {
    interface Array<T> {
        sortColByNumber(col: string, sort: string): Array<T>;
        sortColByString(col: string, sort: string): Array<T>;
    }
}

if (!Array.prototype.sortColByNumber) {
    Array.prototype.sortColByNumber = function <T>(
        col: string,
        sort: string
    ): T[] {
        // desc
        if (sort === "asc") {
            return this.sort((a, b) => a[col] - b[col]);
        }
        return this.sort((a, b) => b[col] - a[col]);
    };
}

if (!Array.prototype.sortColByString) {
    Array.prototype.sortColByString = function <T>(
        col: string,
        sort: string
    ): T[] {
        if (sort === "asc") {
            return this.sort((a, b) => {
                const colA = a[col].toUpperCase(); // ignore upper and lowercase
                const colB = b[col].toUpperCase(); // ignore upper and lowercase
                if (colA < colB) {
                    return -1;
                }
                if (colA > colB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        }

        return this.sort((a, b) => {
            const colA = a[col].toUpperCase(); // ignore upper and lowercase
            const colB = b[col].toUpperCase(); // ignore upper and lowercase
            if (colB < colA) {
                return -1;
            }
            if (colB > colA) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    };
}
