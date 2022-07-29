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
    height: 26px;
`;

export default function QueryTypeBar(props) {
    const dispatch = useDispatch();
    const theme = useSelector((store) => store.theme);
    const left = useSelector((store) => store.left);
    const right = useSelector((store) => store.right);

    const responseType = useSelector((store) => store.responseType);

    const { hash } = useLocation();
    const { id } = props.data;

    const [isTableViewSet, setIsTableViewSet] = useState(props.data.tableView);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(
        props.data.queryType
    );


    useEffect(() => {

        const urlParams = new URLSearchParams(hash.replace("#", ""));
        const urlPanel = urlParams.get(props.name)

        const parsedPanel = JSON.parse(decodeURIComponent(urlPanel))

        if (parsedPanel?.length > 0) {
            const queryMD = parsedPanel.find(
                (f) => f.idRef === props.data.idRef
            );

            if (props.name === "left" && queryMD) {
                const leftC = [...left];
                leftC.forEach((query) => {
                    if (query.idRef === props.data.idRef) {
                        query.queryType = queryMD.queryType;
                    }
                });
                dispatch(setLeftPanel(leftC));
            }
            if (props.name === "right" && queryMD) {
                const rightC = [...right];
                rightC.forEach((query) => {
                    if (query.idRef === props.data.idRef) {
                        query.queryType = queryMD.queryType;
                    }
                });
                dispatch(setRightPanel(rightC));
            }
        }
    }, []);

    useEffect(() => {
        setIsTableViewSet(props.data.tableView);
    }, [setIsTableViewSet, props.data.tableView]);

    const SWITCH_OPTIONS = [
        { value: "range", label: "Range" },
        { value: "instant", label: "Instant" },
    ];

    function onSwitchChange(e) {
        // modify query type switch value
        if (props.name === "left") {
            const leftC = [...left];
            leftC.forEach((query) => {
                if (query.id === id) {
                    query.queryType = e;
                }
            });
            dispatch(setLeftPanel(leftC));
        }

        if (props.name === "right") {
            const rightC = [...right];
            rightC.forEach((query) => {
                if (query.id === id) {
                    query.queryType = e;
                }
            });
            dispatch(setRightPanel(rightC));
        }

        setQueryTypeSwitch(e);
    }

    function handleTableViewSwitch() {
        // modify table view switch value
        if (props.name === "right") {
            const rightC = [...right];
            rightC.forEach((query) => {
                if (query.id === id) {
                    query.tableView = isTableViewSet ? false : true;
                }
            });
            dispatch(setRightPanel(rightC));
        }

        if (props.name === "left") {
            const leftC = [...left];
            leftC.forEach((query) => {
                if (query.id === id) {
                    query.tableView = isTableViewSet ? false : true;
                }
            });
            dispatch(setLeftPanel(leftC));
        }
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
