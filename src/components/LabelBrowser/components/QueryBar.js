/**React */
import { useState, useEffect, useRef, useMemo } from "react";
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
export function panelAction(name, value) {
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

export const QueryBar = (props) => {
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
    const {data:{loading}} = props
    const { hash } = useLocation();
    const dispatch = useDispatch();
    const historyService = localService().historyStore();
    const { historyOpen, isEmbed, theme, queryHistory, start, stop } =
        useSelector((store) => store);
    const isSplit = useSelector((store) => store.isSplit);
    const panelQuery = useSelector((store) => store[name]);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 864px)" });
    const [queryInput, setQueryInput] = useState(data.expr);
    const [queryValid, setQueryValid] = useState(false);
    const [queryValue, setQueryValue] = useState(queryInit(data.expr));
    const [traceQueryType, setTraceQueryType] = useState("traceId");
    const [labels, setLabels] = useState([]);
    const [traceSearch, setTraceSearch] = useState({});
    const [open, setOpen] = useState(false);
    // const [currentDataSource,setCurrentDatasource] = useState({})
    const dataSources = useSelector((store) => store.dataSources);
    const panelData = useSelector((store) => store[name]);

    const actLocalQuery = useMemo(() => {
        let exprQuery = { expr: "", dataSourceId, queryId: id };
        try {
            const localData =
                JSON.parse(localStorage.getItem("queryData")) || [];
            if (localData && localData?.length > 0) {
                const fromLocal = localData?.find(
                    (f) => f.dataSourceId === dataSourceId && f.queryId === id
                );
                if (fromLocal) {
                    exprQuery = { ...fromLocal };
                }
                return exprQuery;
            } else {
                return exprQuery;
            }
        } catch (e) {
            console.error(e);
            return exprQuery;
        }
    }, [id, dataSourceId]);

    // const actLocalDsSelected = useMemo(() => {
    //     try {
    //         const localData = JSON.parse(localStorage.getItem("dsSelected"));

    //         if(localData?.length > 0) {
    //             const localStored = localData?.find((f) => f.queryId === id) ;
    //             if(localStored) {
    //                 return localStored
    //             } else {
    //                 return {queryId:id,dataSourceId};
    //             }

    //         } else {
    //             return {queryId:id,dataSourceId};
    //         }

    //     } catch (e) {
    //         console.log(e);
    //         return {queryId:id,dataSourceId};
    //     }
    // }, [id]);

    const actLocalDs = useMemo(() => {
        try {
            const localData = JSON.parse(localStorage.getItem("dataSources"));
            return localData?.find((f) => f.id === dataSourceId);
        } catch (e) {
            return {};
        }
    }, [dataSourceId]);

    const initialDefault = useMemo(() => {
        return defaultDataSources.find((f) => f.id === dataSourceId);
    }, [dataSourceId]);

    useEffect(() => {
        if (isTabletOrMobile && isSplit) {
            dispatch(setSplitView(false));
        }
    }, [isTabletOrMobile]);

    const saveUrl = localUrl();
    const expr = useMemo(() => {
        return data.expr;
    }, [data.expr]);

    useEffect(() => {
        setQueryInput(actLocalQuery.expr);
        setQueryValue([{ children: [{ text: actLocalQuery.expr }] }]);

        const dataSource = dataSources?.find((f) => f.id === dataSourceId);

        let currentDataSource = {};

        if (
            actLocalDs &&
            actLocalDs?.url !== initialDefault &&
            actLocalDs?.url !== ""
        ) {
            currentDataSource = { ...actLocalDs };

            const panelCP = [...panelData];

            if (currentDataSource?.type !== "flux") {
                decodeQuery(
                    queryInput,
                    currentDataSource?.url,
                    props.data.labels,
                    currentDataSource.id
                );
            }
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

        // search for auth params  and send inside
        const labels = sendLabels(
            dataSourceId,
            dataSourceType,
            currentDataSource?.url, // which one should be?
            start,
            stop
        );
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

        if (onQueryValid(expr) && currentDataSource?.type !== "flux") {
            return labels.then((data) => {
                if (data) {
                    const prevLabels = [...props.data.labels];
                    const prevMap = prevLabels.map((m) => m.name) || [];
                    const newLabels = [...data];
                    setLabels(newLabels);
                    if (newLabels.length > 0) {
                        if (prevMap.length > 0) {
                            newLabels.forEach((l) => {
                                const labelFound = prevMap.includes(l.name);
                                if (labelFound) {
                                    const pl = prevLabels.find(
                                        (f) => f.name === l.name
                                    );
                                    l = { ...pl };
                                }
                            });
                        }
                        decodeQuery(
                            expr,
                            currentDataSource.url,
                            newLabels,
                            currentDataSource.id
                        );
                    }
                }
            });
        } else {
            // if there is nothing to request, show empty view
            dispatch(setIsEmptyView(true));
        }
    }, []);

    useEffect(() => {
        setQueryInput(expr);
        setQueryValue([{ children: [{ text: expr }] }]);
        setQueryValid(onQueryValid(expr));
        decodeQueryAndUpdatePanel(queryInput, false);
        saveQuery();
        setLocalStorage();
    }, [expr]);

    useEffect(() => {
        setQueryInput(actLocalQuery.expr);
        setQueryValue([{ children: [{ text: actLocalQuery.expr }] }]);

        const dataSource = dataSources?.find((f) => f.id === dataSourceId);

        let currentDataSource = {};

        if (
            actLocalDs &&
            actLocalDs?.url !== initialDefault &&
            actLocalDs?.url !== ""
        ) {
            currentDataSource = { ...actLocalDs };

            const panelCP = [...panelData];

            if (currentDataSource?.type !== "flux") {
                decodeQuery(
                    queryInput,
                    currentDataSource?.url,
                    props.data.labels,
                    currentDataSource.id
                );
            }
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

        // search for auth params  and send inside
        const labels = sendLabels(
            dataSourceId,
            dataSourceType,
            currentDataSource?.url, // which one should be?
            start,
            stop
        );
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
        // if is view only mode (embedded) do an auto request on init

        if (onQueryValid(expr) && currentDataSource?.type !== "flux") {
            return labels.then((data) => {
                if (data) {
                    const prevLabels = [...props.data.labels];
                    const prevMap = prevLabels.map((m) => m.name) || [];
                    const newLabels = [...data];
                    setLabels(newLabels);
                    if (newLabels.length > 0) {
                        if (prevMap.length > 0) {
                            newLabels.forEach((l) => {
                                const labelFound = prevMap.includes(l.name);
                                if (labelFound) {
                                    const pl = prevLabels.find(
                                        (f) => f.name === l.name
                                    );
                                    l = { ...pl };
                                }
                            });
                        }
                        decodeQuery(
                            expr,
                            currentDataSource.url,
                            newLabels,
                            currentDataSource.id
                        );
                    }
                }
            });
        } else {
            // if there is nothing to request, show empty view
            dispatch(setIsEmptyView(true));
        }
    }, [dataSourceId, id]);

    function handleQueryChange(e) {
        setQueryValue(e);
        saveQuery(e);
    }

    const handleInputKeyDown = (e) => {
        if (e.code === "Enter" && e.ctrlKey) {
            onSubmit(e);
        }
    };

    const onMetricChange = (e) => {
        const query = [{ children: [{ text: e }] }];
        handleQueryChange(query);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (onQueryValid(queryInput)) {
            try {
                updateHistory(queryInput, queryType, limit, id);

                // Decode query to translate into labels selection
                decodeQueryAndUpdatePanel(queryInput, true);

                updateLinksHistory();

                setLocalStorage();
            } catch (e) {
                console.error(e);
            }
        } else {
            dispatch(setIsEmptyView(true));

            console.log("Please make a log query", expr);
        }
    };
    const getLocalStorage = () => {
        // 1- if has previous id with data => modify data
        // 2- if no previous data => create entry
        try {
            const prevQuery =
                JSON.parse(localStorage.getItem("queryData")) || [];

            if (prevQuery) {
                return prevQuery;
            } else {
                return [];
            }
        } catch (e) {
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
        const multiline = e?.map((text) => text.children[0].text).join("\n");
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                if (multiline) {
                    query.expr = multiline;
                }
            }
        });
        dispatch(panelAction(name, panel));
        queryParams.set(name, encodeURIComponent(JSON.stringify(panel)));
        setLocalStorage();
    };
    const onSubmitRate = (e, type = "logs") => {
        e.preventDefault();
        const isEmptyQuery = queryInput.length === 0;
        let query = "";
        if (!isEmptyQuery) {
            const isRate = queryInput.startsWith(`rate(`);

            if (type === "metrics") {
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
            try {
                updateHistory(query, queryType, limit, id);
                // Decode query to translate into labels selection
                decodeQueryAndUpdatePanel(query, true);

                updateLinksHistory();
            } catch (e) {
                console.error(e);
            }
        } else {
            dispatch(setIsEmptyView(true));
            console.log("Please make a log query", expr);
        }
    };

    const updateHistory = (queryInput, queryType, limit, id) => {
        const historyUpdated = historyService.add({
            data: JSON.stringify({
                type: dataSourceType,
                queryInput,
                queryType,
                limit,
                panel: name,
                id,
            }),
            url: window.location.hash,
        });

        dispatch(setQueryHistory(historyUpdated));
    };
    const decodeQueryAndUpdatePanel = (queryExpr, isSearch) => {
       
        const currentDataSource = dataSources.find(
            (f) => f.id === dataSourceId
        );
        if (currentDataSource?.type !== "flux") {
            decodeQuery(
                queryExpr,
                currentDataSource?.url,
                props.data.labels,
                currentDataSource?.id
            );
        }
        const labelsDecoded = decodeExpr(data.expr);
        const panel = [...panelQuery];

        panel.forEach((query) => {
            if (query.id === id) {
                if (isSearch) {
                    query.expr = queryExpr;
                }
                query.labels = [...labelsDecoded];
                query.browserOpen = !isSearch && dataSourceType === "logs";
                query.dataSourceId = currentDataSource.id;
                query.dataSourceType = currentDataSource.type;
                query.dataSourceURL = currentDataSource.url;
            }
        });

        dispatch(panelAction(name, panel));
        let querySubmit = "";

        let customStep = 0;

        if (queryExpr.includes(`$__interval`)) {
            const timeDiff = (stop.getTime() - start.getTime()) / 1000;

            const timeProportion = timeDiff / 30;

            const screenProportion = (width / window.innerWidth).toFixed(1);

            const intval = timeProportion / screenProportion;

            const ratiointval = Math.round(
                intval * window.devicePixelRatio.toFixed(2)
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
        const storedUrl = saveUrl.add({
            data: window.location.href,
            description: "From Query Submit",
        });

        dispatch(setLinksHistory(storedUrl));
    };
    function handleHistoryClick(e) {
        dispatch(setHistoryOpen(!historyOpen));
    }
    function showQuerySettings() {
        setOpen(open ? false : true);
    }
    function onClose() {
        showQuerySettings();
    }

    function onTraceSearchChange(e) {
        setTraceSearch((_) => e);
    }

    const inlineQueryOptionsRenderer = (type, isSplit, isMobile, typeBar) => {
        const isFullView = !isMobile && !isSplit;
        const isMetrics = type === "metrics" || type === "logs";

        if (isFullView && isMetrics) {
            return typeBar;
        }
        return null;
    };

    const querySettingRenderer = (
        isMobile,
        isSplit,
        dataSourceType,
        settingComp
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

    const switchTraceQueryType = (e) => {
        setTraceQueryType((_) => e);
    };

    const queryTypeRenderer = (
        type,
        traceSearch,
        querySearch,
        metricsSearch,
        showResultButton
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

    if (isEmbed) {
        return null;
    }

    return (
        <div className={cx(maxWidth)} id={id}>
            <ThemeProvider theme={themes[theme]}>
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
                            loading={loading}
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
                        loading={loading}
                    />,
                    <MetricsSearch
                        {...props}
                        searchButton={
                            <ShowLogsButton
                                disabled={!queryValid}
                                loading={loading}
                                onClick={onSubmit}
                                isMobile={false}
                                alterText={"Use Query"}
                            />
                        }
                        logsRateButton={
                            <ShowLogsRateButton
                                disabled={!queryValid}
                                onClick={(e) => onSubmitRate(e, "metrics")}
                                isMobile={false}
                                alterText={"Use as Rate Query"}
                            />
                        }
                        handleMetricValueChange={onMetricChange}
                    />,
                    <ShowLogsButton
                        disabled={!queryValid}
                        onClick={onSubmit}
                        loading={loading}
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

export const QueryBarCont = (props) => {
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
        loading
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
                        loading={loading}
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
                            loading={loading}
                        />
                    </>
                )}
        </QueryBarContainer>
    );
};

export const MobileTopQueryMenuCont = (props) => {
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
        loading
    } = props;
    const { id, dataSourceType } = data;
    const [isChartViewSet, setIsChartViewSet] = useState(props.data.chartView);

    useEffect(() => {
        setIsChartViewSet(props.data.chartView);
    }, [setIsChartViewSet, props.data.chartView]);

    const panelQuery = useSelector((store) => store[name]);

    const withLabels = (type) => {
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
    const getPanelQueryByID = (panel, queryId) => {
        return panel.find((query) => {
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
            <ShowLogsButton
                disabled={!queryValid}
                onClick={onSubmit}
                isMobile={true}
                loading={loading}
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
