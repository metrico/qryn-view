import ValueTags from "./ValueTags";
/**
 * 
 * @param props 
 * @returns Container for valueTags
 */
export function ValueTagsCont(props: any) {
    const { showLabels, tags, actQuery } = props;

    if (showLabels) {
        return (
            <div className="value-tags-container">
                <ValueTags {...props} tags={tags} actQuery={actQuery} />
            </div>
        );
    }
    return null;
}
