import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themes } from "../../theme/themes";
import { InputGroup, SettingLabel } from "../styles";
import QueryLimit from "./components/QueryLimit";
import QueryTypeSwitch from "./components/QueryTypeSwitch";
import { Switch } from "@mui/material";
import { setPanelsData } from "../../actions/setPanelsData";

const QueryTypeCont = styled.div`
    display: flex;
    padding: 4px;
    background: ${(props) => props.theme.widgetContainer};
    color: ${(props) => props.color};
    height: 26px;
`;

export default function QueryTypeBar(props) {

    const dispatch = useDispatch();

    const theme = useSelector((store) => store.theme);
    const panels = useSelector((store) => store.panels);
    const responseType = useSelector((store) => store.responseType);

    const [isTableViewSet, setIsTableViewSet] = useState(props.data.tableView);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(
        props.data.queryType
    );
    const query = useMemo(() => {
        return panels[props.name].queries.find((f) => f.id === props.data.id);
    }, [props.data.id, props.name, panels]);

    useEffect(() => {
        setQueryTypeSwitch(query.queryType);
    }, [query.queryType, setQueryTypeSwitch]);

    useEffect(() => {
        setIsTableViewSet(query.tableView);
    }, [setIsTableViewSet, query.tableView]);

    const SWITCH_OPTIONS = [
        { value: "range", label: "Range" },
        { value: "instant", label: "Instant" },
    ];

    const JSONClone = (arr) => {
        const arrToJSON = JSON.stringify(arr);
        const actArr = JSON.parse(arrToJSON);
        return actArr;
    };
    
    function onSwitchChange(e) {
        const panelName = props.name;
        const panel = panels[panelName];
        const actPanels = JSONClone(panels);
        let actQueries = JSONClone(panel.queries);
        for (let query of actQueries) {
            if (query.id === props.data.id) {
                query.queryType = e;
            }
        }

        const finalPanel = {
            ...actPanels,
            [panelName]: {
                queries: [...actQueries],
            },
        };

        dispatch(setPanelsData(finalPanel));
    }

    function handleTableViewSwitch() {
        const panelName = props.name
        const panel = panels[panelName]
        const actPanels = JSONClone(panels)
        let actQueries = JSONClone(panel.queries)

        for (let query of actQueries) {
            if (query.id === props.data.id) {
                query.tableView = isTableViewSet ? false : true
            }
        }

        const finalPanel = {
            ...actPanels,
            [panelName]: {
                queries: [...actQueries],
            }
        };

        dispatch(setPanelsData(finalPanel))
    }

    return (
        <ThemeProvider theme={themes[theme]}>
            <QueryTypeCont>
                <QueryTypeSwitch
                    options={SWITCH_OPTIONS}
                    onChange={onSwitchChange}
                    defaultActive={queryTypeSwitch}
                />
                <QueryLimit {...props} />

                {responseType !== "vector" && (
                    <InputGroup>
                        <SettingLabel>Table View</SettingLabel>
                        <Switch
                            checked={isTableViewSet}
                            onChange={handleTableViewSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </InputGroup>
                )}
            </QueryTypeCont>
        </ThemeProvider>
    );
}
