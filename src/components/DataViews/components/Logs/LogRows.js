import { PureComponent, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { LogRowStyled, RowLogContent, RowTimestamp, RowsCont } from "./styled";
import { createItemData, formatDate, getRowColor } from "./helpers";
import { ValueTagsCont } from "../ValueTags";
import { useSelector } from "react-redux";

/**
 *
 * @props {text, dateFormated, isMobile}
 * @returns Formatted log text line
 */

function LogRow({ text, dateFormated, isMobile, isSplit, isShowTs }) {
    return (
        <div className="log-ts-row">
            {isShowTs && !isMobile && !isSplit && (
                <RowTimestamp>{dateFormated}</RowTimestamp>
            )}
            <RowLogContent>
                {(isMobile || isSplit) && isShowTs && <p>{dateFormated}</p>}
                <p>{text}</p>
            </RowLogContent>
        </div>
    );
}

/**
 *
 * @props {toggleItemActive, index, log, actQuery, isMobile}
 * @returns Log Line With log line tags options
 */

function Row(props) {
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

    const linkedFieldTags = useMemo(() => {
        if (dataSourceData?.linkedFields?.length > 0) {
            const mapped = dataSourceData.linkedFields.map((linked) => {
                const { id, regex, name, internalLink } = linked;
                const newGex = new RegExp(regex, "i");
                const matched = text.match(newGex);
                if (matched?.length > 0) {
                    return {
                        name,
                        internalLink,
                        id,
                        tagGroups: matched.groups,
                    };
                }
                return {};
            });

            let linked = { tags: {}, fields: [] };
            for (let tag of mapped) {
                linked.tags = { ...linked.tags, ...tag.tagGroups };
                linked.fields.push(tag);
            }
            return linked;
        } else {
            return {};
        }
    }, [text]);

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

    const rowProps = {
        rowColor,
        onClick: () => {
            toggleItemActive(index);
        },
    };

    return (
        <LogRowStyled {...rowProps}>
            <LogRow {...logRowProps} isShowTs={actQuery.isShowTs} />
            <ValueTagsCont {...valueTagsProps} />
        </LogRowStyled>
    );
}

/**
 *
 * @props {items, toggleItemActive, actQuery}
 * @returns  iterable of rows (items)
 */

function Logs(props) {
    const { items, toggleItemActive, actQuery, dataSourceId } = props;

    const itemData = createItemData(items, toggleItemActive);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const isSplit = useSelector((store) => store.isSplit);

    const dataSourceData = useSelector(({ dataSources }) =>
        dataSources?.find((f) => f.id === dataSourceId)
    );

    const dsData = useMemo(() => {
        if (dataSourceData) {
            const { linkedFields, id, name, url } = dataSourceData;

            return {
                linkedFields,
                id,
                name,
                url,
            };
        }
    }, [dataSourceData]);

    return (
        itemData &&
        itemData.items.map((log, key) => (
            <Row
                dataSourceId={dataSourceId}
                dataSourceData={dsData}
                actQuery={actQuery}
                key={key}
                index={key}
                log={log}
                isSplit={isSplit}
                isMobile={isTabletOrMobile}
                toggleItemActive={toggleItemActive}
            />
        ))
    );
}

/**
 * @props {messages, actualQuery}
 * returns: the container for the rows view
 */
export class LogRows extends PureComponent {
    constructor(props) {
        super(props);
        const { messages } = props || [];

        this.state = {
            messages,
        };
    }

    toggleItemActive = (index) =>
        this.setState((prevState) => {
            const message = prevState.messages[index];
            const messages = prevState.messages.concat();
            messages[index] = {
                ...message,
                showLabels: !message.showLabels,
            };
            return { messages };
        });

    render() {
        const { actualQuery } = this.props;
        const { dataSourceId } = actualQuery;
        return (
            <RowsCont>
                <Logs
                    {...this.props}
                    dataSourceId={dataSourceId}
                    actQuery={this.props.actualQuery}
                    items={this.state.messages}
                    toggleItemActive={this.toggleItemActive}
                />
            </RowsCont>
        );
    }
}
