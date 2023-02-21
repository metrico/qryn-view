import { Stream, Message, QueryResultType, QueryDirection } from "../types";
import store from "../../store/store";

import { nanoid } from "nanoid";
import { parseVectorResponse } from "./parseVectorResponse";
import { parseMatrixResponse } from "./parseMatrixResponse";
import { parseStreamResponse } from "./parseStreamResponse";
import { fromNanoSec } from "./timeParser";
import { parseTracesResponse } from "./parseTracesResponse";
import { parseFluxResponse } from "./parseFluxResponse";
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
    messages: Message[],
    direction: QueryDirection
) {
    return {
        forward: sortMessagesByTimestampAsc(messages),
        backwards: sortMessagesByTimestampDesc(messages),
    }[direction];
}

export function sortMessagesByTimestampAsc(messages: Message[]) {
    const startTime = performance.now();
    const mess = messages?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    const duration = performance.now() - startTime;
    if (debugMode)
        console.log("🚧 getData / sorting logs took: ", duration, " ms");
    return mess;
}

export function sortMessagesByTimestampDesc(messages: Message[]) {
    const startTime = performance.now();
    const mess = messages?.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
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

export function mapStreams(
    streams: any[],
    direction: QueryDirection = "forward"
) {
    const startTime = performance.now();
    let messages: Message[] = [];

    streams?.forEach((stream: Stream) => {
        stream.values.forEach(([ts, text], i) => {
            messages.push({
                type: "stream",
                timestamp: fromNanoSec(ts),
                text,
                tags: stream.stream || {},
                isShowTs: true,
                isBuilder:false,
                showLabels: false,
                id: nanoid(),
            });
        });
    });

    const duration = performance.now() - startTime;

    if (debugMode)
        console.log("🚧 getData / mapping logs took: ", duration, " ms");
    return sortMessagesByTimestamp(messages, direction);
}

/**
 *
 * @param responseProps : QueryResult props to be parsed
 */

export async function parseResponse(responseProps: any) {
    const { type }: { type: QueryResultType } = responseProps;

    switch (type) {
        case "streams":
            await parseStreamResponse(responseProps);
            break;
        case "vector":
            await parseVectorResponse(responseProps);
            break;
        case "matrix":
            await parseMatrixResponse(responseProps);
            break;
        case "scalar":
            await parseMatrixResponse(responseProps);
            break;
        case "flux":
            await parseFluxResponse(responseProps);
            // await parseVectorResponse(responseProps);
            // await parseStreamResponse(responseProps);
            break;
        case "traces":
            await parseTracesResponse(responseProps);
            break;
        default:
            await parseStreamResponse(responseProps);
    }
}
