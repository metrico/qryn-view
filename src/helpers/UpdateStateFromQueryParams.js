import * as moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
    setApiUrl,
    setIsSubmit,
    setQuery,
    setQueryLimit,
    setQueryTime,
    setQueryStep,
    setQueryType,
    setStartTime,
    setStopTime,
    setTheme,
} from "../actions";

import setFromTime from "../actions/setFromTime";
import setIsEmbed from "../actions/setIsEmbed";
import { setLabelsBrowserOpen } from "../actions/setLabelsBrowserOpen";
import setToTime from "../actions/setToTime";
import { setUrlLocation } from "../actions/setUrlLocation";
import { setUrlQueryParams } from "../actions/setUrlQueryParams";
import { environment } from "../environment/env.dev";

import { decodeQuery } from "./decodeQuery";

export function UpdateStateFromQueryParams() {
    const isLightTheme = window.matchMedia("(prefers-color-scheme: light)")
        .matches;

    const { hash } = useLocation();
    const dispatch = useDispatch();
    const urlQueryParams = useSelector((store) => store.urlQueryParams);
    const start = useSelector((store) => store.start);
    const stop = useSelector((store) => store.stop);
    const limit = useSelector((store) => store.limit);
    const from = useSelector((store) => store.from);
    const to = useSelector((store) => store.to);
    const step = useSelector((store) => store.step);
    const labels = useSelector((store) => store.labels);
    const apiUrl = useSelector((store) => store.apiUrl);
    const isSubmit = useSelector((store) => store.isSubmit);
    const isEmbed = useSelector((store) => store.isEmbed);
    const query = useSelector((store) => store.query);
    const queryType = useSelector((store) => store.queryType);
    const time = useSelector((store) => store.time);
    const theme = useSelector((store) =>
        isLightTheme ? "light" : store.theme
    );

    const STORE_KEYS = {
        apiUrl,
        query,
        queryType,
        start,
        limit,
        step,
        end: stop,
        from,
        to,
        time,
        isSubmit,
        isEmbed,
        theme,
    };

    const STORE_ACTIONS = {
        apiUrl: setApiUrl,
        query: setQuery,
        queryType: setQueryType,
        start: setStartTime,
        limit: setQueryLimit,
        step: setQueryStep,
        end: setStopTime,
        from: setFromTime,
        to: setToTime,
        time: setQueryTime,
        isSubmit: setIsSubmit,
        isEmbed: setIsEmbed,
        theme: setTheme,
    };

    const STRING_VALUES = [
        "limit",
        "step",
        "apiUrl",
        "theme",
        "queryType",
        "time",
    ];

    const QUERY_VALUE = "query";

    const TIME_VALUES = ["start", "end"];

    const BOOLEAN_VALUES = ["isSubmit", "isEmbed"];

    const encodeTs = (ts) => {
        return ts.getTime() + "000000";
    };

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
                    } else if (
                        QUERY_VALUE === param &&
                        startParams[param] !== ""
                    ) {
                        const parsedQuery = decodeURIComponent(
                            startParams[param]
                        );

                        dispatch(STORE_ACTIONS[param](parsedQuery));
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
                    } else if (
                        BOOLEAN_VALUES.includes(param) &&
                        typeof param === "boolean"
                    ) {
                        dispatch(STORE_ACTIONS[param](startParams[param]));
                    }
                    if (QUERY_VALUE === param) {
                    }
                });

                decodeQuery(
                    decodeURIComponent(startParams.query),
                    apiUrl,
                    labels
                );
                dispatch(setLabelsBrowserOpen(false));
            }
        } else {
            dispatch(setApiUrl(environment.apiUrl));
            const allParams = STRING_VALUES.concat(TIME_VALUES);
            allParams.push(QUERY_VALUE);
            allParams.push(BOOLEAN_VALUES);
            allParams.forEach((param) => {
                if (STRING_VALUES.includes(param, "PARAM")) {
                    urlFromHash.set(param, STORE_KEYS[param].toString());
                } else if (TIME_VALUES.includes(param)) {
                    const time_value = STORE_KEYS[param]?.getTime() * 1000000;

                    urlFromHash.set(param, time_value.toString());
                } else if (QUERY_VALUE === param) {
                    const parsed = encodeURIComponent(
                        STORE_KEYS[param]
                    ).toString();
                    urlFromHash.set(param, parsed.toString());
                } else if (
                    BOOLEAN_VALUES === param &&
                    typeof param === "boolean"
                ) {
                    urlFromHash.set(param, param.toString());
                }
            });
            const newQuery = STORE_KEYS[query];

            decodeQuery(newQuery, apiUrl, labels);

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
                    QUERY_VALUE === store_key &&
                    previousParams[store_key] !==
                        encodeURIComponent(STORE_KEYS[store_key])
                ) {
                    const queryUpdated = encodeURIComponent(
                        STORE_KEYS[store_key].toString()
                    );
                    paramsFromHash.set(store_key, queryUpdated);
                } else if (
                    TIME_VALUES.includes(store_key) &&
                    previousParams[store_key] !==
                        encodeTs(STORE_KEYS[store_key])
                ) {
                    const encodedTs = encodeTs(STORE_KEYS[store_key]);
                    paramsFromHash.set(store_key, encodedTs);
                } else if (
                    BOOLEAN_VALUES === store_key &&
                    previousParams[store_key] !== STORE_KEYS[store_key]
                ) {
                    paramsFromHash.set(store_key, STORE_KEYS[store_key]);
                }
            });
            window.location.hash = paramsFromHash;
        }
    }, [STORE_KEYS]);
}
