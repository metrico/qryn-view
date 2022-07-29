import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import loadLogs from "../../actions/loadLogs";
import localService from "../../services/localService";
import setQueryHistory from "../../actions/setQueryHistory";
import setHistoryOpen from "../../actions/setHistoryOpen";
import localUrl from "../../services/localUrl";
import setLinksHistory from "../../actions/setLinksHistory";
import QueryEditor from "../../plugins/queryeditor";
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
import { decodeQuery, decodeExpr } from "../../helpers/decodeQuery";
import setIsEmptyView from "../../actions/setIsEmptyView";

import { useLocation } from "react-router-dom";
import { setLeftPanel } from "../../actions/setLeftPanel";
import { setRightPanel } from "../../actions/setRightPanel";

export const QueryBar = (props) => {
    const { queryType, limit, id } = props.data;
    const { hash } = useLocation();
    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const {
        debug,

        apiUrl,
        historyOpen,
        isEmbed,
        theme,
        labels,
        queryHistory,
        start,
        stop,
    } = useSelector((store) => store);
    const left = useSelector((store) => store.left);
    const right = useSelector((store) => store.right);

    const [queryInput, setQueryInput] = useState(props.data.expr);
    const [queryValid, setQueryValid] = useState(false);
    const [queryValue, setQueryValue] = useState(queryInit(props.data.expr));

    useEffect(() => {});
    const saveUrl = localUrl();
    const expr = useMemo(() => {
        return props.data.expr;
    }, [props.data.expr]);

    useEffect(() => {
        const dLog = debugLog(expr);
        debug && dLog.logicQueryBar();
        const labels = sendLabels(apiUrl, start, stop);

        if (isEmbed)
            dispatch(loadLogs(queryInput, queryType, limit, props.name, id));
        if (onQueryValid(expr)) {
            debug && dLog.queryBarDispatch();
            return labels.then((data) => {
                decodeQuery(data, expr, apiUrl, labels);
            });
        } else {
            dispatch(setIsEmptyView(true));
        }
    }, []);

    useEffect(() => {
        setQueryInput(expr);

        setQueryValue([{ children: [{ text: expr }] }]);

        setQueryValid(onQueryValid(expr));
    }, [expr]);

    function handleQueryChange(e) {
        setQueryValue(e);

        const queryParams = new URLSearchParams(hash.replace("#", ""));
        const multiline = e.map((text) => text.children[0].text).join("\n");

        if (props.name === "left") {
            const leftC = [...left];
            leftC.forEach((query) => {
                if (query.id === id) {
                    query.expr = multiline;
                }
            });

            dispatch(setLeftPanel(leftC));
            queryParams.set("left", encodeURIComponent(JSON.stringify(leftC)));
        }

        if (props.name === "right") {
            const rightC = [...right];
            rightC.forEach((query) => {
                if (query.id === id) {
                    query.expr = multiline;
                }
            });
            dispatch(setRightPanel(rightC));
            queryParams.set(
                "right",
                encodeURIComponent(JSON.stringify(rightC))
            );
        }

        window.location.hash = queryParams;
    }

    const handleInputKeyDown = (e) => {
        if (e.code === "Enter" && e.ctrlKey) {
            onSubmit(e);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (onQueryValid(queryInput)) {
            try {
                const historyUpdated = historyService.add({
                    data: queryInput,
                    url: window.location.hash,
                });

                dispatch(setQueryHistory(historyUpdated));

                decodeQuery(queryInput, apiUrl, labels);

                const labelsDecoded = decodeExpr(props.data.expr);

                if (props.name === "left") {
                    const leftC = [...left];
                    leftC.forEach((query) => {
                        if (query.id === id) {
                            query.labels = [...labelsDecoded];
                        }
                    });

                    dispatch(setLeftPanel(leftC));
                }

                if (props.name === "right") {
                    const rightC = [...right];
                    rightC.forEach((query) => {
                        if (query.id === id) {
                            query.labels = [...labelsDecoded];
                        }
                    });
                    dispatch(setRightPanel(rightC));
                }

                dispatch(
                    loadLogs(
                        queryInput,
                        props.data.queryType,
                        props.data.limit,
                        props.name,
                        props.data.id
                    )
                );

                const storedUrl = saveUrl.add({
                    data: window.location.href,
                    description: "From Query Submit",
                });

                dispatch(setLinksHistory(storedUrl));
            } catch (e) {
                console.log(e);
            }
        } else {
            dispatch(setIsEmptyView(true));

            console.log("Please make a log query", expr);
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
                            <ShowLabelsButton {...props} isMobile={true} />
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
                        <ShowLabelsButton {...props} />

                        <QueryEditor
                            onQueryChange={handleQueryChange}
                            defaultValue={expr || ""}
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
                    <QueryTypeBar {...props} />
                </ThemeProvider>
            </div>
        )
    );
};
