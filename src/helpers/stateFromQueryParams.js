import { environment } from "../environment/env.dev";
import setDebug from "./setDebug";
import * as moment from "moment";
import { nanoid } from "nanoid";

export const initialUrlState = {
    query: "",
    queryType: "range",
    start: "",
    time: "",
    to: "",
    stop: "",
    end: "",
    from: "",
    left: [
        {
            id: nanoid(),
            idRef: "A",
            lastIdx: 1,
            panel: "left",
            queryType: "instant",
            limit: 100,
            step: 100,
            tableView: false,
            browserOpen: false,
            expr: "",
            labels: [], // name: selected:
            values: [], // label name selected
            response: {}, // the target should be just the last one
            // find query by ID and append response
        },
    ],

    right: [
        {
            id: nanoid(),
            idRef: "A",
            lastIdx: 1,
            panel: "right",
            queryType: "instant",
            limit: 100,
            step: 100,
            tableView: false,
            browserOpen: false,
            expr: "",
            labels: [], // name: selected:
            values: [], // label name selected
            response: {}, // the target should be just the last one
            // find query by ID and append response
        },
    ],

    label: "",
    limit: 100,
    step: 100,
    apiUrl: "",
    isSubmit: false,
    isEmbed: false,
    theme: "",
    isSplit: false,
};

export default function stateFromQueryParams() {
    const debug = setDebug(environment.environment);
    if (debug) console.group("🚧 LOGIC/InitialState/FromQuery");

    const { hash } = window.location;
    if (debug) console.log("🚧 LOGIC/FromQuery Hash", hash);

    const urlFromHash = new URLSearchParams(hash.replace("#", ""));

    if (debug) console.log("🚧 LOGIC/urlFromHash", urlFromHash, hash.length);

    if (hash.length > 0) {
        const startParams = { ...initialUrlState };
        if (debug)
            console.log("🚧 LOGIC/startParams/BeforeURLFromHash", startParams);
        for (let [key, value] of urlFromHash.entries()) {
            if (debug) console.log("🚧 LOGIC/startParams/", key, value);

            if (key === "end" || key === "start") {
                const croppedTime = parseInt(value) / 1000000;
                startParams[key] = new Date(
                    moment(croppedTime).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                );

            } else if (key === "left" || key === "right") {
                const parsedQuery = JSON.parse(decodeURIComponent(value));
                startParams[key] = parsedQuery;
            } else {
                startParams[key] = value;
            }
        }

        return startParams || initialUrlState;
    } else {
        if (debug) console.groupEnd("🚧 LOGIC/InitialState/FromQuery");
        return initialUrlState;
    }
}
