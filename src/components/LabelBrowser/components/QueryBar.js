/**React */
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/**npm */
import { css } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";
import { Dialog, Switch } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import CloseIcon from "@mui/icons-material/Close";
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
import QueryTypeSwitch from "../../QueryTypeBar/components/QueryTypeSwitch";
import QueryLimit from "../../QueryTypeBar/components/QueryLimit";
/**Theme */
import { themes } from "../../../theme/themes";

/**Styled*/
import {
    InputGroup,
    SettingCont,
    SettingHeader,
    SettingCloseBtn,
    SettingsInputContainer,
    SettingLabel,
} from "./styled";
import setDataSources from "../../../views/DataSources/store/setDataSources";
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

export const QueryBar = (props) => {
    const { data, name } = props;
    const {
        queryType,
        limit,
        id,
        dataSourceType,
        direction,
        dataSourceId,
        dataSourceURL,
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
    const dataSources = useSelector((store) => store.dataSources);

    useEffect(() => {});
    const saveUrl = localUrl();
    const expr = useMemo(() => {
        return data.expr;
    }, [data.expr]);

    useEffect(() => {
        // check for url params and for datasources
        const urlParams = new URLSearchParams(hash);
        let currentDataSource = {};
        const panel = JSON.parse(decodeURIComponent(urlParams.get(name)));
        const currentPanel = panel?.find((f) => f.id === id);

        if (dataSources) {
            currentDataSource = dataSources?.find((f) => f.id === dataSourceId);

            if (
                currentDataSource &&
                currentPanel &&
                currentPanel?.dataSourceURL !== ""
            ) {
                currentDataSource.url = currentPanel?.dataSourceURL;
            }

            const dsCopy = JSON.parse(JSON.stringify(dataSources));

            dsCopy?.forEach((ds) => {
                if (ds.id === currentPanel?.dataSourceId) {
                    ds.url = currentDataSource.url;
                }
            });
            // if there is a datasource url at url params, update datadources
            dispatch(setDataSources([...dsCopy]));

            const labels = sendLabels(
                dataSourceId,
                dataSourceType,
                currentDataSource?.url,
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
                        currentDataSource?.url || dataSourceURL
                    )
                );

            if (onQueryValid(expr) && currentDataSource?.type !== "flux") {
                return labels.then((data) => {
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
                        decodeQuery(expr, currentDataSource.url, newLabels);
                    }
                });
            } else {
                // if there is nothing to request, show empty view
                dispatch(setIsEmptyView(true));
            }
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
                        props.data.labels
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
                        dataSourceURL
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
    return (
        !isEmbed && (
            <div
                className={css`
                    max-width: 100%;
                `}
                id={id}
            >
                <ThemeProvider theme={themes[theme]}>
                    <MobileTopQueryMenu
                        isSplit={isSplit}
                        dataSourceType={dataSourceType}
                    >
                        <div
                            className={css`
                                display: flex;
                            `}
                        >
                            {dataSourceType !== "flux" && (
                                <>
                                    <ShowLabelsButton
                                        {...props}
                                        isMobile={true}
                                    />

                                    <ShowQuerySettingsButton
                                        {...props}
                                        isSplit={isSplit}
                                        isMobile={true}
                                        onClick={showQuerySettings}
                                    />
                                </>
                            )}

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
                        {!isSplit && dataSourceType !== "flux" && (
                            <ShowLabelsButton {...props} />
                        )}

                        <QueryEditor
                            onQueryChange={handleQueryChange}
                            defaultValue={expr || ""}
                            value={queryValue}
                            onKeyDown={handleInputKeyDown}
                        />

                        {!isSplit && dataSourceType !== "flux" && (
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

                    {!isTabletOrMobile &&
                        !isSplit &&
                        dataSourceType !== "flux" && (
                            <QueryTypeBar {...props} />
                        )}

                    {(isTabletOrMobile ||
                        isSplit ||
                        dataSourceType !== "flux") && (
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
        )
    );
};

export const QuerySetting = (props) => {
    console.log(props);

    const { data } = props;

    const { dataSourceType } = data;

    console.log(dataSourceType);

    const dispatch = useDispatch();

    const responseType = useSelector((store) => store.responseType);

    const { hash } = useLocation();
    const { id, idRef } = props.data;
    const { open, handleClose, actPanel, name } = props;
    const [isTableViewSet, setIsTableViewSet] = useState(props.data.tableView);
    const [isShowTsSet, setIsShowTsSet] = useState(props.data.isShowTs);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(
        props.data.queryType
    );
    const [queryTraceSwitch, setQueryTraceSwitch] = useState(props.data.traceQueryType || 'traceId')
    const [directionSwitch, setDirectionSwitch] = useState(
        props.data.direction
    );
    useEffect(() => {
        const urlParams = new URLSearchParams(hash.replace("#", ""));
        const urlPanel = urlParams.get(name);
        const parsedPanel = JSON.parse(decodeURIComponent(urlPanel));
        if (parsedPanel?.length > 0) {
            const queryMD = parsedPanel.find((f) => f.idRef === idRef);

            if (queryMD) {
                const panel = [...actPanel];
                panel.forEach((query) => {
                    if (query.idRef === idRef) {
                        query.queryType = queryMD.queryType;
                        query.direction = queryMD.direction;
                    }
                });
                dispatch(panelAction(name, panel));
            }
        }
    }, []);

    useEffect(() => {
        setIsTableViewSet(props.data.tableView);
    }, [setIsTableViewSet, props.data.tableView]);

    useEffect(() => {
        setIsShowTsSet(props.data.isShowTs);
    }, [setIsShowTsSet, props.data.isShowTs]);

    function onSwitchChange(e) {
        // modify query type switch value
        const panel = [...actPanel];
        panel.forEach((query) => {
            if (query.id === id) {
                query.queryType = e;
            }
        });

        dispatch(panelAction(name, panel));
        setQueryTypeSwitch(e);
    }


    function onTraceQueryChange(e) {
        const panel = [...actPanel];
        panel.forEach(query => {
            if(query.id === id) {
                query.traceQueyType = e;
            }
        })
        dispatch(panelAction(name, panel));
        setQueryTraceSwitch(prev => e);

    }
    function onDirectionSwitchChange(e) {
        // modify query type switch value
        const panel = [...actPanel];
        panel.forEach((query) => {
            if (query.id === id) {
                query.direction = e;
            }
        });

        dispatch(panelAction(name, panel));
        setDirectionSwitch(e);
    }

    function handleTableViewSwitch() {
        // modify table view switch value
        const panel = [...actPanel];
        panel.forEach((query) => {
            if (query.id === id) {
                query.tableView = isTableViewSet ? false : true;
            }
        });
        dispatch(panelAction(name, panel));
    }

    const traceOptions = () => (
        <div className="options-input">
            <QueryTypeSwitch
                label={"Trace Type"}
                options={TRACE_OPTIONS}
                onChange={onTraceQueryChange}
                defaultActive={queryTraceSwitch}
            />
        </div>
    );

    function handleTsSwitch() {
        const panel = [...actPanel];
        panel.forEach((query) => {
            if (query.id === id) {
                query.isShowTs = isShowTsSet ? false : true;
            }
        });

        dispatch(panelAction(name, panel));
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <SettingCont>
                <SettingHeader>
                    <h3>Query Options</h3>
                    <SettingCloseBtn onClick={handleClose}>
                        {" "}
                        <CloseIcon />{" "}
                    </SettingCloseBtn>
                </SettingHeader>

                <SettingsInputContainer>
                    <div className="options-input">
                    { traceOptions()}
                    </div>
                    <div className="options-input">
                        
                        <QueryTypeSwitch
                            label={"Query Type"}
                            options={SWITCH_OPTIONS}
                            onChange={onSwitchChange}
                            defaultActive={queryTypeSwitch}
                        />
                    </div>
                    <div className="options-input">
                        <QueryTypeSwitch
                            label={"Direction"}
                            options={DIRECTION_SWITCH_OPTIONS}
                            onChange={onDirectionSwitchChange}
                            defaultActive={directionSwitch}
                        />
                    </div>
                    <div className="options-input">
                        <QueryLimit {...props} />
                    </div>

                    {responseType !== "vector" && (
                        <div className="options-input">
                            <InputGroup>
                                <SettingLabel>Table View</SettingLabel>
                                <Switch
                                    checked={isTableViewSet}
                                    size={"small"}
                                    onChange={handleTableViewSwitch}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            </InputGroup>
                            <InputGroup>
                                <SettingLabel>Timestamp</SettingLabel>
                                <Switch
                                    checked={isShowTsSet}
                                    size={"small"}
                                    onChange={handleTsSwitch}
                                    inputProps={{
                                        "aria-label": "controlled-ts",
                                    }}
                                />
                            </InputGroup>
                        </div>
                    )}
                </SettingsInputContainer>
            </SettingCont>
        </Dialog>
    );
};
