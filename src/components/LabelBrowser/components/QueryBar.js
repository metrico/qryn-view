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
import loadLogs from "../../../actions/loadLogs";
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
import debugLog from "../helpers/debugLog";
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
export const QueryBar = (props) => {
    const { data, name } = props;
    const { queryType, limit, id } = data;
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
    const panelQuery = useSelector((store) => store[name]);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 914px)" });
    const [queryInput, setQueryInput] = useState(data.expr);
    const [queryValid, setQueryValid] = useState(false);
    const [queryValue, setQueryValue] = useState(queryInit(data.expr));
    const [open, setOpen] = useState(false);

    useEffect(() => {});
    const saveUrl = localUrl();
    const expr = useMemo(() => {
        return data.expr;
    }, [data.expr]);

    useEffect(() => {
        const dLog = debugLog(expr);
        debug && dLog.logicQueryBar();
        const labels = sendLabels(apiUrl, start, stop);

        if (isEmbed) dispatch(loadLogs(queryInput, queryType, limit, name, id));
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
                const historyUpdated = historyService.add({
                    data: JSON.stringify({
                        queryInput,
                        queryType,
                        limit,
                        panel: name,
                        id,
                    }),
                    url: window.location.hash,
                });

                dispatch(setQueryHistory(historyUpdated));

                decodeQuery(queryInput, apiUrl, labels);

                const labelsDecoded = decodeExpr(data.expr);

                const panel = [...panelQuery];
                panel.forEach((query) => {
                    if (query.id === id) {
                        query.labels = [...labelsDecoded];
                        query.browserOpen = false;
                    }
                });

                dispatch(panelAction(name, panel));

                dispatch(loadLogs(queryInput, queryType, limit, name, id));

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
        setOpen( open ? false: true)
    }
    function onClose() {
        showQuerySettings()
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

                            <ShowQuerySettingsButton
                                {...props}
                                isMobile={true}
                                onClick={showQuerySettings}
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

                    {!isTabletOrMobile && <QueryTypeBar {...props} />}
                    {isTabletOrMobile && (
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
    const dispatch = useDispatch();

    const responseType = useSelector((store) => store.responseType);

    const { hash } = useLocation();
    const { id, idRef } = props.data;
    const { open, handleClose, actPanel, name } = props;
    const [isTableViewSet, setIsTableViewSet] = useState(props.data.tableView);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(
        props.data.queryType
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
                    }
                });
                dispatch(panelAction(name, panel));
            }
        }
    }, []);

    useEffect(() => {
        setIsTableViewSet(props.data.tableView);
    }, [setIsTableViewSet, props.data.tableView]);

 

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
                        <QueryTypeSwitch
                            options={SWITCH_OPTIONS}
                            onChange={onSwitchChange}
                            defaultActive={queryTypeSwitch}
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
                        </div>
                    )}
                </SettingsInputContainer>
            </SettingCont>
        </Dialog>
    );
};
