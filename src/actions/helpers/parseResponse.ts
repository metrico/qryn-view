import { Stream, Message, QueryResult, QueryResultType } from "../types";
import store from "../../store/store";

import { nanoid } from "nanoid";
import { parseVectorResponse } from "./parseVectorResponse";
import { parseMatrixResponse } from "./parseMatrixResponse";
import { parseStreamResponse } from "./parseStreamResponse";
import { fromNanoSec } from "./timeParser";


const { debugMode } = store.getState();

/**
 * 
 * @param cb 
 * @returns async cb
 */

export async function getAsyncResponse(
    cb: Function //: callback dispatch function
) {
    return await cb;
}

/**
 * 
 * @param messages 
 * @returns messages sorted by timestamp
 */

export function sortMessagesByTimestamp(
    messages: Message[] //:array sort by timestamp
) {
    const startTime = performance.now();
    const mess = messages?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    const duration = performance.now() - startTime;
    if (debugMode)
        console.log("🚧 getData / sorting logs took: ", duration, " ms");
    return mess;
}



/**
 * 
 * @param streams 
 * @returns streams parsed as message tyoe objects
 */

export function mapStreams(streams: any[]) {
    const startTime = performance.now();
    let messages: Message[] = [];

    streams.forEach((stream: Stream) => {
        stream.values.forEach(([ts, text], i) => {
            messages.push({
                type: "stream",
                timestamp: fromNanoSec(ts),
                text,
                tags: stream.stream || {},
                isShowTs: true,
                showLabels: false,
                id: nanoid(),
            });
        });
    });

    const duration = performance.now() - startTime;

    if (debugMode)
        console.log("🚧 getData / mapping logs took: ", duration, " ms");
    return sortMessagesByTimestamp(messages);
}



/**
 * returs response parsed by response type
 */
export const responseActions = {
    streams: (props: QueryResult) => parseStreamResponse(props),
    vector: (props: QueryResult) => parseVectorResponse(props),
    matrix: (props: QueryResult) => parseMatrixResponse(props),
    scalar: (props: QueryResult) => parseMatrixResponse(props)
};

/**
 * 
 * @param responseProps : QueryResult props to be parsed 
 */

export async function parseResponse(responseProps: QueryResult) {
    const { type }: { type: QueryResultType } = responseProps;
    responseActions[type](responseProps);
}
