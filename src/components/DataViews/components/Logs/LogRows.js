import styled from "@emotion/styled";
import memoize from "memoize-one";
import { PureComponent } from "react";
import { useMediaQuery } from "react-responsive";

import { LogRow, RowLogContent, RowTimestamp } from "./styled"
import { formatDate, getRowColor } from "../../helpers";
import ValueTags from "../ValueTags";

const RowsCont = styled.div`
    overflow: hidden;
    overflow-y: auto;
    height: calc(100% - 20px);
`;
function Row(props) {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });

    const { toggleItemActive, index, log, actQuery } = props;

    return (
        <LogRow
            rowColor={getRowColor(log.tags)}
            onClick={() => {
                toggleItemActive(index);
            }}
        >
            <div className="log-ts-row">
                {!isTabletOrMobile && (
                    <RowTimestamp>{formatDate(log.timestamp)}</RowTimestamp>
                )}
                <RowLogContent>
                    {isTabletOrMobile && <p>{formatDate(log.timestamp)}</p>}
                   <p>
                   {log.text}
                   </p> 
                </RowLogContent>
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
    const { items, toggleItemActive } = props;
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
