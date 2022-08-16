/// calculate time span from function

export function getTimeSpan(queryInput: string) {
    const matched = queryInput.match(/\[(.*?)\]/gm);
    const repl = matched?.[0].replace(/[\[\]']+/g, "").trim() || "";

    let funcSpan = 0;

    if (Array.isArray(matched)) {
        const splitted = repl.match(
            /^(?<tnum>[0-9.]+)(?<trange>ns|us|ms|s|m|h)?$/
        );
        const tNum: number =
            typeof splitted?.groups?.tnum === "string"
                ? parseInt(splitted?.groups?.tnum)
                : 1;
        const tRange = splitted?.groups?.trange || "m";

        const spanProp: any = tNum / parseDuration(tRange);
        funcSpan = spanProp;
    }

    return funcSpan;
}

function parseDuration(r: string): number {
    const unitmatch = /^(ns|us|ms|s|m|h)$/;
    const ranges = {
        ns: 1e9,
        us: 1e6,
        s: 1,
        m: 1 / 60,
        h: 1 / 3600,
    };

    const rMap = new Map<string, number>(Object.entries(ranges));

    if (unitmatch.test(r) && typeof r === "string") {
        return rMap.get(r) || 1 / 60;
    } else {
        return rMap.get("m") || 1 / 60;
    }
}
