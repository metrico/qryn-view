import { sortBy } from "lodash";
import { prepareCols } from "./prepareCols";

/**
 *
 * @param {*} data // the raw data
 * @returns the data parsed for react-table use
 */

export function prepareVectorRows(data:string) {
    const cols = prepareCols(data);
    try {
        let rows:any = [];
        const dataLength = data.length;
        const colsLength = cols.length;

        for (let i = 0; i < dataLength; i++) {
            let dataRow:any = data[i];
            let metric = dataRow.metric;
            let [time, value] = dataRow.value;
            let row:any = {};
            for (let j = 0; j < colsLength; j++) {
                let col = cols[j];

                row[col] = metric[col] || "";
            }
            row.time = time;
            row.value = value;
            rows.push(row);
        }

        const sorted = sortBy(rows, (row) => row.time);

        return sorted;
    } catch (e) {
        console.log(e);
    }
}
