import memoize from "memoize-one";

import * as moment from "moment";

export const TAGS_LEVEL: any = {
    critical: ["emerg", "fatal", "alert", "crit", "critical"],
    error: ["err", "eror", "error"],
    warning: ["warn", "warning"],
    info: ["info", "information", "notice"],
    debug: ["dbug", "debug"],
    trace: ["trace"],
};
export const LEVEL_COLORS: any = {
    critical: "purple",
    error: "red",
    warning: "orange",
    info: "green",
    debug: "blue",
    trace: "lightblue",
    unknown: "gray",
};

export const createItemData = memoize((items, toggleItemActive) => ({
    items,
    toggleItemActive,
}));

export function formatDate(timestamp: any) {
    return (moment as any)(parseInt(timestamp)).format("YYYY-MM-DD HH:mm:ss.SSS UTC");
}

export function getRowColor(tags: any) {
    const type = tags?.severity || tags?.level;
    if (type) {
        const level: any = Object.keys(TAGS_LEVEL).find((level) =>
            TAGS_LEVEL[level].includes(type.toLowerCase())
        );
        return LEVEL_COLORS[level];
    } else {
        return LEVEL_COLORS["unknown"];
    }
}
