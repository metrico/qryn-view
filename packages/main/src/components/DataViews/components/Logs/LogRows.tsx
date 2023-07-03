import { useState, useEffect } from "react";
import { LogsWrapper } from "./LogsWrapper";
import { RowsCont } from "./styled";

/**
 * Returns the logs rows
 * @props {messages, actualQuery}
 *
 */

export const LogRows = (props: any) => {
    const { actualQuery }: any = props;
    const { dataSourceId }: any = actualQuery;
    const [messages, setMessages] = useState(props.messages);

    const toggleItemActive = (index: any) => {
        setMessages((prevState: any) => {
            const message = prevState[index];
            const messages = prevState.concat();
            messages[index] = {
                ...message,
                showLabels: !message.showLabels,
            };

            return messages;
        });
    };

    useEffect(() => {
        setMessages(props.messages);
    }, [props.messages]);

    return (
        <RowsCont>
            <LogsWrapper
                {...props}
                dataSourceId={dataSourceId}
                actQuery={actualQuery}
                items={messages}
                toggleItemActive={toggleItemActive}
            />
        </RowsCont>
    );
};
