export function formatUrl(state) {
    const { searchName, name, minDuration, maxDuration, tags, limit } = state;
    let sn = "";

    if (searchName?.length > 0) {
        sn = ` service.name="${searchName}"`;
    }
    let t = "";
    if (tags?.length > 0) {
        t = ` ${tags}`;
    }

    let n = "";

    if (name?.length > 0) {
        n = ` name="${name}"`;
    }

    let min = "";

    if (minDuration?.length > 0) {
        min = `&minDuration=${minDuration}`;
    }

    let max = "";

    if (maxDuration?.length > 0) {
        max = `&maxDuration=${maxDuration}`;
    }

    let lm = "";

    if (limit) {
        lm = `&limit=${limit}`;
    }

    let parsed = encodeURIComponent(`${t}${sn}${n}`);

    return `search?tags=${parsed}${min}${max}${lm}`;
}
