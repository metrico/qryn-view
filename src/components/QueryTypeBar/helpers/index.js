import { map } from "lodash";

function getTime(date) {
    return Math.ceil(date.valueOf() * 1e6);
}

function adjustInterval(
    dynamicInterval, // number
    resolution, // number
    range // number   time range
) {
    let safeInterval = range / 1100;
    if (safeInterval > 1) {
        safeInterval = Math.ceil(safeInterval);
    }
    return Math.max(resolution * dynamicInterval, safeInterval);
}

const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getIntervalInfo(timespanMs) {
    let intervalMs = timespanMs;

    let interval = "";
    if (timespanMs < SECOND * 5) {
        intervalMs = MILLISECOND;
        interval = "1ms";
    } else if (intervalMs > HOUR) {
        intervalMs = DAY;
        interval = "1d";
    } else if (intervalMs > MINUTE) {
        intervalMs = HOUR;
        interval = "1h";
    } else if (intervalMs > SECOND) {
        intervalMs = MINUTE;
        interval = "1m";
    } else {
        intervalMs = SECOND;
        interval = "1s";
    }
    return { interval, intervalMs };
}

export const DEFAULT_RESOLUTION = {
    value: 1,
    label: "1/1",
};

export const RESOLUTION_OPTIONS = [DEFAULT_RESOLUTION].concat(
    map([2, 3, 4, 5, 10], (value) => ({
        value,
        label: "1/" + value,
    }))
);


export default function adjustedStep(target, options) {

    const resolution = target.resolution || DEFAULT_RESOLUTION.value;
    const startNs = getTime(options.range.from, false);
    const endNs = getTime(options.range.to, true);
    const rangeMs = Math.ceil((endNs - startNs) / 1e6);
    const { intervalMs } = getIntervalInfo(rangeMs);
    const intl = adjustInterval(intervalMs || 1000, resolution, rangeMs);
    return Math.ceil(intl) / 1000;
}
