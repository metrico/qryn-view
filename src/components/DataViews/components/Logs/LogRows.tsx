import { PureComponent} from "react";
import { LogsWrapper } from "./LogsWrapper";
import { RowsCont } from "./styled";

/**
 * Returns the logs rows
 * @props {messages, actualQuery}
 * 
 */
export class LogRows extends PureComponent {
    constructor(props: any) {
        super(props);
        const { messages } = props || [];

        this.state = {
            messages,
        };
    }

    toggleItemActive = (index: any) =>
        this.setState((prevState: any) => {
            const message = prevState.messages[index];
            const messages = prevState.messages.concat();
            messages[index] = {
                ...message,
                showLabels: !message.showLabels,
            };
            return { messages };
        });

    render() {
        const { actualQuery }: any = this.props;
        const { dataSourceId }: any = actualQuery;
        const { messages }: any = this.state;
        return (
            <RowsCont>
                <LogsWrapper
                    {...this.props}
                    dataSourceId={dataSourceId}
                    actQuery={actualQuery}
                    items={messages}
                    toggleItemActive={this.toggleItemActive}
                />
            </RowsCont>
        );
    }
}
