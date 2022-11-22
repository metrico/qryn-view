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

export const QuerySetting = (props) => {
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
        panel.forEach((query) => {
            if (query.id === id) {
                query.traceQueyType = e;
            }
        });
        dispatch(panelAction(name, panel));
        setQueryTraceSwitch((prev) => e);
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
