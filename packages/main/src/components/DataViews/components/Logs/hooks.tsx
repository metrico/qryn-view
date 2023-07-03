
import {useMemo} from 'react'
/**
 * Returns linked fields tags
 * @param text 
 * @param dataSourceData 
 * @returns 
 */
export function useLinkedFieldTags(text: string, dataSourceData?: any) {
    return useMemo(() => {
        if (dataSourceData?.linkedFields?.length > 0 && text) {
            const mapped: any[] = dataSourceData.linkedFields.map(
                (linked: any) => {
                    const { id, regex, name, internalLink } = linked;
                    const newGex = new RegExp(regex, "i");
                    const matched = text.match(newGex);
                    if (matched && matched?.length > 0) {
                        return {
                            name,
                            internalLink,
                            id,
                            tagGroups: matched.groups,
                        };
                    }
                    return {};
                }
            );

            let linked: any = { tags: {}, fields: [] };
            for (let tag of mapped) {
                linked.tags = { ...linked.tags, ...tag.tagGroups };

                linked.fields.push(tag);
            }
            return linked;
        } else {
            return {};
        }
    }, [dataSourceData, text]);
}

/**
 * Returns Data Source metadata
 * @param dataSourceData 
 * @returns 
 */
export function useDataSourceMetaData(dataSourceData: any) {
    return useMemo(() => {
        const linkedFields = dataSourceData?.linkedFields;
        const id = dataSourceData?.id;
        const name = dataSourceData?.name;
        const url = dataSourceData?.url;

        if (dataSourceData) {
            return {
                linkedFields,
                id,
                name,
                url,
            };
        }
    }, [dataSourceData]);
}


