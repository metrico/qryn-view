export function getSingleLabelName(frames) {
    let singleName = null;

    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];

        for (const field of frame.fields) {
            if (!field.labels) {
                continue;
            }
            for (const labelKey in field.labels) {
                if (singleName === null) {
                    singleName = labelKey;
                } else if (labelKey !== singleName) {
                    return null;
                }
            }
        }
    }

    return singleName;
}
