export function formatUrl(state) {
    const { serviceName, name, minDuration, maxDuration, tags } = state;
    let sn = "";
    if (serviceName.length > 0) {
        sn = `service.name="${serviceName}"`;
    }

    let n = "";

    if (name.length > 0) {
        n = `name="${this.name}"`;
    }

    let min = "";

    if (minDuration.length > 0) {
        min = `&minDuration=${minDuration}`;
    }

    let max = "";

    if (maxDuration.length > 0) {
        max = `&maxDuration=${maxDuration}`;
    }

    return `${tags} ${sn} ${n}${min}${max}`;
}
