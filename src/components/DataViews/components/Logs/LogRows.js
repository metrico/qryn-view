import { PureComponent, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { LogRowStyled, RowLogContent, RowTimestamp, RowsCont } from "./styled";
import { createItemData, formatDate, getRowColor } from "./helpers";
import {ValueTagsCont} from "../ValueTags";
import { useSelector } from "react-redux";

/**
 *
 * @props {text, dateFormated, isMobile}
 * @returns Formatted log text line
 */

function LogRow({ text, dateFormated, isMobile, isSplit, isShowTs }) {
    /// add showTimestamp
    return (
        <div className="log-ts-row">
            {isShowTs && !isMobile && !isSplit && <RowTimestamp>{dateFormated}</RowTimestamp>}
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

function Row({ toggleItemActive, index, log, actQuery, isMobile, isSplit }) {
    const { tags, timestamp, text, showLabels } = log;
    const rowColor = useMemo(() => getRowColor(tags), [tags]);
    const dateFormated = useMemo(() => formatDate(timestamp), [timestamp]);

    const valueTagsProps = {
        actQuery,
        tags,
        showLabels,
    };

    const logRowProps = {
        dateFormated,
        text,
        isMobile,
        isSplit
    };

    const rowProps = {
        rowColor,
        onClick: () => {
            toggleItemActive(index);
        },
    };

    return (
        <LogRowStyled {...rowProps}>
            <LogRow {...logRowProps} isShowTs={actQuery.isShowTs}/>
            <ValueTagsCont {...valueTagsProps} />
        </LogRowStyled>
    );
}


/**
 *
 * @props {items, toggleItemActive, actQuery}
 * @returns  iterable of rows (items)
 */

function Logs({ items, toggleItemActive, actQuery }) {
    const itemData = createItemData(items, toggleItemActive);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const isSplit = useSelector((store) => store.isSplit)
    return (
        itemData &&
        itemData.items.map((log, key) => (
            <Row
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
        return (
            <RowsCont>
                <Logs
                    actQuery={this.props.actualQuery}
                    items={this.state.messages}
                    toggleItemActive={this.toggleItemActive}
                />
            </RowsCont>
        );
    }
}
