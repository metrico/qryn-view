import { PureComponent, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { LogRowStyled, RowLogContent, RowTimestamp, RowsCont } from "./styled";
import { createItemData, formatDate, getRowColor } from "./helpers";
import {ValueTagsCont} from "../ValueTags";

/**
 *
 * @props {text, dateFormated, isMobile}
 * @returns Formatted log text line
 */

function LogRow({ text, dateFormated, isMobile }) {
    return (
        <div className="log-ts-row">
            {!isMobile && <RowTimestamp>{dateFormated}</RowTimestamp>}
            <RowLogContent>
                {isMobile && <p>{dateFormated}</p>}
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

function Row({ toggleItemActive, index, log, actQuery, isMobile }) {
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
    };

    const rowProps = {
        rowColor,
        onClick: () => {
            toggleItemActive(index);
        },
    };

    return (
        <LogRowStyled {...rowProps}>
            <LogRow {...logRowProps} />
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

    return (
        itemData &&
        itemData.items.map((log, key) => (
            <Row
                actQuery={actQuery}
                key={key}
                index={key}
                log={log}
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
