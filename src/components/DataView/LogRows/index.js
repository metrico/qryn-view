import memoize from "memoize-one";
import { PureComponent } from "react";
import { formatDate, getRowColor } from "../helpers";
import { LogRow, RowLogContent, RowTimestamp } from "../styled";
import ValueTags from "../ValueTags";

function Row({ toggleItemActive, index, log }) {

    return (
        <LogRow
        rowColor={getRowColor(log.tags)}
        onClick={() => {
            toggleItemActive(index);
        }}
    >
        <div className="log-ts-row">
            <RowTimestamp>{formatDate(log.timestamp)}</RowTimestamp>
            <RowLogContent>{log.text}</RowLogContent>
        </div>

        {log.showLabels && (
            <div className="value-tags-container">
                <ValueTags tags={log.tags} />
            </div>
        )}
    </LogRow>
    )
 
}
 

const createItemData = memoize((items, toggleItemActive) => ({
    items,
    toggleItemActive,
}));

function Logs({ items, toggleItemActive }) {
    const itemData = createItemData(items, toggleItemActive);
    return (
        itemData &&
        itemData.items.map((log, key) => (
            <Row
                key={key}
                index={key}
                log={log}
                toggleItemActive={toggleItemActive}
            />
        ))
    );
}

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
            <Logs
                items={this.state.messages}
                toggleItemActive={this.toggleItemActive}
            />
        );
    }
}
