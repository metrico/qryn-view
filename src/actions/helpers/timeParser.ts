/**
 * 
 * @param ts timestamp Ns
 * @returns timestamp Sec
 */

 function fromNanoSec(
    ts: number // :timestamp
) {
    return ts / 1000000;
}

/**
 * 
 * @param time timestamp sec
 * @returns timestamp Ns
 */

 function getTimeParsed(time: Date) {
    return time.getTime() + "000000";
}

export { fromNanoSec, getTimeParsed }