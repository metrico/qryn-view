import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueryType } from "../../actions";
import { themes } from "../../theme/themes";
import { InputGroup, SettingLabel } from "../styles";
import QueryLimit from "./components/QueryLimit";
import QueryTypeSwitch from "./components/QueryTypeSwitch";
import { setIsTableView } from "../../actions";
import { Switch } from "@mui/material";
const QueryTypeCont = styled.div`
    display: flex;
    padding: 4px;
    background: ${(props) => props.theme.widgetContainer};
    color: ${(props) => props.color};
    height: 26px;
`;

export default function QueryTypeBar() {
    const dispatch = useDispatch();
    const theme = useSelector((store) => store.theme);
    const queryType = useSelector((store) => store.queryType);
    const isTableView = useSelector((store) => store.isTableView);
    const responseType = useSelector((store) => store.responseType);
    const [isTableViewSet, setIsTableViewSet] = useState(isTableView);
    const [queryTypeSwitch, setQueryTypeSwitch] = useState(queryType);

    useEffect(() => {
        setQueryTypeSwitch(queryType);
    }, [queryType, setQueryTypeSwitch]);
    useEffect(() => {
        setIsTableViewSet(isTableView);
    }, [setIsTableViewSet, isTableView]);
    const SWITCH_OPTIONS = [
        { value: "range", label: "Range" },
        { value: "instant", label: "Instant" },
    ];

    function onSwitchChange(e) {
        dispatch(setQueryType(e));
    }
    function handleThemeSwitch() {
        dispatch(setIsTableView(isTableViewSet === true ? false : true));
        setIsTableView(isTableView);
    }

    return (
        <ThemeProvider theme={themes[theme]}>
            <QueryTypeCont>
                <QueryTypeSwitch
                    options={SWITCH_OPTIONS}
                    onChange={onSwitchChange}
                    defaultActive={queryTypeSwitch}
                />
                <QueryLimit />

                {responseType !== "vector" && (
                    <InputGroup>
                        <SettingLabel>Table View</SettingLabel>
                        <Switch
                            checked={isTableView}
                            onChange={handleThemeSwitch}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </InputGroup>
                )}
            </QueryTypeCont>
        </ThemeProvider>
    );
}
