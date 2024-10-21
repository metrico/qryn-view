// sets the timerange for the getData action
import { findRangeByLabel } from "@ui/main/components/StatusBar/components/daterangepicker/utils";
import store from "@ui/store/store";
import { getTimeParsed, getTimeSec } from "./timeParser";
import { timeStore, TimeState } from "@ui/store/timeStore";
const getPrevTime = (lastTime: number) => {
    return lastTime || parseInt(new Date().getTime() + "000000");
};
const getRangeByLabel = (rl: string, type?: string) => {
    let r: any = findRangeByLabel(rl);
    const { dateStart, dateEnd } = r;
    let pStart, pStop;
    if (type === "metrics") {
        pStart = getTimeSec(dateStart);
        pStop = getTimeSec(dateEnd);
    } else if (type === "logs") {
        pStart = parseInt(getTimeParsed(dateStart));
        pStop = parseInt(getTimeParsed(dateEnd));
    } else {
        pStart = parseInt(getTimeParsed(dateStart));
        pStop = parseInt(getTimeParsed(dateEnd));
    }
    return {
        pStart,
        pStop,
        dateStart,
        dateEnd,
    };
};
export default function getTimeParams(type: string, id: string, panel: string) {
    const { time: lsTime, from, to } = store.getState();
    const prevInstantTime = getPrevTime(lsTime);
    const queries = store.getState()[panel];
    const queryFound = queries?.find((f: any) => f.id === id);
    const startTs = queryFound.start;
    const stopTs = queryFound.stop;

    const rl: string = queryFound.label;
    const { isTimeLookup, rangeLabel } = timeStore.getState() as TimeState;

    const label =
        type === "traces" && isTimeLookup && rangeLabel !== ""
            ? rangeLabel
            : rl;
    const _start = startTs;
    const _stop = stopTs;

    let parsedStart = 0,
        parsedStop = 0;
    if (findRangeByLabel(label)) {
        const { pStart, pStop } = getRangeByLabel(label, type);
        if (type === "traces") {
            parsedStart = Math.round(pStart / 1000000000);
            parsedStop = Math.round(pStop / 1000000000);
        } else {
            parsedStart = pStart;
            parsedStop = pStop;
        }
    } else {
        // get time sec if its metrics type
        if (type === "metrics") {
            parsedStart = getTimeSec(_start);
            parsedStop = getTimeSec(_stop);
        } else if (type === "logs") {
            parsedStart = parseInt(getTimeParsed(_start));
            parsedStop = parseInt(getTimeParsed(_stop));
        } else if (type === "traces") {
            parsedStart = getTimeSec(_start);
            parsedStop = getTimeSec(_stop);
        } else {
            parsedStart = parseInt(getTimeParsed(_start));
            parsedStop = parseInt(getTimeParsed(_stop));
        }
    }

    const parsedTime =
        "&start=" + (from || parsedStart) + "&end=" + (to || parsedStop);
    const diffSt = parseInt(from || parsedStart);
    const diffEnd = parseInt(to || parsedStop);
    const tDiff = (diffEnd - diffSt) / (type === "metrics" ? 1 : 1000000);
    return {
        tDiff,
        time: prevInstantTime,
        parsedTime,
    };
}
