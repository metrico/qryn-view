import { findRangeByLabel } from "../../components/StatusBar/components/daterangepicker/utils";
import store from "../../store/store";
import { setStartTime } from "../setStartTime";
import { setStopTime } from "../setStopTime";
import { getTimeParsed } from "./timeParser";

export default function getTimeParams() {
    let {
        start: startTs,
        stop: stopTs,
        label: rangeLabel,
        time: lsTime,
        from,
        to,
    } = store.getState();
    let startS: Date = startTs;
    const rl: string = rangeLabel;

    const time = lsTime.time || new Date().getTime() + "000000";
    const parsedStart = getTimeParsed(startTs);
    const parsedStop = getTimeParsed(stopTs);
    const parsedTime =
        "&start=" + (from || parsedStart) + "&end=" + (to || parsedStop);

    if (findRangeByLabel(rl)) {
        let rngeLabel = findRangeByLabel(rl); // this should be done before
    }

    store.dispatch(setStartTime(startS));
    store.dispatch(setStopTime(stopTs));

    return {
        time,
        parsedTime,
    };
}
