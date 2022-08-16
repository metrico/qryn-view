import { findRangeByLabel } from "../../components/StatusBar/components/daterangepicker/utils";
import store from "../../store/store";
import { setStartTime } from "../setStartTime";
import { setStopTime } from "../setStopTime";
import { getTimeParsed } from "./timeParser";

const getPrevTime = (lastTime: number) => {
    return lastTime || parseInt(new Date().getTime() + "000000");
};

const getRangeByLabel = (rl: string) => {
    let r: any = findRangeByLabel(rl);
    const { dateStart, dateEnd } = r;

    const pStart = parseInt(getTimeParsed(dateStart));
    const pStop = parseInt(getTimeParsed(dateEnd));

    return {
        pStart,
        pStop,
        dateStart,
        dateEnd,
    };
};
export default function getTimeParams() {
    // actual params from store

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
        const { pStart, pStop, dateStart, dateEnd } = getRangeByLabel(rl);

        parsedStart = pStart;
        parsedStop = pStop;

        // if relative time : set start and stop
        // according to relative time

        store.dispatch(setStartTime(dateStart));
        store.dispatch(setStopTime(dateEnd));
    } else {
        parsedStart = parseInt(getTimeParsed(_start));
        parsedStop = parseInt(getTimeParsed(_stop));
    }

    const parsedTime =
        "&start=" + (from || parsedStart) + "&end=" + (to || parsedStop);
    const diffSt = parseInt(from || parsedStart)
    const diffEnd = parseInt(to || parsedStop)
    const tDiff = (diffEnd - diffSt)/1000000
    return {
        tDiff,
        time: prevInstantTime,
        parsedTime,
    };
}
