import { environment } from "../environment/env.dev";
import setDebug from "./setDebug";
import * as moment from "moment";


export const initialUrlState = {
        query: '',
    queryType: 'range',
    start:'',
    time:'',
    to: '',
    stop: '',
    end: '',
    from: '',
    label: '',
    limit: 100,
    step: 100,
    apiUrl: '',
    isSubmit:false,
    isEmbed:false,
    theme: '',
} 

export default function stateFromQueryParams() {
    const debug = setDebug(environment.environment);
    if (debug) console.group("🚧 LOGIC/InitialState/FromQuery");

    const { hash } = window.location;
    if (debug) console.log("🚧 LOGIC/FromQuery Hash", hash);

    const urlFromHash = new URLSearchParams(hash.replace("#", ""));

    if (debug) console.log("🚧 LOGIC/urlFromHash", urlFromHash, hash.length);

    if (hash.length > 0) {
        const startParams = {...initialUrlState};
        if (debug)
            console.log("🚧 LOGIC/startParams/BeforeURLFromHash", startParams);
        for (let [key, value] of urlFromHash.entries()) {
            if (debug) console.log("🚧 LOGIC/startParams/", key, value);
            if (key === "end" || key === "start") {
                const croppedTime = parseInt(value) / 1000000;
                startParams[key] = new Date(
                    moment(croppedTime).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                );
            } else if (key === "query") {
                const parsedQuery = decodeURIComponent(value);
                startParams[key] = parsedQuery;
            } else if (key === "isSubmit") {
                startParams[key] = value;
            }
       
            else {
                startParams[key] = value;
            }
        }
        if (debug)
            console.log(
                "🚧 LOGIC/startParams/AfterURLFromHash",
                startParams,
                Object.keys(startParams).length
            );
        if (debug) console.groupEnd("🚧 LOGIC/InitialState/FromQuery");
        if (startParams["start"] && startParams["end"]) {
            const startTs = moment(startParams["start"]).format(
                "YYYY-MM-DD HH:mm:ss"
            );
            const endTs = moment(startParams["end"]).format(
                "YYYY-MM-DD HH:mm:ss"
            );
            startParams["label"] = `${startTs} - ${endTs}`;
        }
        return startParams || initialUrlState;
    } else {
        if (debug) console.groupEnd("🚧 LOGIC/InitialState/FromQuery");
        return initialUrlState;
    }
}
