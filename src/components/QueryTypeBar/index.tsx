import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputGroup, SettingLabel } from "../styles";
import QueryLimit from "./components/QueryLimit";
import QueryTypeSwitch from "./components/QueryTypeSwitch";
import { Switch } from "@mui/material";
import { useLocation } from "react-router-dom";
import { setLeftPanel } from "../../actions/setLeftPanel";
import { setRightPanel } from "../../actions/setRightPanel";
import { useTheme } from "../DataViews/components/QueryBuilder/hooks";

const QueryTypeCont = styled.div`
    display: flex;
    padding: 4px 0px;
   // background: ${(props: any) => props.theme.widgetContainer};
    color: ${(props: any) => props.color};
    height: 26px;
`;
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


// Bar with switches: 
// query type
// timestamp
// query builder
// direction
// query limit
// logs volume
export default function QueryTypeBar(props: any) {
    const dispatch = useDispatch();
    const { name, data } = props;

    const theme = useTheme();
    const panelQuery = useSelector((store: any) => store[name]);

    const responseType = useSelector((store: any) => store.responseType);

    const { hash } = useLocation();
    const {
        id,
        queryType,
        tableView,
        idRef,
        isShowTs,
        isBuilder,
        isLogsVolume,
        direction,
        dataSourceType,
        isShowStats,
        hasStats,
    } = data;

    const [isTableViewSet, setIsTableViewSet] = useState(tableView);
    const [isShowTsSet, setIsShowTsSet] = useState(isShowTs || false);
    const [isBuilderSet, setIsBuilderSet] = useState(isBuilder || false);
    const [isLogsVolumeSet, setIsLogsVolumeSet] = useState(
        isLogsVolume || false
    );
    const [isShowStatsSet, setIsShowStatsSet] = useState(isShowStats || false);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(queryType);
    const [directionSwitch, setDirectionSwitch] = useState(
        direction || "forward"
    );

    useEffect(() => {
        const urlParams = new URLSearchParams(hash.replace(/#/, ""));
        const urlPanel: any = urlParams.get(name);

        const parsedPanel = JSON.parse(decodeURIComponent(urlPanel) || "[]");

        if (parsedPanel?.length > 0) {
            const queryMD = parsedPanel.find((f: any) => f.idRef === idRef);

            if (queryMD) {
                const panel = [...panelQuery];
                panel.forEach((query) => {
                    if (query.idRef === idRef) {
                        query.queryType = queryMD.queryType;
                        query.direction = queryMD.direction;
                    }
                });
                dispatch(panelAction(name, panel));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsTableViewSet(props.data.tableView);
    }, [setIsTableViewSet, props.data.tableView]);
    useEffect(() => {
        setIsShowTsSet(props.data.isShowTs);
    }, [setIsShowTsSet, props.data.isShowTs]);

    useEffect(() => {
        setIsBuilderSet(props.data.isBuilder);
    }, [setIsBuilderSet, props.data.isBuilder]);

    useEffect(() => {
        setIsLogsVolumeSet(props.data.isLogsVolume);
    }, [setIsLogsVolumeSet, props.data.isLogsVolume]);

    function onSwitchChange(e: any) {
        // modify query type switch value
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                query.queryType = e;
            }
        });
        dispatch(panelAction(name, panel));
        setQueryTypeSwitch(e);
    }

    function onDirectionSwitchChange(e: any) {
        // modify query type switch value
        const panel = [...panelQuery];
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
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                query.tableView = isTableViewSet ? false : true;
            }
        });
        dispatch(panelAction(name, panel));
    }

    function handleShowTsSwitch() {
        // modify table view switch value
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                query.isShowTs = isShowTsSet ? false : true;
            }
        });

        dispatch(panelAction(name, panel));
    }

    function handleBuilderSwitch() {
        // modify table view switch value
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                query.isBuilder = isBuilderSet ? false : true;
            }
        });

        dispatch(panelAction(name, panel));
    }

    function handleLogsVolumeSwitch() {
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                query.isLogsVolume = isLogsVolumeSet ? false : true;
            }
        });

        dispatch(panelAction(name, panel));
    }

    function handleStatsInfoSwitch(e: any) {
        const value = e.target.checked;
        setIsShowStatsSet(() => value);
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                query.isShowStats = isShowStatsSet ? false : true;
            }
        });
        dispatch(panelAction(name, panel));
    }

    return (
        <ThemeProvider theme={theme}>
            <QueryTypeCont>
                <QueryTypeSwitch
                    label={"Query Type"}
                    options={SWITCH_OPTIONS}
                    onChange={onSwitchChange}
                    defaultActive={queryTypeSwitch}
                />
                <QueryTypeSwitch
                    label={"Direction"}
                    options={DIRECTION_SWITCH_OPTIONS}
                    onChange={onDirectionSwitchChange}
                    defaultActive={directionSwitch}
                />
                <QueryLimit {...props} />
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
                    <>
                        <InputGroup>
                            <SettingLabel>Timestamp</SettingLabel>
                            <Switch
                                checked={isShowTsSet}
                                size={"small"}
                                onChange={handleShowTsSwitch}
                                inputProps={{ "aria-label": "controlled-ts" }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <SettingLabel>Query Builder</SettingLabel>
                            <Switch
                                checked={isBuilderSet}
                                size={"small"}
                                onChange={handleBuilderSwitch}
                                inputProps={{ "aria-label": "controlled-ts" }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <SettingLabel>Logs Volume</SettingLabel>
                            <Switch
                                checked={isLogsVolumeSet}
                                size={"small"}
                                onChange={handleLogsVolumeSwitch}
                                inputProps={{ "aria-label": "controlled-ts" }}
                            />
                        </InputGroup>
                        {hasStats && (
                            <InputGroup>
                                <SettingLabel>Stats Info</SettingLabel>
                                <Switch
                                    checked={isShowStatsSet}
                                    size={"small"}
                                    onChange={handleStatsInfoSwitch}
                                    inputProps={{
                                        "aria-label": "controlled-ts",
                                    }}
                                />
                            </InputGroup>
                        )}
                    </>
                )}
            </QueryTypeCont>
        </ThemeProvider>
    );
}
