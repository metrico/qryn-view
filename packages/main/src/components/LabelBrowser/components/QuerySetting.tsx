import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import QueryTypeSwitch from "../../QueryTypeBar/components/QueryTypeSwitch";
import {
    DIRECTION_SWITCH_OPTIONS,
    panelAction,
    SWITCH_OPTIONS,
    TRACE_OPTIONS,
} from "./QueryBar/QueryBar";
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
import { DialogStyles } from "@ui/plugins/settingsdialog/SettingsDialog";
import CustomSwitch from "@ui/qrynui/CustomSwitch/CustomSwitch";

// Query setting dialog menu
type QuerySettingProps = {
    open: boolean;
    actPanel: any;
    data: any;
    queries: any;
    launchQuery: string;
    name: string;
    width: number;
    handleClose: () => void;
};

const QuerySetting: React.FC<QuerySettingProps> = (props) => {
    const dispatch: any = useDispatch();
    const responseType = useSelector((store: any) => store.responseType);
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
        const urlParams = new URLSearchParams(hash.replace(/#/, ""));
        const urlPanel: any = urlParams.get(name);

        try {
            const parsedUrlPanel = JSON.parse(decodeURIComponent(urlPanel));

            if (parsedUrlPanel?.length > 0) {
                const queryFromUrl = parsedUrlPanel.find(
                    (f: any) => f.idRef === idRef
                );
                if (queryFromUrl) {
                    const panel = [...actPanel];

                    const query = getPanelQueryByIDRef(panel, idRef);

                    if (typeof query !== "undefined") {
                        query.queryType = queryFromUrl.queryType;
                        query.direction = queryFromUrl.direction;
                        dispatch(panelAction(name, panel));
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    const getPanelQueryByID = (panel: any, queryId: any) => {
        return panel.find((query: any) => {
            return query.id === queryId;
        });
    };
    const getPanelQueryByIDRef = (panel: any, idRef: any) => {
        return panel.find((query: any) => {
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

    function onSwitchChange(e: any) {
        // modify query type switch value
        const panel = [...actPanel];
        const query = getPanelQueryByID(panel, id);
        if (typeof query !== "undefined") {
            query.queryType = e;
            dispatch(panelAction(name, panel));
        }
        setQueryTypeSwitch(e);
    }

    function onTraceQueryChange(e: any) {
        const panel = [...actPanel];

        const query = getPanelQueryByID(panel, id);
        if (typeof query !== "undefined") {
            query.traceQueryType = e;
            dispatch(panelAction(name, panel));
        }
        setQueryTraceSwitch(() => e);
    }
    function onDirectionSwitchChange(e: any) {
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
                    root: DialogStyles,
                },
            }}
        >
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
                        {/* Query type switch */}
                        <QueryTypeSwitch
                            label={"Query Type"}
                            options={SWITCH_OPTIONS}
                            onChange={onSwitchChange}
                            defaultActive={queryTypeSwitch}
                        />
                    </div>
                    <div className="options-input">
                        {/* Direction switch */}
                        <QueryTypeSwitch
                            label={"Direction"}
                            options={DIRECTION_SWITCH_OPTIONS}
                            onChange={onDirectionSwitchChange}
                            defaultActive={directionSwitch}
                        />
                    </div>
                    <div className="options-input">
                        {/*  Query Limit input */}
                        <QueryLimit {...props} />
                    </div>
                    {dataSourceType === "flux" && (
                        <div className="options-input">
                            <SettingLabel>Chart View</SettingLabel>
                            {/* Chart View On flux datasource */}
                            <CustomSwitch
                                defaultActive={isTableViewSet}
                                onChange={handleTableViewSwitch}
                            />
                        </div>
                    )}
                    {responseType !== "vector" && (
                        <div className="options-input">
                            <InputGroup>
                                <SettingLabel>Timestamp</SettingLabel>
                                {/* Show Timestamp on vector view */}
                                <CustomSwitch
                                    defaultActive={isShowTsSet}
                                    onChange={handleTsSwitch}
                                />
                            </InputGroup>
                            <InputGroup>
                                <SettingLabel>Query Builder</SettingLabel>
                                {/* Show Query builder on vector view */}
                                <CustomSwitch
                                    defaultActive={isBuilderSet}
                                    onChange={handleBuilderSwitch}
                                />
                            </InputGroup>
                        </div>
                    )}
                </SettingsInputContainer>
            </SettingCont>
        </Dialog>
    );
};
export default QuerySetting;
