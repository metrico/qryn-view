import memoize from "memoize-one";

import * as moment from "moment";

export const TAGS_LEVEL = {
    critical: ["emerg", "fatal", "alert", "crit", "critical"],
    error: ["err", "eror", "error"],
    warning: ["warn", "warning"],
    info: ["info", "information", "notice"],
    debug: ["dbug", "debug"],
    trace: ["trace"],
};
export const LEVEL_COLORS = {
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

export function formatDate(timestamp) {
    return moment(parseInt(timestamp)).format("YYYY-MM-DD HH:mm:ss.SSS UTC");
}

export function getRowColor(tags) {
    const type = tags?.severity || tags?.level;
    if (type) {
        const level = Object.keys(TAGS_LEVEL).find((level) =>
            TAGS_LEVEL[level].includes(type.toLowerCase())
        );
        return LEVEL_COLORS[level];
    } else {
        return LEVEL_COLORS["unknown"];
    }
}
