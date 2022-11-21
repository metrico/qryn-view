import * as moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
    setIsSubmit,
    setQueryTime,
    setQueryStep,
    setStartTime,
    setStopTime,
    setTheme,
    setAutoTheme
} from "../actions";

import setFromTime from "../actions/setFromTime";
import setIsEmbed from "../actions/setIsEmbed";
import { setLeftPanel } from "../actions/setLeftPanel";
import { setRightPanel } from "../actions/setRightPanel";
import setToTime from "../actions/setToTime";
import { setUrlLocation } from "../actions/setUrlLocation";
import { setUrlQueryParams } from "../actions/setUrlQueryParams";
import { setSplitView } from "../components/StatusBar/components/SplitViewButton/setSplitView";
import { environment } from "../environment/env.dev";


export const STRING_VALUES = ["step", "theme",  "time"];
export const ARRAY_VALUES = ["left", "right"];

export const TIME_VALUES = ["start", "stop"];

export const BOOLEAN_VALUES = ["isSubmit", "isSplit", "autoTheme", "isEmbed"];
export function UpdateStateFromQueryParams() {
    const isLightTheme = useMemo(() => {
        return window.matchMedia("(prefers-color-scheme: light)").matches;
    }, []);

    const dispatch = useDispatch();
    const urlQueryParams = useSelector((store) => store.urlQueryParams);
    const start = useSelector((store) => store.start);
    const stop = useSelector((store) => store.stop);
    const from = useSelector((store) => store.from);
    const to = useSelector((store) => store.to);
    const step = useSelector((store) => store.step);
    const isSubmit = useSelector((store) => store.isSubmit);
    const isEmbed = useSelector((store) => store.isEmbed);
    const time = useSelector((store) => store.time);
    const left = useSelector((store) => store.left);
    const right = useSelector((store) => store.right);
    const theme = useSelector((store) => store.theme);
    const autoTheme = useSelector((store) => store.autoTheme);
    const isSplit = useSelector((store) => store.isSplit);
    const [themeSet, setThemeSet] = useState(isLightTheme ? "light" : theme);

    useEffect(() => {
        setThemeSet(theme);
    }, [theme]);
    const STORE_KEYS = {
        start,
        step,
        stop,
        from,
        to,
        time,
        isSubmit,
        isEmbed,
        theme,
        autoTheme,
        left,
        right,
        isSplit,
    };

    const STORE_ACTIONS = {
        start: setStartTime,
        step: setQueryStep,
        stop: setStopTime,
        from: setFromTime,
        to: setToTime,
        time: setQueryTime,
        isSubmit: setIsSubmit,
        isEmbed: setIsEmbed,
        theme: setTheme,
        left: setLeftPanel,
        right: setRightPanel,
        isSplit: setSplitView,
        autoTheme: setAutoTheme
    };

    const encodeTs = (ts) => {
        return ts?.getTime() + "000000";
    };

    const { hash } = useLocation();
    useEffect(() => {
        const urlFromHash = new URLSearchParams(hash.replace("#", ""));
        // !if there is some params set them first on UI

        if (hash.length > 0) {
            const startParams = urlQueryParams;

            for (let [key, value] of urlFromHash.entries()) {
                startParams[key] = value;
            }

            if (Object.keys(startParams).length > 0) {
                dispatch(setUrlQueryParams({ ...urlQueryParams, startParams }));

                dispatch(setUrlLocation(hash));

                Object.keys(startParams).forEach((param) => {
                    if (
                        STRING_VALUES.includes(param) &&
                        startParams[param] !== ""
                    ) {
                        dispatch(STORE_ACTIONS[param](startParams[param]));
                    } else if (param === "theme") {
                        dispatch(STORE_ACTIONS[param](themeSet));
                    } else if (
                        TIME_VALUES.includes(param) &&
                        startParams[param] !== ""
                    ) {
                        const croppedTime = startParams[param] / 1000000;
                        const paramDate = new Date(
                            moment(croppedTime).format(
                                "YYYY-MM-DDTHH:mm:ss.SSSZ"
                            )
                        );

                        dispatch(STORE_ACTIONS[param](paramDate));
                    } else if (BOOLEAN_VALUES.includes(param)) {
                        try {
                            const val = JSON.parse(startParams[param]);
                            dispatch(STORE_ACTIONS[param](val));
                        } catch (e) {
                            console.log(e);
                        }
                    } else if (ARRAY_VALUES.includes(param)) {
                        try {
                            const parsed = JSON.parse(
                                decodeURIComponent(startParams[param])
                            );

                     dispatch(STORE_ACTIONS[param](parsed));
                        } catch (e) {
                            console.log(e);
                        }
                    }
                });
            }
        } else {
            const allParams = STRING_VALUES.concat(TIME_VALUES)
                .concat(BOOLEAN_VALUES)
                .concat(ARRAY_VALUES);
            allParams.forEach((param) => {
                if (STRING_VALUES.includes(param)) {
                    urlFromHash.set(param, STORE_KEYS[param]?.toString());
                } else if (param === "theme") {
                    urlFromHash.set(param, themeSet.toString());
                } else if (TIME_VALUES.includes(param)) {
                    const time_value = STORE_KEYS[param]?.getTime() * 1000000;
                    urlFromHash.set(param, time_value.toString());
                } else if (BOOLEAN_VALUES.includes(param)) {
                    try {
                        urlFromHash.set(param, JSON.parse(STORE_KEYS[param]));
                    } catch (e) {
                        console.log(e);
                    }
                } else if (ARRAY_VALUES.includes(param)) {
                    try {
                        const encodedArray = encodeURIComponent(
                            JSON.stringify(STORE_KEYS[param])
                        );
                        urlFromHash.set(param, encodedArray);
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
            window.location.hash = urlFromHash;
        }
    }, []);

    useEffect(() => {
        if (hash.length > 0) {
            const paramsFromHash = new URLSearchParams(hash.replace("#", ""));
            let previousParams = {};
            for (let [key, value] of paramsFromHash.entries()) {
                previousParams[key] = value;
            }

            Object.keys(STORE_KEYS).forEach((store_key) => {
                if (
                    STRING_VALUES.includes(store_key) &&
                    previousParams[store_key] !== STORE_KEYS[store_key]
                ) {
                    const updated = STORE_KEYS[store_key].toString().trim();

                    paramsFromHash.set(store_key, updated);
                } else if (
                    TIME_VALUES.includes(store_key) &&
                    previousParams[store_key] !==
                        encodeTs(STORE_KEYS[store_key])
                ) {
                    const encodedTs = encodeTs(STORE_KEYS[store_key]);
                    paramsFromHash.set(store_key, encodedTs);
                } else if (
                    BOOLEAN_VALUES.includes(store_key) &&
                    previousParams[store_key] !== STORE_KEYS[store_key]
                ) {
                    try {
                        paramsFromHash.set(
                            store_key,
                            JSON.parse(STORE_KEYS[store_key])
                        );
                    } catch (e) {
                        console.error(e);
                    }
                } else if (store_key === "left") {
                    const parsed = encodeURIComponent(JSON.stringify(left));
                    paramsFromHash.set("left", parsed);
                } else if (store_key === "right") {
                    const parsed = encodeURIComponent(JSON.stringify(right));
                    paramsFromHash.set("right", parsed);
                }
            });
            window.location.hash = paramsFromHash;
        }
    }, [STORE_KEYS]);
}
