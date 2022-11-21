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
    const { data, name } = props;
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
    const { historyOpen, isEmbed, theme, queryHistory, start, stop } =
        useSelector((store) => store);
    const isSplit = useSelector((store) => store.isSplit);
    const panelQuery = useSelector((store) => store[name]);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const [queryInput, setQueryInput] = useState(data.expr);
    const [queryValid, setQueryValid] = useState(false);
    const [queryValue, setQueryValue] = useState(queryInit(data.expr));
    const [open, setOpen] = useState(false);
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

    // const urlParams = useMemo(() => {
    //     const urlHash = new URLSearchParams(hash);
    //     return JSON.parse(decodeURIComponent(urlHash.get(name)));
    // }, [hash, name]);

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
                    query.labels = [...labelsDecoded]
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
                if(data) {
                    console.log(data)
                    const prevLabels = [...props.data.labels];
                    const prevMap = prevLabels.map((m) => m.name) || [];
                    const newLabels = [...data] ;
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
                        decodeQuery(expr, currentDataSource.url, newLabels,currentDataSource.id);
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
                // set new query into panel data history

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

                // Decode query to translate into labels selection
                const currentDataSource = dataSources.find(
                    (f) => f.id === dataSourceId
                );
                if (currentDataSource?.type !== "flux") {
                
                    decodeQuery(
                        queryInput,
                        currentDataSource?.url,
                        props.data.labels,
                        currentDataSource?.id
                    );
                }
                const labelsDecoded = decodeExpr(data.expr);
                const actDataSource = dataSources.find(
                    (f) => f.id === dataSourceId
                );
                const panel = [...panelQuery];

                panel.forEach((query) => {
                    if (query.id === id) {
                        query.labels = [...labelsDecoded];
                        query.browserOpen = false;
                        query.dataSourceId = actDataSource.id;
                        query.dataSourceType = actDataSource.type;
                        query.dataSourceURL = actDataSource.url;
                    }
                });

                dispatch(panelAction(name, panel));

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
                        actDataSource.url
                    )
                );

                // store into history

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
    function showQuerySettings() {
        setOpen(open ? false : true);
    }
    function onClose() {
        showQuerySettings();
    }

    const showFullQueryBar = (type, isSplit, isMobile) => {
        if (!isMobile && !isSplit && type !== "flux" && type !=='traces')
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
                />
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
                />

                {showFullQueryBar(dataSourceType, isSplit, isTabletOrMobile)}
                {(isTabletOrMobile || isSplit || dataSourceType !== "flux" || dataSourceType !== 'traces') && (
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
    const {
        isSplit,
        dataSourceType,
        showQuerySettings,
        queryHistory,
        handleHistoryClick,
        queryValid,
        onSubmit,
    } = props;
    // conditionally show labels
    const withLabels = (type) => {
        if (type !== "flux" && type !== 'traces') {
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

    return (
        <MobileTopQueryMenu isSplit={isSplit} dataSourceType={dataSourceType}>
            {withLabels(dataSourceType)}

            <HistoryButton
                queryLength={queryHistory?.length}
                handleHistoryClick={handleHistoryClick}
                isMobile={true}
            />

            <ShowLogsButton
                disabled={!queryValid}
                onClick={onSubmit}
                isMobile={true}
            />
        </MobileTopQueryMenu>
    );
};
