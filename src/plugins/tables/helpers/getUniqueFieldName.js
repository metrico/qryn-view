export function getUniqueFieldName(field, frame = null) {
    let dupeCount = 0;
    let foundSelf = false;

    if (frame) {
        for (let i = 0; i < frame.fields.length; i++) {
            const otherField = frame.fields[i];
            if (field === otherField) {
                foundSelf = true;
                if (dupeCount > 0) {
                    dupeCount++;
                    break;
                }
            } else if (field.name === otherField.name) {
                dupeCount++;
                if (foundSelf) {
                    break;
                }
            }
        }
    }

    if (dupeCount) {
        return `${field.name} ${dupeCount}`;
    }
    return field.name;
}
