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
import { QrynSwitch } from "../../../views/DataSources/ui";
import TracesSwitch from "../../TraceSearch/TracesSwitch";
import { setSplitView } from "../../StatusBar/components/SplitViewButton/setSplitView";

import { Switch } from "@mui/material";
import { SettingLabel } from "./styled";
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
    const { hash } = useLocation();
    const dispatch = useDispatch();
    const historyService = localService().historyStore();
<<<<<<< HEAD
    const { historyOpen, isEmbed, theme, queryHistory, start, stop } =
        useSelector((store) => store);
    const isSplit = useSelector((store) => store.isSplit);
=======
    const {
        apiUrl,
        historyOpen,
        isEmbed,
        theme,
        queryHistory,
        start,
        stop,
        isSplit
    } = useSelector((store) => store);
>>>>>>> 67352e9 (Added resizable Split and Query editors #109 #110)
    const panelQuery = useSelector((store) => store[name]);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 864px)" });
    const [queryInput, setQueryInput] = useState(data.expr);
    const [queryValid, setQueryValid] = useState(false);
    const [queryValue, setQueryValue] = useState(queryInit(data.expr));
    const [open, setOpen] = useState(false);
<<<<<<< HEAD
    // const [currentDataSource,setCurrentDatasource] = useState({})
    const dataSources = useSelector((store) => store.dataSources);
    const panelData = useSelector((store) => store[name]);
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

    useEffect(()=>{
        if(isTabletOrMobile && isSplit ){
          dispatch(setSplitView(false)) 
        } 
        

    },[isTabletOrMobile])
=======
    const wrapperRef = useRef(null)
    const labelsButtonRef = useRef(null)
    const buttonsContainerRef = useRef(null)
    useEffect(() => {});
>>>>>>> 67352e9 (Added resizable Split and Query editors #109 #110)
    const saveUrl = localUrl();
    const expr = useMemo(() => {
        return data.expr;
    }, [data.expr]);

    useEffect(() => {
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
    }, [expr]);

    function handleQueryChange(e) {
        setQueryValue(e);
        const queryParams = new URLSearchParams(hash.replace("#", ""));
        const multiline = e.map((text) => text.children[0].text).join("\n");
        const panel = [...panelQuery];

        panel.forEach((query) => {
            if (query.id === id) {
                query.expr = multiline;
            }
        });
        dispatch(panelAction(name, panel));
        queryParams.set("left", encodeURIComponent(JSON.stringify(panel)));
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
                updateHistory(queryInput,queryType,limit,id)

                // Decode query to translate into labels selection
                decodeQueryAndUpdatePanel(queryInput);

                // store into history

                updateLinksHistory();
            } catch (e) {
                console.log(e);
            }
        } else {
            dispatch(setIsEmptyView(true));

            console.log("Please make a log query", expr);
        }
    };

    const onSubmitRate = (e) => {
        e.preventDefault();
        const isEmptyQuery = queryInput.length === 0
        let query = '';
        if (!isEmptyQuery) {
            const isRate = queryInput.startsWith(`rate(`)
            const timeDiff = stop.getTime() - start.getTime()
            const interval = Math.round(timeDiff / width);
            if (!isRate) {
                query = `rate(${queryInput}[${interval}ms])`
                
            } else {
                query = queryInput.replace(/\[\d+ms\]/, `[${interval}ms]`)
            }
            setQueryInput(query)
            
            setQueryValue([{ children: [{ text: query }] }]);

            setQueryValid(onQueryValid(query));
        }
        if (onQueryValid(query)) {
            try {
                updateHistory(query,queryType,limit,id)
                // Decode query to translate into labels selection
                decodeQueryAndUpdatePanel(query);

                updateLinksHistory();
            } catch (e) {
                console.log(e);
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

    }
    const decodeQueryAndUpdatePanel = (query) => {
        const currentDataSource = dataSources.find(
            (f) => f.id === dataSourceId
        );
        if (currentDataSource?.type !== "flux") {
        
            decodeQuery(
                query,
                currentDataSource?.url,
                props.data.labels,
                currentDataSource?.id
            );
        }
        const labelsDecoded = decodeExpr(data.expr);
        const panel = [...panelQuery];

        panel.forEach((query) => {
            if (query.id === id) {
                query.labels = [...labelsDecoded];
                query.browserOpen = false;
                query.dataSourceId = currentDataSource.id;
                query.dataSourceType = currentDataSource.type;
                query.dataSourceURL = currentDataSource.url;
            }
        });

        dispatch(panelAction(name, panel));

        dispatch(
            getData(
                dataSourceType,
                query,
                queryType,
                limit,
                name,
                id,
                direction,
                dataSourceId,
                currentDataSource.url
            )
        );
    }
    const updateLinksHistory = () => {
        const storedUrl = saveUrl.add({
            data: window.location.href,
            description: "From Query Submit",
        });

        dispatch(setLinksHistory(storedUrl));
    }
    function handleHistoryClick(e) {
        dispatch(setHistoryOpen(!historyOpen));
    }
    function showQuerySettings() {
        setOpen(open ? false : true);
    }
    function onClose() {
        showQuerySettings();
    }
<<<<<<< HEAD

    const showFullQueryBar = (type, isSplit, isMobile) => {
        if (!isMobile && !isSplit && type !== "flux" && type !== "traces")
            return <QueryTypeBar {...props} />;
        return null;
    };

    if (isEmbed) {
        return null;
    }

    return (
        <div className={cx(maxWidth)} id={id}>
            <ThemeProvider theme={themes[theme]}>
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
                />
=======
    const getMaxWidth = () => {
        const labelButtonWidth = !isNaN(labelsButtonRef?.current?.clientWidth) ? labelsButtonRef?.current?.clientWidth : 0;
        const buttonsContainerWidth = !isNaN(buttonsContainerRef?.current?.clientWidth) ? buttonsContainerRef?.current?.clientWidth : 0;
        if (isSplit || isTabletOrMobile) {
            return 0;
        } else {
            return ( labelButtonWidth + buttonsContainerWidth + 5)
        }
    }
    return (
        !isEmbed && (
            <div
                className={css`
                    max-width: 100%;
                `}
            >
                <ThemeProvider theme={themes[theme]}>
                    <MobileTopQueryMenu isSplit={isSplit}>
                        <div
                            className={css`
                                display: flex;
                            `}
                        >
                            <ShowLabelsButton {...props} isMobile={true} />
>>>>>>> 67352e9 (Added resizable Split and Query editors #109 #110)

                {dataSourceType === "traces" && <TracesSearch {...props} />}

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
                />

                {showFullQueryBar(dataSourceType, isSplit, isTabletOrMobile)}
                {(isTabletOrMobile ||
                    isSplit ||
                    dataSourceType !== "flux" ||
                    dataSourceType !== "traces") && (
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
    } = props;
    const buttonsHidden = () => !isSplit && dataSourceType !== "flux" && dataSourceType !== 'traces';

    return (
        <QueryBarContainer>
            {buttonsHidden() && <ShowLabelsButton {...props} />}

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
<<<<<<< HEAD
                            onClick={onSubmitRate}
                            isMobile={false}
=======
                            onClick={onSubmit}
                            isMobile={true}
                        />
                    </MobileTopQueryMenu>
                    <QueryBarContainer>
                        {!isSplit && <span ref={labelsButtonRef}><ShowLabelsButton {...props} /></span>}
                        <div
                            style={{ flex: 1, maxWidth: `calc(100% - ${getMaxWidth()}px)` }}
                            ref={wrapperRef}
                        >
                            <QueryEditor
                                onQueryChange={handleQueryChange}
                                defaultValue={expr || ""}
                                value={queryValue}
                                isSplit={isSplit}
                                wrapperRef={wrapperRef?.current?.clientWidth}
                                onKeyDown={handleInputKeyDown}
                            />
                        </div>
                        {!isSplit && (
                            <div style={{ display: "flex", flex: "0" }} ref={buttonsContainerRef}>
                                <HistoryButton
                                    queryLength={queryHistory.length}
                                    handleHistoryClick={handleHistoryClick}
                                />

                                <ShowLogsButton
                                    disabled={!queryValid}
                                    onClick={onSubmit}
                                    isMobile={false}
                                />
                            </div>
                        )}
                    </QueryBarContainer>

                    {!isTabletOrMobile && !isSplit && (
                        <QueryTypeBar {...props} />
                    )}
                    {(isTabletOrMobile || isSplit) && (
                        <QuerySetting
                            {...props}
                            open={open}
                            handleClose={onClose}
                            actPanel={panelQuery}
                            name={name}
>>>>>>> 67352e9 (Added resizable Split and Query editors #109 #110)
                        />
                    )}
                    <ShowLogsButton
                        disabled={!queryValid}
                        onClick={onSubmit}
                        isMobile={false}
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
        name
    } = props;    
    const { id, dataSourceType } = data;
    const [isChartViewSet, setIsChartViewSet] = useState(props.data.chartView);

    useEffect(() => {
        setIsChartViewSet(props.data.chartView);
    }, [setIsChartViewSet, props.data.chartView]);
    const panelQuery = useSelector((store) => store[name]);
    // conditionally show labels
    const withLabels = (type) => {
        if (type !== "flux" && type !== "traces") {
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
        })
    }
    const handleChartViewSwitch = () => {
        // modify table view switch value
        const panel = [...panelQuery];
        
        const query = getPanelQueryByID(panel, id);
        if (typeof query !== 'undefined') {
            query.chartView = !isChartViewSet;

            dispatch(panelAction(name, panel));
        }
    }
    return (
        <MobileTopQueryMenu isSplit={isSplit} dataSourceType={dataSourceType}>
            {withLabels(dataSourceType)}

            <HistoryButton
                queryLength={queryHistory?.length}
                handleHistoryClick={handleHistoryClick}
                isMobile={true}
            />
            { dataSourceType === 'logs' &&
            <ShowLogsRateButton
                disabled={!queryValid}
                onClick={onSubmitRate}
                isMobile={false}
            />}
            <ShowLogsButton
                disabled={!queryValid}
                onClick={onSubmit}
                isMobile={true}
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
