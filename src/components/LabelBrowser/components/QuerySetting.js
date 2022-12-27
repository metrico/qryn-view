import { Dialog, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import QueryTypeSwitch from "../../QueryTypeBar/components/QueryTypeSwitch";
import {
    DIRECTION_SWITCH_OPTIONS,
    panelAction,
    SWITCH_OPTIONS,
    TRACE_OPTIONS,
} from "./QueryBar";
import {
    InputGroup,
    SettingCloseBtn,
    SettingCont,
    SettingHeader,
    SettingLabel,
    SettingsInputContainer,
} from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import QueryLimit from "../../QueryTypeBar/components/QueryLimit";
import { DialogStyles } from "../../../plugins/settingsdialog/SettingsDialog";
export const QuerySetting = (props) => {
    const dispatch = useDispatch();
    const responseType = useSelector((store) => store.responseType);
    const { hash } = useLocation();
    const { id, idRef, dataSourceType, isBuilder } = props.data;
    const { open, handleClose, actPanel, name } = props;
    const [isTableViewSet, setIsTableViewSet] = useState(props.data.tableView);
    const [isShowTsSet, setIsShowTsSet] = useState(props.data.isShowTs);
    const [isBuilderSet, setIsBuilderSet] = useState(isBuilder || false);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(
        props.data.queryType
    );
    const [queryTraceSwitch, setQueryTraceSwitch] = useState(
        props.data.traceQueryType || "traceId"
    );
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
                const query = getPanelQueryByIDRef(panel, idRef);
                if (typeof query !== "undefined") {
                    query.queryType = queryMD.queryType;
                    query.direction = queryMD.direction;
                    dispatch(panelAction(name, panel));
                }
            }
        }
    }, []);
    const getPanelQueryByID = (panel, queryId) => {
        return panel.find((query) => {
            return query.id === queryId;
        });
    };
    const getPanelQueryByIDRef = (panel, idRef) => {
        return panel.find((query) => {
            return query.id === idRef;
        });
    };
    useEffect(() => {
        setIsTableViewSet(props.data.tableView);
    }, [setIsTableViewSet, props.data.tableView]);

    useEffect(() => {
        setIsShowTsSet(props.data.isShowTs);
    }, [setIsShowTsSet, props.data.isShowTs]);

    useEffect(() => {
        setIsBuilderSet(props.data.isBuilder);
    }, [setIsBuilderSet, props.data.isBuilder]);

    function onSwitchChange(e) {
        // modify query type switch value
        const panel = [...actPanel];
        const query = getPanelQueryByID(panel, id);
        if (typeof query !== "undefined") {
            query.queryType = e;
            dispatch(panelAction(name, panel));
        }
        setQueryTypeSwitch(e);
    }

    function onTraceQueryChange(e) {
        const panel = [...actPanel];

        const query = getPanelQueryByID(panel, id);
        if (typeof query !== "undefined") {
            query.traceQueryType = e;
            dispatch(panelAction(name, panel));
        }
        setQueryTraceSwitch((prev) => e);
    }
    function onDirectionSwitchChange(e) {
        // modify query type switch value
        const panel = [...actPanel];
        const query = getPanelQueryByID(panel, id);
        if (typeof query !== "undefined") {
            query.direction = e;
            dispatch(panelAction(name, panel));
        }
        setDirectionSwitch(e);
    }

    function handleTableViewSwitch() {
        // modify table view switch value
        const panel = [...actPanel];

        const query = getPanelQueryByID(panel, id);
        if (typeof query !== "undefined") {
            query.tableView = isTableViewSet ? false : true;

            dispatch(panelAction(name, panel));
        }
    }

    const traceOptions = () => (
        <QueryTypeSwitch
            label={"Trace Type"}
            options={TRACE_OPTIONS}
            onChange={onTraceQueryChange}
            defaultActive={queryTraceSwitch}
        />
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
    
    function handleBuilderSwitch() {
        const panel = [...actPanel];
        panel.forEach((query) => {
            if (query.id === id) {
                query.isBuilder = isBuilderSet ? false : true;
            }
        });

        dispatch(panelAction(name, panel));
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                classes: {
                    root: DialogStyles
                }
              }}>
            <SettingCont>
                <SettingHeader>
                    <h3>Query Options</h3>
                    <SettingCloseBtn onClick={handleClose}>
                        {" "}
                        <CloseIcon />{" "}
                    </SettingCloseBtn>
                </SettingHeader>

                <SettingsInputContainer>
                    <div className="options-input">{traceOptions()}</div>
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
                    {dataSourceType === "flux" && (
                        <div className="options-input">
                            <SettingLabel>Chart View</SettingLabel>
                            <Switch
                                checked={isTableViewSet}
                                size={"small"}
                                onChange={handleTableViewSwitch}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        </div>
                    )}
                    {responseType !== "vector" && (
                        <div className="options-input">
                            {/* <InputGroup>
                                <SettingLabel>Table View</SettingLabel>
                                <Switch
                                    checked={isTableViewSet}
                                    size={"small"}
                                    onChange={handleTableViewSwitch}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            </InputGroup> */}
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
                            <InputGroup>
                                <SettingLabel>Query Builder</SettingLabel>
                                <Switch
                                    checked={isBuilderSet}
                                    size={"small"}
                                    onChange={handleBuilderSwitch}
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
