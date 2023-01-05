export function prepareCols(data:any) {
    let cache:any = [];
    try {
        for (let header of data) {
            let metricKeys = Object.keys(header.metric);

            for (let metric in metricKeys) {
                if (!cache.includes(metricKeys[metric])) {
                    cache.push(metricKeys[metric]);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }

    return cache;
}
