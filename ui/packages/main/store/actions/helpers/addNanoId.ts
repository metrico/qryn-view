import { nanoid } from "nanoid";

/**
 *
 * @param result : query result
 * @returns  result with a nanoId attached to each row
 */

export function addNanoId(result: any[]) {
    return result?.map((m: object) => ({ ...m, id: nanoid() })) || [];
}
