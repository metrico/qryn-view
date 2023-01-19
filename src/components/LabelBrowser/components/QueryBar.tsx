/**React */
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/**npm */
import { css, cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";

import { useMediaQuery } from "react-responsive";

/**Actions */
import getData from "../../../actions/getData";
import setQueryHistory from "../../../actions/setQueryHistory";
import setHistoryOpen from "../../../actions/setHistoryOpen";
import setLinksHistory from "../../../actions/setLinksHistory";
import setIsEmptyView from "../../../actions/setIsEmptyView";
import { setLeftPanel } from "../../../actions/setLeftPanel";
import { setRightPanel } from "../../../actions/setRightPanel";

/**Services */
import localService from "../../../services/localService";
import localUrl from "../../../services/localUrl";
/**Plugins */
import QueryEditor from "../../../plugins/queryeditor";
import { MobileTopQueryMenu, QueryBarContainer } from "./styled";
/**Buttons */
import HistoryButton from "./Buttons/HistoryButton";
import ShowLabelsButton from "./Buttons/ShowLabelsButton";
import ShowLogsButton from "./Buttons/ShowLogsButton";
import ShowLogsRateButton from "./Buttons/ShowLogsRateButton";
import ShowQuerySettingsButton from "./Buttons/ShowQuerySettingsButton";
/**Helpers */
import queryInit from "../helpers/queryInit";
import onQueryValid from "../helpers/onQueryValid";
import { decodeQuery, decodeExpr } from "../../../helpers/decodeQuery";
/**Hooks */
import { sendLabels } from "../../../hooks/useLabels";
/**Components */
import QueryTypeBar from "../../QueryTypeBar";
import { QuerySetting } from "./QuerySetting";
/**Theme */
import { themes } from "../../../theme/themes";

import setDataSources from "../../../views/DataSources/store/setDataSources";
import { defaultDataSources } from "../../../views/DataSources/store/defaults";
import TracesSearch from "../../TraceSearch/TraceSearch";
import TracesSwitch from "../../TraceSearch/TracesSwitch";
import { setSplitView } from "../../StatusBar/components/SplitViewButton/setSplitView";

import { Switch } from "@mui/material";
import { SettingLabel } from "./styled";
import MetricsSearch from "../../DataViews/components/Metrics/MetricsSearch";
export function panelAction(name: any, value: any) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}
export const SWITCH_OPTIONS = [
    { value: "range", label: "Range" },
    { value: "instant", label: "Instant" },
];

export const DIRECTION_SWITCH_OPTIONS = [
    { value: "forward", label: "Forward" },
    { value: "backwards", label: "Backwards" },
];

export const TRACE_OPTIONS = [
    { value: "traceId", label: "TraceId" },
    { value: "search", label: "Search" },
];
const maxWidth = css`
    max-width: 100%;
`;

export const QueryBar = (props: any) => {
    const { data, name, width } = props;
    const {
        queryType,
        limit,
        id,
        dataSourceType,
        direction,
        dataSourceId,
        //  dataSourceURL,
    } = data;
    const {
        data: { loading, hasStats, isShowStats },
    } = props;
    const { hash } = useLocation();
    const dispatch = useDispatch();
    const saveUrl = localUrl();
    const historyService = localService().historyStore();
    const { historyOpen, isEmbed, theme, queryHistory, start, stop }: any =
        useSelector((store: any) => store);
    const isSplit = useSelector((store: any) => store.isSplit);
    const panelQuery = useSelector((store: any) => store[name]);
    const dataViewItem = useSelector((store: any) => store[`${name}DataView`]);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 864px)" });
    const [queryInput, setQueryInput]: any = useState(data.expr);
    const [queryValid, setQueryValid]: any = useState(false);
    const [queryValue, setQueryValue]: any = useState(queryInit(data.expr));
    const [traceQueryType, setTraceQueryType]: any = useState("traceId");
    const [labels, setLabels]: any = useState([]);
    const [traceSearch, setTraceSearch]: any = useState({});
    const [showStatsOpen, setShowStatsOpen]: any = useState(
        isShowStats || false
    );
    const [open, setOpen]: any = useState(false);
    const dataSources = useSelector((store: any) => store.dataSources);
    const panelData = useSelector((store: any) => store[name]);

    const actLocalQuery = useMemo(() => {
        let exprQuery = { expr: "", dataSourceId, queryId: id };
        try {
            const localData =
                JSON.parse(localStorage.getItem("queryData") || "null") || [];
            if (localData && localData?.length > 0) {
                const fromLocal = localData?.find(
                    (f: any) =>
                        f.dataSourceId === dataSourceId && f.queryId === id
                );
                if (fromLocal) {
                    exprQuery = { ...fromLocal };
                }
                return exprQuery;
            } else {
                return exprQuery;
            }
        } catch (e: any) {
            console.error(e);
            return exprQuery;
        }
    }, [id, dataSourceId]);

    const actLocalDs = useMemo(() => {
        try {
            const localData = JSON.parse(
                localStorage.getItem("dataSources") || "null"
            );
            return localData?.find((f: any) => f.id === dataSourceId);
        } catch (e: any) {
            return {};
        }
    }, [dataSourceId]);
    const expr = useMemo(() => {
        return data.expr;
    }, [data.expr]);
    const initialDefault = useMemo(() => {
        return defaultDataSources.find((f: any) => f.id === dataSourceId);
    }, [dataSourceId]);

    // on init
    useEffect(() => {
        setQueryInput(actLocalQuery.expr);
        setQueryValue([{ children: [{ text: actLocalQuery.expr }] }]);

        const dataSource = dataSources?.find((f: any) => f.id === dataSourceId);

        let currentDataSource: any = {};

        if (
            actLocalDs &&
            actLocalDs?.url !== initialDefault &&
            actLocalDs?.url !== ""
        ) {
            currentDataSource = { ...actLocalDs };

            const panelCP = [...panelData];
            const labelsDecoded = decodeExpr(data.expr);

            panelCP.forEach((query) => {
                if (query.id === id) {
                    query.labels = [...labelsDecoded];
                    query.dataSourceId = currentDataSource.id;
                    query.dataSourceType = currentDataSource.type;
                    query.dataSourceURL = currentDataSource.url;
                }
            });

            dispatch(panelAction(name, panelCP));

            const dsCopy = [...dataSources];
            dsCopy.forEach((ds) => {
                if (ds.id === dataSourceId) {
                    ds = currentDataSource;
                }
            });

            dispatch(setDataSources(dsCopy));
        } else if (dataSource && dataSource.url !== "") {
            currentDataSource = { ...dataSource };
        }

        // if is view only mode (embedded) do an auto request on init
        if (isEmbed)
            dispatch(
                getData(
                    dataSourceType,
                    queryInput,
                    queryType,
                    limit,
                    name,
                    id,
                    direction,
                    dataSourceId,
                    currentDataSource?.url
                )
            );
    }, []);

    // force single view from small width

    useEffect(() => {
        if (isTabletOrMobile && isSplit) {
            dispatch(setSplitView(false));
        }
    }, [isTabletOrMobile]);

    // changes on changin dataSource Id

    useEffect(() => {
        setQueryInput(actLocalQuery.expr);
        setQueryValue([{ children: [{ text: actLocalQuery.expr }] }]);

        const dataSource = dataSources?.find((f: any) => f.id === dataSourceId);

        let currentDataSource: any = {};

        if (
            actLocalDs &&
            actLocalDs?.url !== initialDefault &&
            actLocalDs?.url !== ""
        ) {
            currentDataSource = { ...actLocalDs };

            const panelCP = [...panelData];
            const labelsDecoded = decodeExpr(data.expr);
            panelCP.forEach((query) => {
                if (query.id === id) {
                    query.labels = [...labelsDecoded];
                    query.dataSourceId = currentDataSource.id;
                    query.dataSourceType = currentDataSource.type;
                    query.dataSourceURL = currentDataSource.url;
                }
            });

            dispatch(panelAction(name, panelCP));

            const dsCopy = [...dataSources];
            dsCopy.forEach((ds) => {
                if (ds.id === dataSourceId) {
                    ds = currentDataSource;
                }
            });

            dispatch(setDataSources(dsCopy));
        } else if (dataSource && dataSource.url !== "") {
            currentDataSource = { ...dataSource };
        }

        const currentDV = dataViewItem.find((f: any) => f.id === id);

        if (currentDV?.dsType !== dataSourceType) {
            dispatch(
                getData(
                    dataSourceType,
                    actLocalQuery?.expr,
                    queryType,
                    limit,
                    name,
                    id,
                    direction,
                    dataSourceId,
                    currentDataSource?.url
                )
            );
        } else {
            dispatch(setIsEmptyView(true));
        }
    }, [dataSourceId, id]);

    // changes on changing exp

    useEffect(() => {
        setQueryInput(expr);
        setQueryValue([{ children: [{ text: expr }] }]);
        setQueryValid(onQueryValid(expr));
        decodeQueryAndUpdatePanel(queryInput, false);
        saveQuery();
        setLocalStorage();
    }, [expr]);

    // handlers

    function handleQueryChange(e: any) {
        setQueryValue(e);
        saveQuery(e);
    }

    const handleInputKeyDown = (e: any) => {
        if (e.code === "Enter" && e.ctrlKey) {
            onSubmit(e);
        }
    };

    const onMetricChange = (e: any) => {
        const query = [{ children: [{ text: e }] }];
        handleQueryChange(query);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const ds = dataSources.find((f: any) => f.id === dataSourceId);
        if (onQueryValid(queryInput) && ds) {
            try {
                updateHistory(
                    ds.type,
                    queryInput,
                    queryType,
                    limit,
                    id,
                    direction,
                    ds.id,
                    ds.url
                );

                // Decode query to translate into labels selection
                decodeQueryAndUpdatePanel(queryInput, true);

                updateLinksHistory();

                setLocalStorage();
            } catch (e: any) {
                console.error(e);
            }
        } else {
            dispatch(setIsEmptyView(true));

            console.log("Please make a log query", expr);
        }
    };
    const getLocalStorage = () => {
        try {
            const prevQuery =
                JSON.parse(localStorage.getItem("queryData") || "null") || [];

            if (prevQuery) {
                return prevQuery;
            } else {
                return [];
            }
        } catch (e: any) {
            return [];
        }
    };
    const setLocalStorage = () => {
        const queryData = {
            expr,
            queryId: id,
            dataSourceId: dataSourceId,
        };

        const prevData = getLocalStorage();
        let newData = [];

        if (
            prevData &&
            prevData.length > 0 &&
            Array.isArray(prevData) &&
            prevData.some(
                (s) => s.dataSourceId === dataSourceId && s.queryId === id
            )
        ) {
            newData = prevData.map((m) => {
                if (m.queryId === id && m.dataSourceId === dataSourceId) {
                    return { ...queryData };
                } else {
                    return m;
                }
            });
        } else {
            newData = [...prevData, queryData];
        }
        localStorage.setItem("queryData", JSON.stringify(newData));
    };

    const saveQuery = (e = []) => {
        const queryParams = new URLSearchParams(hash.replace("#", ""));
        const multiline = e
            ?.map((text: any) => text.children[0].text)
            .join("\n");
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                if (multiline) {
                    query.expr = multiline;
                }
            }
        });
        dispatch(panelAction(name, panel));
        queryParams.set(name, JSON.stringify(panel));
        setLocalStorage();
    };

    const onSubmitRate = (e: any) => {
        e.preventDefault();
        const isEmptyQuery = queryInput.length === 0;
        let query = "";
        if (!isEmptyQuery) {
            const isRate = queryInput.startsWith(`rate(`);

            if (dataSourceType === "metrics") {
                if (isRate) {
                    query = queryInput.replace(/{([^}]+)}/g, "{}");
                    query = query.replace(/\[\d+ms\]/, "[$__interval]");
                } else {
                    query = `rate(${queryInput.replace(
                        /{([^}]+)}/g,
                        "{}"
                    )}[$__interval])`;
                }
            } else {
                if (!isRate) {
                    query = `rate(${queryInput}[$__interval])`;
                } else {
                    query = queryInput.replace(/\[\d+ms\]/, `[$__interval]`);
                }
            }

            setQueryInput(query);

            setQueryValue([{ children: [{ text: query }] }]);

            setQueryValid(onQueryValid(query));
        }

        if (onQueryValid(query)) {
            const ds = dataSources.find((f: any) => f.id === dataSourceId);

            try {
                updateHistory(
                    ds.type,
                    query,
                    queryType,
                    limit,
                    id,
                    direction,
                    ds.id,
                    ds.url
                );
                // Decode query to translate into labels selection
                decodeQueryAndUpdatePanel(query, true);

                updateLinksHistory();
            } catch (e: any) {
                console.error(e);
            }
        } else {
            dispatch(setIsEmptyView(true));
            console.log("Please make a log query", expr);
        }
    };

    const updateHistory = (
        type: any,
        queryInput: any,
        queryType: any,
        limit: any,
        id: any,
        direction: any,
        dataSourceId: any,
        url: any
    ) => {
        const historyUpdated = historyService.add(
            {
                data: JSON.stringify({
                    type,
                    queryInput,
                    queryType,
                    limit,
                    direction,
                    dataSourceId: dataSourceId,
                    url,
                    panel: name,
                    id,
                }),
                url: window.location.hash,
            },
            10
        );

        dispatch(setQueryHistory(historyUpdated));
    };
    const decodeQueryAndUpdatePanel = (queryExpr: any, isSearch: any) => {
        const currentDataSource = dataSources.find(
            (f: any) => f?.id === dataSourceId
        );
        const labelsDecoded = decodeExpr(data.expr);
        const panel = [...panelQuery];

        panel.forEach((query) => {
            if (query.id === id) {
                if (isSearch) {
                    query.expr = queryExpr;
                }
                query.labels = [...labelsDecoded];
                query.browserOpen = false;
                query.dataSourceId = currentDataSource?.id;
                query.dataSourceType = currentDataSource?.type;
                query.dataSourceURL = currentDataSource?.url;
            }
        });

        dispatch(panelAction(name, panel));
        let querySubmit = "";

        let customStep = 0;

        if (queryExpr.includes(`$__interval`)) {
            const timeDiff = (stop.getTime() - start.getTime()) / 1000;

            const timeProportion = timeDiff / 30;

            const screenProportion: any = (width / window.innerWidth).toFixed(
                1
            );

            const intval = timeProportion / screenProportion;

            const ratiointval = Math.round(
                intval * (window as any).devicePixelRatio.toFixed(2)
            );
            querySubmit = queryExpr.replace(
                "[$__interval]",
                `[${ratiointval}s]`
            );
            customStep = ratiointval;
        } else {
            querySubmit = queryExpr;
        }

        if (isSearch) {
            dispatch(
                getData(
                    dataSourceType,
                    querySubmit,
                    queryType,
                    limit,
                    name,
                    id,
                    direction,
                    dataSourceId,
                    currentDataSource.url,
                    customStep
                )
            );
        }
    };
    const updateLinksHistory = () => {
        const ds = dataSources.find((f: any) => f?.id === dataSourceId);
        const storedUrl = saveUrl.add(
            {
                data: {
                    href: window.location.href,
                    url: ds?.url,
                    type: dataSourceType,
                    queryInput,
                    queryType,
                    limit,
                    panel: name,
                    id,
                },
                description: "From Query Submit",
            },
            10
        );

        dispatch(setLinksHistory(storedUrl));
    };
    function handleHistoryClick(e: any) {
        dispatch(setHistoryOpen(!historyOpen));
    }
    function showQuerySettings() {
        setOpen(open ? false : true);
    }
    function onClose() {
        showQuerySettings();
    }

    function onTraceSearchChange(e: any) {
        setTraceSearch((_: any) => e);
    }

    function handleStatsOpen(e: any) {
        const value = e.target.checked;
        setShowStatsOpen((_: any) => value);

        const prevPanel = JSON.parse(JSON.stringify(panelData));

        const newPanel = prevPanel?.map((m: any) => {
            if (m?.id === id) {
                return { ...m, isShowStats: value };
            }
            return m;
        });

        dispatch(panelAction(name, newPanel));
    }

    const switchTraceQueryType = (e: any) => {
        setTraceQueryType((_: any) => e);
    };

    // renderers

    const inlineQueryOptionsRenderer = (
        type: any,
        isSplit: any,
        isMobile: any,
        typeBar: any
    ) => {
        const isFullView = !isMobile && !isSplit;
        const isMetrics = type === "metrics" || type === "logs";

        if (isFullView && isMetrics) {
            return typeBar;
        }
        return null;
    };

    const querySettingRenderer = (
        isMobile: any,
        isSplit: any,
        dataSourceType: any,
        settingComp: any
    ) => {
        if (
            isMobile ||
            isSplit ||
            dataSourceType !== "flux" ||
            dataSourceType !== "traces"
        ) {
            return settingComp;
        }
        return null;
    };

    if (isEmbed) {
        return null;
    }

    const queryTypeRenderer = (
        type: any,
        traceSearch: any,
        querySearch: any,
        metricsSearch: any,
        showResultButton: any
    ) => {
        if (type === "traces") {
            return (
                <>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingRight: "15px",
                        }}
                    >
                        <TracesSwitch
                            value="traceId"
                            onChange={switchTraceQueryType}
                        />
                        {traceQueryType === "traceId" && showResultButton}
                    </div>
                    {traceQueryType === "traceId" && querySearch}
                    {traceQueryType === "search" && traceSearch}
                </>
            );
        }

        if (type === "metrics") {
            return (
                <>
                    {metricsSearch}
                    {querySearch}
                </>
            );
        }

        return querySearch;
    };

    // render

    if (isEmbed) {
        return null;
    }

    return (
        <div className={cx(maxWidth)} id={id}>
            <ThemeProvider theme={(themes as any)[theme]}>
                {dataSourceType !== "metrics" &&
                    dataSourceType !== "traces" && (
                        <MobileTopQueryMenuCont
                            {...props}
                            isSplit={isSplit}
                            dataSourceType={dataSourceType}
                            showQuerySettings={showQuerySettings}
                            queryHistory={queryHistory}
                            handleHistoryClick={handleHistoryClick}
                            queryValid={queryValid}
                            onSubmit={onSubmit}
                            onSubmitRate={onSubmitRate}
                            labels={labels}
                            loading={loading || false}
                            hasStats={hasStats}
                            showStatsOpen={showStatsOpen}
                            handleStatsOpen={handleStatsOpen}
                        />
                    )}

                {queryTypeRenderer(
                    dataSourceType,
                    <TracesSearch
                        {...props}
                        onSearchChange={onTraceSearchChange}
                    />,
                    <QueryBarCont
                        {...props}
                        isSplit={isSplit}
                        dataSourceType={dataSourceType}
                        handleQueryChange={handleQueryChange}
                        expr={expr}
                        queryValue={queryValue}
                        handleInputKeyDown={handleInputKeyDown}
                        queryHistory={queryHistory}
                        handleHistoryClick={handleHistoryClick}
                        queryValid={queryValid}
                        onSubmit={onSubmit}
                        onSubmitRate={onSubmitRate}
                        isTabletOrMobile={isTabletOrMobile}
                        labels={labels}
                        loading={loading || false}
                    />,
                    <MetricsSearch
                        {...props}
                        searchButton={
                            <ShowLogsButton
                                disabled={!queryValid}
                                loading={loading || false}
                                onClick={onSubmit}
                                isMobile={false}
                                alterText={"Use Query"}
                            />
                        }
                        logsRateButton={
                            <ShowLogsRateButton
                                disabled={!queryValid}
                                onClick={onSubmitRate}
                                isMobile={false}
                                alterText={"Use as Rate Query"}
                            />
                        }
                        statsSwitch={
                            <div className="options-input">
                                <SettingLabel>Show Stats</SettingLabel>
                                <Switch
                                    checked={showStatsOpen}
                                    size={"small"}
                                    onChange={handleStatsOpen}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            </div>
                        }
                        handleMetricValueChange={onMetricChange}
                    />,
                    <ShowLogsButton
                        disabled={!queryValid}
                        onClick={onSubmit}
                        loading={loading || false}
                        isMobile={false}
                        alterText={"Search Trace"}
                    />
                )}

                {inlineQueryOptionsRenderer(
                    dataSourceType,
                    isSplit,
                    isTabletOrMobile,
                    <QueryTypeBar {...props} />
                )}

                {querySettingRenderer(
                    isTabletOrMobile,
                    isSplit,
                    dataSourceType,
                    <QuerySetting
                        {...props}
                        open={open}
                        handleClose={onClose}
                        actPanel={panelQuery}
                        name={name}
                    />
                )}
            </ThemeProvider>
        </div>
    );
};

// query bar container (full view)

export const QueryBarCont = (props: any) => {
    const {
        isSplit,
        isTabletOrMobile,
        dataSourceType,
        handleQueryChange,
        expr,
        queryValue,
        handleInputKeyDown,
        queryHistory,
        handleHistoryClick,
        queryValid,
        onSubmit,
        onSubmitRate,
        loading,
    } = props;
    const buttonsHidden = () =>
        !isSplit &&
        !isTabletOrMobile &&
        dataSourceType !== "flux" &&
        dataSourceType !== "traces";
    return (
        <QueryBarContainer>
            {buttonsHidden() && dataSourceType === "logs" && (
                <ShowLabelsButton {...props} />
            )}

            <QueryEditor
                onQueryChange={handleQueryChange}
                defaultValue={expr || ""}
                value={queryValue}
                onKeyDown={handleInputKeyDown}
            />

            {buttonsHidden() && (
                <>
                    <HistoryButton
                        queryLength={queryHistory.length}
                        handleHistoryClick={handleHistoryClick}
                    />
                    {dataSourceType === "logs" && (
                        <ShowLogsRateButton
                            disabled={!queryValid}
                            onClick={onSubmitRate}
                            isMobile={false}
                        />
                    )}
                    <ShowLogsButton
                        disabled={!queryValid}
                        onClick={onSubmit}
                        isMobile={false}
                        loading={loading || false}
                    />
                </>
            )}
            {dataSourceType === "traces" &&
                dataSourceType === "metrics" &&
                isSplit && (
                    <>
                        <ShowLogsButton
                            disabled={!queryValid}
                            onClick={onSubmit}
                            isMobile={false}
                            loading={loading || false}
                        />
                    </>
                )}
        </QueryBarContainer>
    );
};

// mobile top query view (mobile view or splitted view)
export const MobileTopQueryMenuCont = (props: any) => {
    const dispatch = useDispatch();
    const {
        isSplit,
        showQuerySettings,
        queryHistory,
        handleHistoryClick,
        queryValid,
        onSubmit,
        onSubmitRate,
        data,
        name,
        loading,
        hasStats,
        showStatsOpen,
        handleStatsOpen,
    }: any = props;
    const { id, dataSourceType } = data;
    const [isChartViewSet, setIsChartViewSet]: any = useState(
        props.data.chartView
    );

    useEffect(() => {
        setIsChartViewSet(props.data.chartView);
    }, [setIsChartViewSet, props.data.chartView]);

    const panelQuery = useSelector((store: any) => store[name]);

    const withLabels = (type: any) => {
        if (type !== "flux" && type !== "metrics" && type !== "traces") {
            return (
                <>
                    <ShowLabelsButton {...props} isMobile={true} />
                    <ShowQuerySettingsButton
                        {...props}
                        isSplit={isSplit}
                        isMobile={true}
                        onClick={showQuerySettings}
                    />
                </>
            );
        }
        return null;
    };
    const getPanelQueryByID = (panel: any, queryId: any) => {
        return panel.find((query: any) => {
            return query.id === queryId;
        });
    };
    const handleChartViewSwitch = () => {
        // modify table view switch value
        const panel = [...panelQuery];

        const query = getPanelQueryByID(panel, id);
        if (typeof query !== "undefined") {
            query.chartView = !isChartViewSet;

            dispatch(panelAction(name, panel));
        }
    };
    return (
        <MobileTopQueryMenu isSplit={isSplit} dataSourceType={dataSourceType}>
            {withLabels(dataSourceType)}

            <HistoryButton
                queryLength={queryHistory?.length}
                handleHistoryClick={handleHistoryClick}
                isMobile={true}
            />
            {dataSourceType === "logs" && (
                <ShowLogsRateButton
                    disabled={!queryValid}
                    onClick={onSubmitRate}
                    isMobile={false}
                />
            )}

            {dataSourceType === "logs" && hasStats && (
                <div className="options-input">
                    <SettingLabel>Show Stats</SettingLabel>
                    <Switch
                        checked={showStatsOpen}
                        size={"small"}
                        onChange={handleStatsOpen}
                        inputProps={{ "aria-label": "controlled-switch" }}
                    />
                </div>
            )}

            <ShowLogsButton
                disabled={!queryValid}
                onClick={onSubmit}
                isMobile={true}
                loading={loading || false}
            />

            {dataSourceType === "flux" && (
                <div className="options-input">
                    <SettingLabel>Chart View</SettingLabel>
                    <Switch
                        checked={isChartViewSet}
                        size={"small"}
                        onChange={handleChartViewSwitch}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </div>
            )}
        </MobileTopQueryMenu>
    );
};
