import { LEVEL_COLORS as lColors } from "../theme/theme";
import { TAGS_LEVEL as tLevel } from "../consts/consts";
import * as moment from "moment";

export function getRowColor(tags) {
    if (tags?.["level"]) {
        const level = Object.keys(tLevel).find((level) =>
            tLevel[level].includes(tags.level.toLowerCase())
        );
        return lColors[level];
    } else {
        return lColors["unknown"];
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
