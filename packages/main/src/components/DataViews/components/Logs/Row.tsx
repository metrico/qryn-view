import { useMemo } from "react";
import { formatDate, getRowColor } from "./helpers";
import { useLinkedFieldTags } from "./hooks";
import { IRowProps } from "./types";
import { LogRowStyled } from "./styled";
import { LogRow } from "./LogRow";
import { ValueTagsCont } from "../ValueTags/ValueTagsCont";

/**
 *
 * @props {toggleItemActive, index, log, actQuery, isMobile}
 * @returns Log Line With log line tags options
 */

export function Row(props: IRowProps) {
    const {
        toggleItemActive,
        index,
        log,
        actQuery,
        isMobile,
        isSplit,
        dataSourceData,
    } = props;

    const { tags, timestamp, text, showLabels } = log;

    const linkedFieldTags = useLinkedFieldTags(text, dataSourceData);

    const rowColor = useMemo(() => getRowColor(tags), [tags]);
    const dateFormated = useMemo(() => formatDate(timestamp), [timestamp]);
    //  inside here should be the special fields

    const valueTagsProps = {
        actQuery,
        tags: { ...tags, ...linkedFieldTags.tags },
        linkedFieldTags,
        showLabels,
        dataSourceData,
    };

    const logRowProps = {
        dateFormated,
        text,
        isMobile,
        isSplit,
        dataSourceData,
    };

    return (
        <LogRowStyled rowColor={rowColor}>
            <LogRow
                onRowClick={() => toggleItemActive(index)}
                {...logRowProps}
                isShowTs={actQuery.isShowTs}
            />
            <ValueTagsCont
                onValueTagsClick={() => toggleItemActive(index)}
                {...valueTagsProps}
            />
        </LogRowStyled>
    );
}
