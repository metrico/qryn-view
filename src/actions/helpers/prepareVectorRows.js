import { sortBy } from "lodash";
import { prepareCols, prepareFluxCols } from "./prepareCols";


import * as moment from 'moment'

/**
 *
 * @param {*} data // the raw data
 * @returns the data parsed for react-table use
 */

export function prepareVectorRows(data, type = 'logs') {


    if(type === 'flux') {

        try{
         
            return data;

        }catch(e){console.log(e)}
 


    } else {

        const cols = prepareCols(data);

        try {
            let rows = [];
            const dataLength = data.length;
            const colsLength = cols.length;
    
            for (let i = 0; i < dataLength; i++) {
                let dataRow = data[i];
                let metric = dataRow.metric;
                let [time, value] = dataRow.value;
                let row = {};
                for (let j = 0; j < colsLength; j++) {
                    let col = cols[j];
    
                    row[col] = metric[col] || "";
                }
                row.time = time;
                row.value = value;
                rows.push(row);
            }
    
            const sorted = sortBy(rows, (row) => row.time);

            console.log(sorted)
    
            return sorted;

        } catch (e) {
            console.log(e);
        }


    }


}
