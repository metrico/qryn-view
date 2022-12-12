/**
 *
 * @param {*} data query result
 * @returns table column names extracted from response
 */

export function prepareCols(data) {
    let colNames = [];
    try {
        for (let header of data) {
            let metricKeys = Object.keys(header.metric);

            for (let metric in metricKeys) {
                if (!colNames.includes(metricKeys[metric])) {
                    colNames.push(metricKeys[metric]);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }

    return colNames;
}

export function prepareFluxCols(data) {
    let colNames = [];
    try {
        for (let header of data) {
            let metricKeys = Object.keys(header);
            for(let metric of metricKeys){
                if(!colNames.includes(metric))
                colNames.push(metric)
            }
        }
    }catch(e) {
        console.log(e)
    }
    
    return colNames
}