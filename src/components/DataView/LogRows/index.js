import memoize from "memoize-one";
import { PureComponent } from "react";
import { formatDate, getRowColor } from "../helpers";
import { LogRow, RowLogContent, RowTimestamp } from "../styled";
import ValueTags from "../ValueTags";

function Row(props) {
    const { toggleItemActive, index, log, actQuery } = props

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
                    <ValueTags actQuery={actQuery} tags={log.tags} />
                </div>
            )}
        </LogRow>
    );
}

const createItemData = memoize((items, toggleItemActive) => ({
    items,
    toggleItemActive,
}));

function Logs(props) {
    const {items, toggleItemActive} = props
    const itemData = createItemData(items, toggleItemActive);
    return (
        itemData &&
        itemData.items.map((log, key) => (
            <Row
            {...props}
                key={key}
                index={key}
                log={log}
                toggleItemActive={toggleItemActive}
            />
        ))
    );
}
/// pass the 
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
        const {name} = this.props


        // actual panel
        const actPanel = this.props[name]

        // queries from panel
        const queries = actPanel || []

        // active DataView data
        const actDataView = this.props[`${name}DataView`]
        
        // 
        const sourceId = actDataView['id']

        const actQuery = queries.find(({id})=> id === sourceId)

        return (
            <Logs actQuery={actQuery}
                items={this.state.messages}
                toggleItemActive={this.toggleItemActive}
            />
        );
    }
}
