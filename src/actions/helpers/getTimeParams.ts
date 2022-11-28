import { findRangeByLabel } from "../../components/StatusBar/components/daterangepicker/utils";
import store from "../../store/store";
import { setStartTime } from "../setStartTime";
import { setStopTime } from "../setStopTime";
import { getTimeParsed, getTimeSec } from "./timeParser";

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
export default function getTimeParams(type: string) {
    // actual params from store
    // get by type
    const {
        start: startTs,
        stop: stopTs,
        label: rangeLabel,
        time: lsTime,
        from,
        to,
    } = store.getState();

    const prevInstantTime = getPrevTime(lsTime);

    const rl: string = rangeLabel;

    const _start = startTs;
    const _stop = stopTs;

    let parsedStart = 0,
        parsedStop = 0;
    if (findRangeByLabel(rl)) {
        const { pStart, pStop, dateStart, dateEnd } = getRangeByLabel(rl, type);

        if (type === "traces") {
            parsedStart = Math.round(pStart / 1000000000);
            parsedStop = Math.round(pStop / 1000000000);
        } else {
            parsedStart = pStart;
            parsedStop = pStop;
        }

        store.dispatch(setStartTime(dateStart));
        store.dispatch(setStopTime(dateEnd));
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
