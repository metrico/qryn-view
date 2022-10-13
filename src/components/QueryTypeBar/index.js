import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themes } from "../../theme/themes";
import { InputGroup, SettingLabel } from "../styles";
import QueryLimit from "./components/QueryLimit";
import QueryTypeSwitch from "./components/QueryTypeSwitch";
import { Switch } from "@mui/material";
import { useLocation } from "react-router-dom";
import { setLeftPanel } from "../../actions/setLeftPanel";
import { setRightPanel } from "../../actions/setRightPanel";
const QueryTypeCont = styled.div`
    display: flex;
    padding: 4px;
    background: ${(props) => props.theme.widgetContainer};
    color: ${(props) => props.color};
    height: 28px;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
`;
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

export default function QueryTypeBar(props) {
    const dispatch = useDispatch();
    const { name, data } = props;
    const theme = useSelector((store) => store.theme);
    const panelQuery = useSelector((store) => store[name]);

    const responseType = useSelector((store) => store.responseType);

    const { hash } = useLocation();
    const { id, queryType, tableView, idRef, isShowTs, direction } = data;

    const [isTableViewSet, setIsTableViewSet] = useState(tableView);
    const [isSequenceDiagramViewSet, setIsSequenceDiagramViewSet] = useState(props.data.sequenceDiagramView);
    const [isShowTsSet, setIsShowTsSet] = useState(isShowTs || false);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(queryType);
    const [directionSwitch, setDirectionSwitch] = useState(direction);

    useEffect(() => {
        const urlParams = new URLSearchParams(hash.replace("#", ""));
        const urlPanel = urlParams.get(name);

        const parsedPanel = JSON.parse(decodeURIComponent(urlPanel));

        if (parsedPanel?.length > 0) {
            const queryMD = parsedPanel.find((f) => f.idRef === idRef);

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
    }, []);

    useEffect(() => {
        setIsTableViewSet(props.data.tableView);
    }, [setIsTableViewSet, props.data.tableView]);
    useEffect(() => {
        setIsShowTsSet(props.data.isShowTs);
    }, [setIsShowTsSet, props.data.isShowTs]);

    useEffect(() => {
        setIsSequenceDiagramViewSet(props.data.sequenceDiagramView);
    }, [setIsSequenceDiagramViewSet, props.data.sequenceDiagramView]);
    function onSwitchChange(e) {
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

    function onDirectionSwitchChange(e) {
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
    function handleSequenceDiagramViewSwitch() {
        // modify sequence diagram view switch value
        const panel = [...panelQuery];
        panel.forEach((query) => {
            if (query.id === id) {
                query.sequenceDiagramView = isSequenceDiagramViewSet ? false : true;
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
    return (
        <ThemeProvider theme={themes[theme]}>
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

                {responseType !== "vector" && (
                    <>
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
                                onChange={handleShowTsSwitch}
                                inputProps={{ "aria-label": "controlled-ts" }}
                            />
                        </InputGroup>
                    </>
                )}
                {responseType !== "vector" && (
                    <span style={{display: 'flex'}}>
                        <InputGroup>
                            <SettingLabel>Sequence Diagram View</SettingLabel>
                            <Switch
                                checked={isSequenceDiagramViewSet}
                                size={"small"}
                                onChange={handleSequenceDiagramViewSwitch}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        </InputGroup>
                    </span>
                )}
            </QueryTypeCont>
        </ThemeProvider>
    );
}
