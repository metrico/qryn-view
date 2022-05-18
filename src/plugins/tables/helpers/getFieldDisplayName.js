import { calculateFiledDisplayName } from "./calcFieldName";

export function getFieldDisplayName(field, frame = null, allFrames = null) {
    const existingTitle = field?.state?.displayName;
    const multipleFrames = Boolean(allFrames && allFrames.length > 1);
    if (existingTitle && multipleFrames === field?.state?.multipleFrames) {
        return existingTitle;
    }

    const displayName = calculateFiledDisplayName(field, frame, allFrames);
    field.state = field.state || {};
    field.state.displayName = displayName;
    field.state.multipleFrames = multipleFrames;
    return displayName;
}
