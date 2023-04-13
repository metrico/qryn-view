import { queryBuilderWithLabels } from "../../../LabelBrowser/helpers/querybuilder";

/**
 * Checks for existing key/value pair
 * @param exp
 * @param op
 * @param k
 * @param v
 * @returns
 */
function alreadyExists(exp: any, op: any, k: any, v: any) {
    return exp.includes(`${k}${op}"${v}"`);
}

/**
 * adds Label into query preview
 * @param e
 * @param key
 * @param value
 * @param isExcluded
 * @param queryObj
 * @returns
 */
export async function addLabel(
    e: any,
    key: any,
    value: any,
    isExcluded = false,
    queryObj: any
) {
    e.preventDefault();
    e.stopPropagation();
    const { expr, panel, id, dataSourceType } = queryObj;
    const isAlreadyExcluded = alreadyExists(expr, "!=", key, value);
    const isAlreadySelected = alreadyExists(expr, "=", key, value);
    if (
        (isAlreadyExcluded && isExcluded) ||
        (isAlreadySelected && !isExcluded)
    ) {
        return;
    }
    queryBuilderWithLabels(
        expr,
        panel,
        id,
        [key, value],
        isExcluded,
        dataSourceType
    );
}

/**
 * Gets Linked Filed Tags fields
 * @param linkedFieldTags
 * @returns
 */
export function getLinkedFieldTagsFileds(linkedFieldTags: any) {
    return (
        linkedFieldTags?.fields
            ?.map((m: any) => {
                if (m?.tagGroups) {
                    const tagEntries = Object.entries(m?.tagGroups);
                    const entriesMapped = tagEntries?.map(([key, val]) => ({
                        name: key,
                        value: val,
                    }));

                    return entriesMapped;
                }

                return [];
            })
            ?.flat() || []
    );
}
