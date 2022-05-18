import { FieldType, TIME_SERIES_TIME_FIELD_NAME } from "../consts";
import { formatLabels } from "./formatLabels";
import { getSingleLabelName } from "./getSingleLabelName";
import { getUniqueFieldName } from "./getUniqueFieldName";

export function calculateFiledDisplayName(
    field,
    frame = null,
    allFrames = null
) {
    const hasConfigTitle =
        field?.config?.displayName && field?.config?.displayName?.length;
    let displayName = hasConfigTitle ? field.config.displayName : field.name;
    if (hasConfigTitle) {
        return displayName;
    }

    if (frame && field?.config?.displayName) {
        return field.config.displayNameFromDS;
    }

    if (field.name === FieldType.time && !field.labels) {
        return displayName ?? TIME_SERIES_TIME_FIELD_NAME;
    }

    let parts = [];

    let frameNameDiff = false;
    if (allFrames && allFrames.length > 1) {
        for (let i = 1; i < allFrames.length; i++) {
            const frame = allFrames[i];
            if (frame.name !== allFrames[i - 1].name) {
                frameNameDiff = true;
                break;
            }
        }
    }

    let frameNameAdded = false;

    let labelsAdded = false;

    if (frameNameDiff && frame?.name) {
        parts.push(frame.name);
        frameNameAdded = true;
    }

    if (field.name && field.name !== TIME_SERIES_TIME_FIELD_NAME) {
        parts.push(field.name);
    }

    if (field.labels && frame) {
        let singleLabelName = getSingleLabelName(allFrames ?? [frame]);

        if (!singleLabelName) {
            let allLabels = formatLabels(field.labels);
            if (allLabels) {
                parts.push(allLabels);
                labelsAdded = true;
            }
        } else if (field.labels[singleLabelName]) {
            parts.push(field.labels[singleLabelName]);
            labelsAdded = true;
        }
    }

    if (
        frame &&
        !frameNameAdded &&
        !labelsAdded &&
        field.name === TIME_SERIES_TIME_FIELD_NAME
    ) {
        if (frame.name && frame.name.length > 0) {
            parts.push(frame.name);
            frameNameAdded = true;
        }
    }

    if (parts.length) {
        displayName = parts.join(" ");
    } else if (field.name) {
        displayName = TIME_SERIES_TIME_FIELD_NAME;
    }

    if (displayName === field.name) {
        displayName = getUniqueFieldName(field, frame);
    }

    return displayName;
}
