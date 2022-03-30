import { LEVEL_COLORS } from "../theme/theme";
import { TAGS_LEVEL } from "../consts/consts";
import * as moment from "moment";

export function getRowColor(tags) {
    if (tags?.["level"]) {
        const level = Object.keys(TAGS_LEVEL).find((level) =>
            TAGS_LEVEL[level].includes(tags.level.toLowerCase())
        );
        return LEVEL_COLORS[level];
    } else {
        return LEVEL_COLORS["unknown"];
    }
}

export function toggleActiveStyles(idx) {
    return idx.showLabels
        ? "value-tags-container labelsActive"
        : "value-tags-container labelsInactive";
}

export function formatDate(timestamp) {
    return moment(parseInt(timestamp)).format("YYYY-MM-DD HH:mm:ss.SSS UTC");
}
