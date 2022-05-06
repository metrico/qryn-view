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
    console.log(safeInterval)
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
    // below 5 seconds we force the resolution to be per 1ms as interval in scopedVars is not less than 10ms
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
    console.log(intervalMs)
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

/**
 * options: { range : { from, to }}
 * target: { resolution }
 */

/**
 *
 * @param {*} target
 * @param {*} options
 * @returns
 */

export default function adjustedStep(target, options) {

    console.log(target,options)
    // resolution = resolution denominator
    const resolution = target.resolution || DEFAULT_RESOLUTION.value;
    const startNs = getTime(options.range.from, false);
    const endNs = getTime(options.range.to, true);
    const rangeMs = Math.ceil((endNs - startNs) / 1e6);

    console.log(rangeMs)
    console.log(resolution)
    const { intervalMs } = getIntervalInfo(rangeMs);
    console.log(intervalMs)

    const intl = adjustInterval(intervalMs || 1000, resolution, rangeMs);
    console.log(intl)
    return Math.ceil(intl) / 1000;
}


// @TODO histogram request

// function getLogsVolumeDataProvider(request) {
//     const isLogsVolumeAvailable = request.targets.some((target) => target.expr && !isMetricsQuery(target.expr));
//     if (!isLogsVolumeAvailable) {
//       return undefined;
//     }
//     // the targets are the containers
//     const logsVolumeRequest = JSON.parse(JSON.stringify(request));
//     logsVolumeRequest.targets = logsVolumeRequest.targets
//       .filter((target) => target.expr && !isMetricsQuery(target.expr))
//       .map((target) => {
//         return {
//           ...target,
//           instant: false,
//           volumeQuery: true,
//           expr: `sum by (level) (count_over_time(${target.expr}[$__interval]))`,
//         };
//       });

//     return queryLogsVolume(this, logsVolumeRequest, {
//       extractLevel,
//       range: request.range,
//       targets: request.targets,
//     });
//   }
