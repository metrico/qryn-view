import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuery } from "../../actions";
import loadLogs from "../../actions/loadLogs";
import setLoading from "../../actions/setLoading";
import { setLabelsBrowserOpen } from "../../actions/setLabelsBrowserOpen";
import localService from "../../services/localService";
import setQueryHistory from "../../actions/setQueryHistory";

import setHistoryOpen from "../../actions/setHistoryOpen";
import localUrl from "../../services/localUrl";
import setLinksHistory from "../../actions/setLinksHistory";
import QueryEditor from "../../plugins/queryeditor";

import loadLabels from "../../actions/loadLabels";
import { decodeQuery } from "../../helpers/UpdateStateFromQueryParams";
import { css } from "@emotion/css";
import { MobileTopQueryMenu, QueryBarContainer } from "./components/styled";
import HistoryButton from "./components/HistoryButton/HistoryButton";
import ShowLabelsButton from "./components/ShowLabelsButton/ShowLabelsButton";
import ShowLogsButton from "./components/ShowLogsButton/ShowLogsButton";
import queryInit from "./helpers/queryInit";
import onQueryValid from "./helpers/onQueryValid";
import debugLog from "./helpers/debugLog";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";
import { sendLabels } from "../../hooks/useLabels";
import QueryTypeBar from "../QueryTypeBar";

export const QueryBar = () => {
    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const labelsBrowserOpen = useSelector((store) => store.labelsBrowserOpen);
    const debug = useSelector((store) => store.debugMode);
    const query = useSelector((store) => store.query);
    const apiUrl = useSelector((store) => store.apiUrl);
    const historyOpen = useSelector((store) => store.historyOpen);
    const isEmbed = useSelector((store) => store.isEmbed);
    const theme = useSelector((store) => store.theme);
    const [queryInput, setQueryInput] = useState(query);
    const [queryValid, setQueryValid] = useState(false);
    const [queryValue, setQueryValue] = useState(queryInit(query));
    const labels = useSelector((store) => store.labels);
    const queryHistory = useSelector((store) => store.queryHistory);
    const saveUrl = localUrl();

    useEffect(() => {
        const dLog = debugLog(query);
        debug && dLog.logicQueryBar();
        const labels = sendLabels(apiUrl);
        if (isEmbed) dispatch(loadLogs());
        if (query.length > 0) {
            debug && dLog.queryBarDispatch();
            dispatch(setLoading(true));
            return labels.then((data) => {
                decodeQuery(query, apiUrl, data);
            });
        }
    }, []);

    useEffect(() => {
        setQueryInput(query);
        setQueryValue([{ children: [{ text: query }] }]);
        setQueryValid(onQueryValid(query));
    }, [query]);

    const onValueDisplay = (e) => {
        e.preventDefault();
        const isOpen = labelsBrowserOpen ? false : true;
        dispatch(setLabelsBrowserOpen(isOpen));
    };

    function handleQueryChange(e) {
        setQueryValue(e);

        const multiline = e.map((text) => text.children[0].text).join("\n");
        dispatch(setQuery(multiline));
    }

    const handleInputKeyDown = (e) => {
        if (e.code === "Enter" && e.ctrlKey) {
            dispatch(setLoading(true));
            onSubmit(e);
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(setQuery(queryInput));

        if (onQueryValid(queryInput)) {
            try {
                const historyUpdated = historyService.add({
                    data: queryInput,
                    url: window.location.hash,
                });
                dispatch(setQueryHistory(historyUpdated));
                dispatch(setLabelsBrowserOpen(false));
                decodeQuery(queryInput, apiUrl, labels);
                dispatch(setLoading(true));
                dispatch(loadLogs());
                const storedUrl = saveUrl.add({
                    data: window.location.href,
                    description: "From Query Submit",
                });
                dispatch(setLinksHistory(storedUrl));
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("Please make a log query", query);
        }
    };
    function handleHistoryClick(e) {
        dispatch(setHistoryOpen(!historyOpen));
    }
    return (
        !isEmbed && (
            <div
                className={css`
                    max-width: 100%;
                `}
            >
                <ThemeProvider theme={themes[theme]}>
                    <MobileTopQueryMenu>
                        <div
                            className={css`
                                display: flex;
                            `}
                        >
                            <ShowLabelsButton
                                onValueDisplay={onValueDisplay}
                                labelsBrowserOpen={labelsBrowserOpen}
                                isMobile={true}
                            />
                            <HistoryButton
                                queryLength={queryHistory.length}
                                handleHistoryClick={handleHistoryClick}
                                isMobile={true}
                            />
                        </div>

                        <ShowLogsButton
                            disabled={!queryValid}
                            onClick={onSubmit}
                            isMobile={true}
                        />
                    </MobileTopQueryMenu>
                    <QueryBarContainer>
                        <ShowLabelsButton
                            onValueDisplay={onValueDisplay}
                            labelsBrowserOpen={labelsBrowserOpen}
                        />

                        <QueryEditor
                            onQueryChange={handleQueryChange}
                            value={queryValue}
                            onKeyDown={handleInputKeyDown}
                        />

                        <HistoryButton
                            queryLength={queryHistory.length}
                            handleHistoryClick={handleHistoryClick}
                        />
                        <ShowLogsButton
                            disabled={!queryValid}
                            onClick={onSubmit}
                            isMobile={false}
                        />
                    </QueryBarContainer>
                    <QueryTypeBar />
                </ThemeProvider>
            </div>
        )
    );
};
